const CHORUS_PLANTING_REGISTRIES = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const CHORUS_PLANTING_ITEMS = Java.loadClass('net.minecraft.world.item.Items')
const CHORUS_PLANTING_CONTEXT = Java.loadClass('net.minecraft.world.item.context.BlockPlaceContext')
const CHORUS_PLANTING_DIRECTION = Java.loadClass('net.minecraft.core.Direction')
const CHORUS_PLANTING_TRISTATE = Java.loadClass('net.neoforged.neoforge.common.util.TriState')

function chorusPlantingSupport(event) {
    if (!CHORUS_PLANTING_DIRECTION.UP.equals(event.getFace())) return false
    const state = event.getLevel().getBlockState(event.getPos())
    const blockId = String(CHORUS_PLANTING_REGISTRIES.BLOCK.getKey(state.getBlock()))
    return blockId === 'minecraft:end_stone' || blockId === 'minecraft:chorus_plant'
}

// Deny using the fruit for planting, while retaining its normal food use.
NativeEvents.onEvent('HIGHEST', 'net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickBlock', event => {
    const itemId = String(CHORUS_PLANTING_REGISTRIES.ITEM.getKey(event.getItemStack().getItem()))
    if (itemId === 'minecraft:chorus_fruit' && chorusPlantingSupport(event)) {
        event.setUseItem(CHORUS_PLANTING_TRISTATE.FALSE)
    }
})

NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickBlock', event => {
    const stack = event.getItemStack()
    const itemId = String(CHORUS_PLANTING_REGISTRIES.ITEM.getKey(stack.getItem()))
    if (itemId !== 'kaleidoscope_end:chorus_seed' || !chorusPlantingSupport(event)) return
    if (event.isCanceled() || CHORUS_PLANTING_TRISTATE.FALSE.equals(event.getUseItem())) return

    const level = event.getLevel()
    const player = event.getEntity()
    if (level.isClientSide() || player.isSpectator() || !player.mayBuild()) return

    // Reuse vanilla placement, collision checks, stack consumption and Creative handling.
    const context = new CHORUS_PLANTING_CONTEXT(player, event.getHand(), stack, event.getHitVec())
    const result = CHORUS_PLANTING_ITEMS.CHORUS_FLOWER.place(context)
    event.setCanceled(true)
    event.setCancellationResult(result)
})
