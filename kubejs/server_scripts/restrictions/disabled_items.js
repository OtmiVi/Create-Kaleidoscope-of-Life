const DISABLED_ITEMS = [
    'sophisticatedbackpacks:inception_upgrade',
    'sophisticatedbackpacks:everlasting_upgrade',
    'sophisticatedstorage:xp_pump_upgrade',
    'sophisticatedbackpacks:xp_pump_upgrade',
    'sophisticatedbackpacks:mob_catcher_upgrade',
    'sophisticatedbackpacks:advanced_mob_catcher_upgrade',
    'sophisticatedbackpacks:tank_upgrade',
    'sophisticatedbackpacks:battery_upgrade'
]


const DISABLED_RECIPES = [
    'sophisticatedbackpacks:inception_upgrade',
    'sophisticatedbackpacks:everlasting_upgrade',
    'sophisticatedstorage:xp_pump_upgrade',
    'sophisticatedbackpacks:xp_pump_upgrade',
    'sophisticatedbackpacks:mob_catcher_upgrade',
    'sophisticatedbackpacks:advanced_mob_catcher_upgrade',
    'sophisticatedbackpacks:tank_upgrade',
    'sophisticatedbackpacks:battery_upgrade',
    'create:mixing/andesite_alloy',
    'create:crafting/materials/andesite_alloy',
    'create:crafting/materials/andesite_alloy',
]


const HIDDEN_ITEMS = [
    'sophisticatedbackpacks:mob_catcher_upgrade',
    'sophisticatedbackpacks:advanced_mob_catcher_upgrade',
    'sophisticatedbackpacks:tank_upgrade',
    'sophisticatedbackpacks:battery_upgrade'
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

    HIDDEN_ITEMS.forEach(item => {
        event.remove(item)
    })

})