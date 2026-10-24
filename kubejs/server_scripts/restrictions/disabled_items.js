// Recipes and viewer entries share one list. Sophisticated upgrade limits also block installation.
const DISABLED_ITEMS = [
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


ServerEvents.recipes(event => {

    DISABLED_ITEMS.forEach(item => {
        event.remove({ output: item })
    })


    DISABLED_RECIPES.forEach(recipe => {
        event.remove({ id: recipe })
    })

})

RecipeViewerEvents.removeEntriesCompletely('item', event => {

    DISABLED_ITEMS.forEach(item => {
        event.remove(item)
    })

})
