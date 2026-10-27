const PLACED_FOOD_GAME_EVENT = Java.loadClass('net.minecraft.world.level.gameevent.GameEvent')
const PLACED_FOOD_BLOCK_POS = Java.loadClass('net.minecraft.core.BlockPos')
const PLACED_FOOD_PLAYER = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const PLACED_FOOD_BITE_BLOCK = Java.loadClass('com.github.ysbbbbbb.kaleidoscopecookery.block.food.FoodBiteBlock')
const PLACED_FOOD_TRACKER = Java.loadClass('com.cazsius.solcarrot.tracking.FoodTracker')
const PLACED_FOOD_FINISH = Java.loadClass('net.neoforged.neoforge.event.entity.living.LivingEntityUseItemEvent$Finish')

// Cookery's placed dishes emit EAT after feeding the player, but never finish
// using an item. Listen to successful bites, including dishes from its addons.
NativeEvents.onEvent('net.neoforged.neoforge.event.VanillaGameEvent', event => {
    if (!PLACED_FOOD_GAME_EVENT.EAT.equals(event.getVanillaEvent())) return

    const player = event.getCause()
    const level = event.getLevel()
    if (level.isClientSide() || !(player instanceof PLACED_FOOD_PLAYER)) return
    // Eating a held item already reaches SoL's listener. Its EAT event can occur
    // while the player is standing inside a placed dish's block position.
    if (player.isSpectator() || player.isUsingItem()) return

    const pos = PLACED_FOOD_BLOCK_POS.containing(event.getEventPosition())
    const block = level.getBlockState(pos).getBlock()
    if (!(block instanceof PLACED_FOOD_BITE_BLOCK)) return

    const stack = block.asItem().getDefaultInstance()
    if (stack.isEmpty() || stack.getFoodProperties(player) === null) return

    // Call only SoL's normal tracker to retain its filters, unique-food tracking,
    // milestone hearts and client sync without consuming another item or bite.
    PLACED_FOOD_TRACKER.onFoodEaten(new PLACED_FOOD_FINISH(player, stack, 0, stack))
})
