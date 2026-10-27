// Recipes and viewer entries share one list. Sophisticated upgrade limits also block installation.
const DISABLED_ITEMS = [
    'kaleidoscope_cookery:millstone',
    'sophisticatedbackpacks:inception_upgrade',
    'sophisticatedbackpacks:everlasting_upgrade',
    'sophisticatedstorage:xp_pump_upgrade',
    'sophisticatedbackpacks:xp_pump_upgrade',
    'sophisticatedbackpacks:pump_upgrade',
    'sophisticatedbackpacks:advanced_pump_upgrade',
    'sophisticatedstorage:pump_upgrade',
    'sophisticatedstorage:advanced_pump_upgrade',
    'sophisticatedbackpacks:mob_catcher_upgrade',
    'sophisticatedbackpacks:advanced_mob_catcher_upgrade',
    'sophisticatedbackpacks:tank_upgrade',
    'sophisticatedbackpacks:battery_upgrade',
    'sophisticatedbackpacks:anvil_upgrade',
    'sophisticatedcore:xp_bucket'
]


const DISABLED_RECIPES = [
    'create:mixing/andesite_alloy',
    'create:crafting/materials/andesite_alloy'
]

const DISABLED_COOKERY_MILLSTONE_SERIALIZER = Java.loadClass('com.github.ysbbbbbb.kaleidoscopecookery.crafting.serializer.MillstoneRecipeSerializer')


ServerEvents.recipes(event => {

    event.remove({ type: 'kaleidoscope_cookery:millstone' })
    event.remove({ input: 'kaleidoscope_cookery:millstone' })

    DISABLED_ITEMS.forEach(item => {
        event.remove({ output: item })
    })


    DISABLED_RECIPES.forEach(recipe => {
        event.remove({ id: recipe })
    })

})

// Keep millstones obtained in older saves or through commands unusable.
BlockEvents.placed('kaleidoscope_cookery:millstone', event => {
    event.cancel()
})

BlockEvents.rightClicked('kaleidoscope_cookery:millstone', event => {
    event.cancel()
})

RecipeViewerEvents.removeEntriesCompletely('item', event => {

    DISABLED_ITEMS.forEach(item => {
        event.remove(item)
    })

})

RecipeViewerEvents.removeCategories(event => {
    event.remove('kaleidoscope_cookery:millstone')
})

// Prevent placed Cookery millstones from falling back to Create's recipes.
NativeEvents.onEvent('LOWEST', 'com.github.ysbbbbbb.kaleidoscopecookery.api.event.MillstoneMatchRecipeEvent$Post', event => {
    event.setOutput(DISABLED_COOKERY_MILLSTONE_SERIALIZER.getEmptyRecipe())
})
