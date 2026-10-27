// Use Create iron sheets instead of iron pressure plates in Cookery recipes.
ServerEvents.recipes(event => {
    event.replaceInput(
        { mod: 'kaleidoscope_cookery' },
        'minecraft:heavy_weighted_pressure_plate',
        'create:iron_sheet'
    )

    event.remove({ output: 'kaleidoscope_cookery:pot' })
    event.shaped('kaleidoscope_cookery:pot', [
        'PPP',
        ' S '
    ], {
        P: 'create:iron_sheet',
        S: 'minecraft:stick'
    }).id('kaleidoscope_cookery:pot')
})
