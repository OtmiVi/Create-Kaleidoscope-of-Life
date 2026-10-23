ServerEvents.recipes(event => {
    const tires = ['small_tire', 'tire', 'large_tire', 'monstrous_tire']

    tires.forEach(tire => event.remove({ output: `offroad:${tire}` }))

    event.shapeless('offroad:small_tire', [
        'create:shaft',
        'create:belt_connector'
    ]).id('kubejs:offroad/small_tire')

    event.shaped('offroad:tire', [
        ' B ',
        'BSB',
        ' B '
    ], {
        B: 'create:belt_connector',
        S: 'create:shaft'
    }).id('kubejs:offroad/tire')

    event.shaped('offroad:large_tire', [
        'RBR',
        'BSB',
        'RBR'
    ], {
        R: 'createpolymer:rubber',
        B: 'create:belt_connector',
        S: 'create:shaft'
    }).id('kubejs:offroad/large_tire')

    event.shaped('offroad:monstrous_tire', [
        'RBR',
        'BSB',
        'RBR'
    ], {
        R: 'createpolymer:rubber',
        B: 'dndecor:belt_connector',
        S: 'create:shaft'
    }).id('kubejs:offroad/monstrous_tire')
})
