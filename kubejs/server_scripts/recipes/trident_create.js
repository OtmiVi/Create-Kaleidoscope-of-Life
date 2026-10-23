ServerEvents.recipes(event => {
    event.remove({ id: 'create_aquatic_ambitions:crafting/materials/trident' })

    event.recipes.create.mechanical_crafting('minecraft:trident', [
        ' AA',
        ' IA',
        'I  '
    ], {
        A: 'create_aquatic_ambitions:spiky_shell',
        I: 'create_aquatic_ambitions:prismarine_alloy_rod'
    }).id('kubejs:mechanical_crafting/trident')
})
