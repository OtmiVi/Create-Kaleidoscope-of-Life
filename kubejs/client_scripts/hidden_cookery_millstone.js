// Suppress all tooltip lines, including Cookery's own usage hint.
NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.entity.player.ItemTooltipEvent', event => {
    if (event.getItemStack().id === 'kaleidoscope_cookery:millstone') {
        event.getToolTip().clear()
    }
})
