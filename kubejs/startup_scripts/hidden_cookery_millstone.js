// Remove the Cookery millstone from every creative tab and creative search.
const COOKERY_MILLSTONE_VISIBILITY = Java.loadClass('net.minecraft.world.item.CreativeModeTab$TabVisibility')

function removeCookeryMillstoneEntries(event, entries) {
    const stacks = entries.toArray()
    for (let index = 0; index < stacks.length; index++) {
        var stack = stacks[index]
        if (stack.id === 'kaleidoscope_cookery:millstone') {
            event.remove(stack, COOKERY_MILLSTONE_VISIBILITY.PARENT_AND_SEARCH_TABS)
        }
    }
}

NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.BuildCreativeModeTabContentsEvent', event => {
    removeCookeryMillstoneEntries(event, event.getParentEntries())
    removeCookeryMillstoneEntries(event, event.getSearchEntries())
})
