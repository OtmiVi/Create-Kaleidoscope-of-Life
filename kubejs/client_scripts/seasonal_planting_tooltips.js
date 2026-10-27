const PLANTING_TOOLTIP_REGISTRIES = Java.loadClass('net.minecraft.core.registries.Registries')
const PLANTING_TOOLTIP_TAG_KEY = Java.loadClass('net.minecraft.tags.TagKey')
const PLANTING_TOOLTIP_ID = Java.loadClass('net.minecraft.resources.ResourceLocation')
const PLANTING_TOOLTIP_BLOCK_ITEM = Java.loadClass('net.minecraft.world.item.BlockItem')
const PLANTING_TOOLTIP_GROWTH = Java.loadClass('com.teamtea.eclipticseasons.common.core.crop.CropGrowthHandler')
const PLANTING_TOOLTIP_INFO = Java.loadClass('com.teamtea.eclipticseasons.common.core.crop.CropInfoManager')

const PLANTING_TOOLTIP_SEASONS = ['spring', 'summer', 'autumn', 'winter']
const PLANTING_TOOLTIP_TAGS = PLANTING_TOOLTIP_SEASONS.map(season => 'sereneseasons:' + season + '_crops')
PLANTING_TOOLTIP_TAGS.push('sereneseasons:year_round_crops')
for (let mask = 1; mask < 16; mask++) {
    var seasons = PLANTING_TOOLTIP_SEASONS.filter((season, index) => (mask & (1 << index)) !== 0)
    PLANTING_TOOLTIP_TAGS.push('eclipticseasons:crops/' + (mask === 15 ? 'all_seasons' : seasons.join('_')))
}
const PLANTING_TOOLTIP_ITEM_TAGS = PLANTING_TOOLTIP_TAGS.map(id =>
    PLANTING_TOOLTIP_TAG_KEY.create(PLANTING_TOOLTIP_REGISTRIES.ITEM, PLANTING_TOOLTIP_ID.parse(id))
)

// Ecliptic Seasons also shows a block's growth rules on its finished flower item.
// Only items in the planting tags should display agricultural information.
// Keep the block rules intact so crops planted from seeds still follow seasons.
NativeEvents.onEvent('LOWEST', 'net.neoforged.neoforge.event.entity.player.ItemTooltipEvent', event => {
    const stack = event.getItemStack()
    if (PLANTING_TOOLTIP_ITEM_TAGS.some(tag => stack['is(net.minecraft.tags.TagKey)'](tag))) return

    const item = stack.getItem()
    const tooltip = event.getToolTip()
    if (item instanceof PLANTING_TOOLTIP_BLOCK_ITEM) {
        var state = item.getBlock().defaultBlockState()
        tooltip.removeAll(PLANTING_TOOLTIP_GROWTH.appendInfo(event.getContext().level(), state))
    }
    tooltip.removeAll(PLANTING_TOOLTIP_INFO.appendInfo(item))
})
