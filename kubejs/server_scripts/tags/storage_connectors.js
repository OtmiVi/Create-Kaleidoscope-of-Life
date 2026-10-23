ServerEvents.tags('item', event => {
    const connectors = [
        'sophisticatedstorage:oak_storage_connector',
        'sophisticatedstorage:spruce_storage_connector',
        'sophisticatedstorage:birch_storage_connector',
        'sophisticatedstorage:jungle_storage_connector',
        'sophisticatedstorage:acacia_storage_connector',
        'sophisticatedstorage:dark_oak_storage_connector',
        'sophisticatedstorage:mangrove_storage_connector',
        'sophisticatedstorage:cherry_storage_connector',
        'sophisticatedstorage:bamboo_storage_connector',
        'sophisticatedstorage:crimson_storage_connector',
        'sophisticatedstorage:warped_storage_connector'
    ]

    connectors.forEach(id => {
        event.add('sophisticatedstorage:storage_connectors', id)
    })

    event.add('sophisticatedstorage:limited_barrels', [
        'sophisticatedstorage:limited_barrel_1',
        'sophisticatedstorage:limited_barrel_2',
        'sophisticatedstorage:limited_barrel_3',
        'sophisticatedstorage:limited_barrel_4'
    ])
})