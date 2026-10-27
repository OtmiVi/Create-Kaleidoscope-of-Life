// Apply directly when JEI initializes, without waiting for server viewer data.
RecipeViewerEvents.removeEntriesCompletely('fluid', event => {
    event.remove('sophisticatedcore:xp_still')
    event.remove('sophisticatedcore:xp_flowing')
})

RecipeViewerEvents.removeEntriesCompletely('item', event => {
    event.remove('kaleidoscope_cookery:millstone')

    const mods = ['sophisticatedbackpacks', 'sophisticatedstorage']
    const upgrades = ['pump_upgrade', 'advanced_pump_upgrade', 'xp_pump_upgrade']
    mods.forEach(mod => {
        upgrades.forEach(upgrade => {
            event.remove(mod + ':' + upgrade)
        })
    })
})

ItemEvents.modifyTooltips(event => {
    event.add('kaleidoscope_sculk:echo_seed', [
        Text.translate('tooltip.kubejs.echo_seed.planting').gray()
    ])
})

