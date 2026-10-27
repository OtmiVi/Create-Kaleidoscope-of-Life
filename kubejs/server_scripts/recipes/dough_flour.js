ServerEvents.recipes(event => {
    const removedDoughRecipes = [
        'create:crafting/appliances/dough',
        'create:mixing/dough_by_mixing'
    ]
    for (let count = 1; count <= 8; count++) {
        removedDoughRecipes.push('minecraft:flour_from_' + count + '_wheat')
    }
    removedDoughRecipes.forEach(id => event.remove({ id: id }))

    const ingredients = [
        { old: 'create:dough', main: 'kaleidoscope_cookery:raw_dough', tag: 'c:foods/dough/wheat' },
        { old: 'create:wheat_flour', main: 'kaleidoscope_cookery:flour', tag: 'c:flours/wheat' }
    ]

    ingredients.forEach(ingredient => {
        event.replaceInput({}, ingredient.old, '#' + ingredient.tag)
        event.replaceInput({}, ingredient.main, '#' + ingredient.tag)
        // Replace only result IDs: a wheat milling roll can produce two flour.
        // Rebuilding the recipe preserves that count, its chance and byproducts.
        event.forEachRecipe({ output: ingredient.old }, recipe => {
            const id = recipe.getId()
            // Removed originals must never be re-added as unified custom recipes.
            if (removedDoughRecipes.includes(id)) {
                recipe.remove()
                return
            }
            recipe.serialize()
            const json = JSON.parse(recipe.json.toString())
            function replaceResult(result) {
                if (typeof result === 'string') return result === ingredient.old ? ingredient.main : result
                if (Array.isArray(result)) return result.map(replaceResult)
                if (result && typeof result === 'object') {
                    if (result.id === ingredient.old) result.id = ingredient.main
                    if (result.item) result.item = replaceResult(result.item)
                }
                return result
            }
            if (json.result) json.result = replaceResult(json.result)
            if (json.results) json.results = replaceResult(json.results)
            recipe.remove()
            event.custom(json).id(id)
        })
    })

    // Register after replacements so these remain one-way conversions of old stock.
    event.shapeless('kaleidoscope_cookery:raw_dough', ['create:dough'])
        .id('kubejs:unification/dough_from_create')
    event.shapeless('kaleidoscope_cookery:flour', ['create:wheat_flour'])
        .id('kubejs:unification/flour_from_create')
})

RecipeViewerEvents.removeEntries('item', event => {
    event.remove('create:dough')
    event.remove('create:wheat_flour')
})
