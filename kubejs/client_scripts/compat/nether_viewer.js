// The startup creative-tab fix makes the pendant available during JEI registration.
RecipeViewerEvents.addInformation('item', event => {
    event.add('kaleidoscope_nether:ghast_pendant', [
        Text.translate('info.kubejs.ghast_pendant.source'),
        Text.translate('info.kubejs.ghast_pendant.unopened')
    ])
})

ItemEvents.modifyTooltips(event => {
    event.add('kaleidoscope_nether:blowgun', [
        Text.translate('tooltip.kubejs.blowgun.usage').gray()
    ])
    event.add('kaleidoscope_nether:ghast_pendant', [
        Text.translate('tooltip.kubejs.ghast_pendant.obtain').gray()
    ])
})
