ServerEvents.recipes(event => {
    event.remove({ type: 'exposure:film_developing' })

    const exposureCrafting = {
        mod: 'exposure',
        type: 'minecraft:crafting_shaped'
    }

    event.replaceInput(exposureCrafting, '#c:ingots/iron', 'create:iron_sheet')
    event.replaceInput(exposureCrafting, 'minecraft:iron_ingot', 'create:iron_sheet')
    event.replaceInput(exposureCrafting, '#c:ingots/gold', 'create:golden_sheet')
    event.replaceInput(exposureCrafting, 'minecraft:gold_ingot', 'create:golden_sheet')
    event.replaceInput({ id: 'exposure:lightroom' }, 'minecraft:redstone_torch', 'create:electron_tube')
})
