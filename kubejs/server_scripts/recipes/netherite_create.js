ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:netherite_ingot' })
    event.remove({ id: 'create_deep_dark:create/compacting_netherite'})
    event.remove({ type: 'create:mixing', output: 'minecraft:netherite_ingot' })

    event.recipes.create.mixing('minecraft:netherite_ingot', [
        'minecraft:netherite_scrap',
        'minecraft:netherite_scrap',
        'minecraft:netherite_scrap',
        'minecraft:netherite_scrap',
        'minecraft:gold_ingot',
        'minecraft:gold_ingot',
        'minecraft:gold_ingot',
        'minecraft:gold_ingot'
    ]).superheated().id('create:netherite_ingot_create_only')
})