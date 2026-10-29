// End's cloud collection code can still create its original bucket.
// Normalize those and buckets from older saves when they reach a player.
function unifyEndDragonBreathBuckets(player) {
    const inventory = player.getInventory()
    let changed = false
    for (let slot = 0; slot < inventory.getContainerSize(); slot++) {
        const stack = inventory.getItem(slot)
        if (stack.id === 'kaleidoscope_end:dragon_breath_bucket') {
            inventory.setItem(slot, Item.of('create_dragons_plus:dragon_breath_bucket', stack.getCount()))
            changed = true
        }
    }
    if (changed) inventory.setChanged()
}

PlayerEvents.loggedIn(event => {
    unifyEndDragonBreathBuckets(event.player)
})

PlayerEvents.inventoryChanged(event => {
    if (event.item.id === 'kaleidoscope_end:dragon_breath_bucket') {
        unifyEndDragonBreathBuckets(event.player)
    }
})
