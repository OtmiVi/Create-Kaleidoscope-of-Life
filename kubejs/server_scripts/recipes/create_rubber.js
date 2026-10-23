ServerEvents.recipes(event => {
    const createRecipes = {
        or: [
            { id: /^create[^:]*:/ },
            { mod: 'colorfulpipes' },
            { mod: 'fluid' },
            { mod: 'interiors' },
            { mod: 'northstar' },
            { mod: 'powergrid' }
        ]
    }

    event.replaceInput(createRecipes, 'minecraft:dried_kelp', 'createpolymer:rubber')
    event.replaceInput(createRecipes, 'minecraft:dried_kelp_block', 'createpolymer:rubber')
    event.remove({ id: 'createpolymer:create/crafting/kinetics/belt_connector'})  
})
