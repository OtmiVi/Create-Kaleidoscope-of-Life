// Build the normal creative/search entry before JEI collects its ingredients.
StartupEvents.modifyCreativeTab('kaleidoscope_nether:kaleidoscope_nether_tab', event => {
    event.add('kaleidoscope_nether:ghast_pendant')
})
