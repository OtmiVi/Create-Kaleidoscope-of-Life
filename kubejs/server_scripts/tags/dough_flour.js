// Use the same ingredients across Create and Kaleidoscope, including old stock.
ServerEvents.tags('item', event => {
    const dough = ['kaleidoscope_cookery:raw_dough', 'create:dough']
    const flour = ['kaleidoscope_cookery:flour', 'create:wheat_flour']

    ;['c:dough', 'c:doughs', 'c:foods/dough', 'c:foods/dough/wheat'].forEach(tag => {
        event.add(tag, dough)
    })
    ;['c:flour', 'c:flours', 'c:flours/wheat'].forEach(tag => {
        event.add(tag, flour)
    })
})
