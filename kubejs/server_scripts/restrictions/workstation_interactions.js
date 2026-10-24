// Native NeoForge events, handled entirely by KubeJS. No addon is required.
const RESTRICTED_WORKSTATIONS = [
    'minecraft:enchanting_table',
    'minecraft:grindstone',
    'minecraft:brewing_stand'
]
const WORKSTATION_REGISTRIES = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const WORKSTATION_TRISTATE = Java.loadClass('net.neoforged.neoforge.common.util.TriState')

NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickBlock', event => {
    const state = event.getLevel().getBlockState(event.getPos())
    const id = String(WORKSTATION_REGISTRIES.BLOCK.getKey(state.getBlock()))
    if (RESTRICTED_WORKSTATIONS.indexOf(id) !== -1) {
        // Block the workstation action while allowing placement against the block.
        event.setUseBlock(WORKSTATION_TRISTATE.FALSE)
    }
})
