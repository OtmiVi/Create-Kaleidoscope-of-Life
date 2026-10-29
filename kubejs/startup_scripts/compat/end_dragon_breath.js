const END_BREATH_SOUP_BASES = Java.loadClass('com.github.ysbbbbbb.kaleidoscopecookery.crafting.soupbase.SoupBaseManager')
const END_BREATH_FLUID_BASE = Java.loadClass('com.github.ysbbbbbb.kaleidoscopecookery.crafting.soupbase.FluidSoupBase')
const END_BREATH_REGISTRIES = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')
const END_BREATH_LOCATION = Java.loadClass('net.minecraft.resources.ResourceLocation')
const END_BREATH_TAB_VISIBILITY = Java.loadClass('net.minecraft.world.item.CreativeModeTab$TabVisibility')

// Keep the original base ID so recipes and already filled stockpots still work.
// Register after both mods finish setup, on the client and the dedicated server.
StartupEvents.postInit(event => {
    const baseId = END_BREATH_LOCATION.parse('kaleidoscope_end:dragon_breath')
    const bases = END_BREATH_SOUP_BASES.getAllSoupBases()
    const original = bases.get(baseId)
    const bucket = Item.of('create_dragons_plus:dragon_breath_bucket').getItem()
    const fluid = END_BREATH_REGISTRIES.FLUID.get(END_BREATH_LOCATION.parse('create_dragons_plus:dragon_breath'))
    bases.put(baseId, new END_BREATH_FLUID_BASE(baseId, bucket, fluid, original.getBubbleColor()))
})

// Hide the duplicate in every creative tab, including creative search.
NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.BuildCreativeModeTabContentsEvent', event => {
    const entries = [event.getParentEntries(), event.getSearchEntries()]
    entries.forEach(entrySet => {
        const stacks = entrySet.toArray()
        for (let index = 0; index < stacks.length; index++) {
            if (stacks[index].id === 'kaleidoscope_end:dragon_breath_bucket') {
                event.remove(stacks[index], END_BREATH_TAB_VISIBILITY.PARENT_AND_SEARCH_TABS)
            }
        }
    })
})
