
// Stop vanilla brewing, including previously loaded stands and hopper automation.
// Create basin brewing is separate. Interaction is blocked in workstation_interactions.js.
NativeEvents.onEvent('net.neoforged.neoforge.event.brewing.PotionBrewEvent$Pre', event => {
    event.setCanceled(true)
})

// Keep the pack's existing recipe removal; generated stands remain cleric workstations.

ServerEvents.recipes(event => {
    event.remove({ output: 'minecraft:brewing_stand' })
})

RecipeViewerEvents.removeCategories(event => {
    event.remove('minecraft:brewing')
})
