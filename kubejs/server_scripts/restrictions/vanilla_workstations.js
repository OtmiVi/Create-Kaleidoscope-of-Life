// Two tools in a crafting grid would remove enchantments without using Create.
// Keep repairs on the restricted anvil instead; workstation block recipes and
// stonecutting recipes used by Create machines remain available.
ServerEvents.recipes(event => {
    event.remove({ id: 'minecraft:repair_item' })
})
