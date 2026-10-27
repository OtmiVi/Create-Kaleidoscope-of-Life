ServerEvents.recipes(event => {
    event.remove({ output: 'kaleidoscope_cookery:shawarma_spit' })

    event.shaped('kaleidoscope_cookery:shawarma_spit', [
        'ISI',
        'IGI',
        'MCM'
    ], {
        I: 'create:iron_sheet',
        S: 'create:shaft',
        G: 'create:cogwheel',
        M: 'minecraft:magma_block',
        C: 'minecraft:campfire'
    }).id('kaleidoscope_cookery:shawarma_spit')
})
