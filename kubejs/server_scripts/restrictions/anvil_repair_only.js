const REPAIR_DATA_COMPONENTS = Java.loadClass('net.minecraft.core.component.DataComponents')
const REPAIR_ITEM_REGISTRIES = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const ANVIL_COMPONENT = Java.loadClass('net.minecraft.network.chat.Component')
const ANVIL_STRING_UTIL = Java.loadClass('net.minecraft.util.StringUtil')

// Keep the complete first stack, changing only damage. Never merge enchantments.
function createRepairOnlyResult(left, right) {
    if (left.isEmpty() || right.isEmpty() || left.getCount() !== 1 ||
        !left.isDamageableItem() || !left.isDamaged() ||
        right.has(REPAIR_DATA_COMPONENTS.STORED_ENCHANTMENTS)) {
        return null
    }

    let damage = left.getDamageValue()
    let materials
    let levels
    if (left.getItem().isValidRepairItem(left, right)) {
        const perMaterial = Math.max(1, Math.floor(left.getMaxDamage() / 4))
        materials = Math.min(right.getCount(), Math.ceil(damage / perMaterial))
        damage = Math.max(0, damage - materials * perMaterial)
        levels = materials
    } else if (String(REPAIR_ITEM_REGISTRIES.ITEM.getKey(left.getItem())) === String(REPAIR_ITEM_REGISTRIES.ITEM.getKey(right.getItem())) &&
        right.isDamageableItem() && right.getCount() === 1) {
        const durability = right.getMaxDamage() - right.getDamageValue()
        const bonus = Math.floor(left.getMaxDamage() * 0.12)
        damage = Math.max(0, damage - durability - bonus)
        materials = 1
        levels = 2
    } else {
        return null
    }

    if (damage >= left.getDamageValue()) return null
    const output = left.copy()
    output.setDamageValue(damage)
    return { output: output, levels: levels, materials: materials }
}

function createAnvilResult(left, right, name) {
    if (left.isEmpty()) return null

    const result = right.isEmpty()
        ? { output: left.copy(), levels: 0, materials: 0 }
        : createRepairOnlyResult(left, right)
    if (result === null) return null

    // Renaming alone costs one level; it can also be added to a valid repair.
    if (name === null || ANVIL_STRING_UTIL.isBlank(name)) {
        if (left.has(REPAIR_DATA_COMPONENTS.CUSTOM_NAME)) {
            result.output.remove(REPAIR_DATA_COMPONENTS.CUSTOM_NAME)
            result.levels++
        }
    } else if (String(name) !== String(left.getHoverName().getString())) {
        result.output.set(REPAIR_DATA_COMPONENTS.CUSTOM_NAME, ANVIL_COMPONENT.literal(String(name)))
        result.levels++
    }

    return result.levels > 0 ? result : null
}

NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.AnvilUpdateEvent', event => {
    const result = createAnvilResult(event.getLeft(), event.getRight(), event.getName())
    if (result === null) {
        event.setCanceled(true)
        return
    }
    event.setOutput(result.output)
    event.setCost(result.levels)
    event.setMaterialCost(result.materials)
})
