
NativeEvents.onEvent('net.neoforged.neoforge.event.brewing.PotionBrewEvent$Pre', event => {
    event.setCanceled(true)
})

ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:brewing_stand' })
})

RecipeViewerEvents.removeCategories(event => {
    event.remove('minecraft:brewing')
})

BlockEvents.rightClicked('minecraft:brewing_stand', event => {
    event.cancel()
})
