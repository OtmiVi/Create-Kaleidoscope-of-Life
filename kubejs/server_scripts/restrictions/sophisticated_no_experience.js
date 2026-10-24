const SOPHISTICATED_XP_REGISTRIES = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')

// XP pumps, their installation and Mending are disabled in Sophisticated configs.
// Furnace experience remains available; no global XP events are intercepted.
function blockSophisticatedXpBucket(event) {
    const id = String(SOPHISTICATED_XP_REGISTRIES.ITEM.getKey(event.getItemStack().getItem()))
    if (id === 'sophisticatedcore:xp_bucket') event.setCanceled(true)
}

NativeEvents.onEvent('HIGHEST', 'net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickItem', blockSophisticatedXpBucket)
NativeEvents.onEvent('HIGHEST', 'net.neoforged.neoforge.event.entity.player.PlayerInteractEvent$RightClickBlock', blockSophisticatedXpBucket)
