ServerEvents.recipes(event => {
    const createRecipes = [
        'creategbd:advanced_laser_turret',
        'creategbd:basic_laser_turret'
    ]

    event.replaceInput(createRecipes, 'create:zinc_nugget', 'create_aquatic_ambitions:prismarine_alloy')
    event.replaceInput(createRecipes, 'create:shaft', 'create_aquatic_ambitions:prismarine_alloy_rod')
})
