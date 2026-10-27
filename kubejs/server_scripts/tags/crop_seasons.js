const CROP_SEASON_GROUP_NAMES = ['spring', 'summer', 'autumn', 'winter']
const CROP_SEASON_GROUP_COMPAT = Java.loadClass('com.teamtea.eclipticseasons.compat.CompatModule$CommonConfig')

// Ecliptic Seasons combines these four Serene Seasons tags into one growth rule.
// Snapshot all source tags first so nested tag references survive conversion.
;['block', 'item'].forEach(registry => {
    ServerEvents.tags(registry, event => {
        if (!CROP_SEASON_GROUP_COMPAT.sereneSeasons.getAsBoolean()) return

        const sources = []
        for (let mask = 1; mask < 16; mask++) {
            var seasons = CROP_SEASON_GROUP_NAMES.filter((season, index) => (mask & (1 << index)) !== 0)
            var suffix = mask === 15 ? 'all_seasons' : seasons.join('_')
            var tag = 'eclipticseasons:crops/' + suffix
            sources.push({tag: tag, seasons: seasons, ids: event.get(tag).getObjectIds()})
        }

        CROP_SEASON_GROUP_NAMES.forEach(season => {
            const tag = 'sereneseasons:' + season + '_crops'
            sources.push({tag: tag, seasons: [season], ids: event.get(tag).getObjectIds()})
        })
        const yearRoundTag = 'sereneseasons:year_round_crops'
        sources.push({tag: yearRoundTag, seasons: CROP_SEASON_GROUP_NAMES, ids: event.get(yearRoundTag).getObjectIds()})

        sources.forEach(source => event.removeAll(source.tag))
        sources.forEach(source => {
            source.ids.forEach(id => {
                source.seasons.forEach(season => {
                    event.add('sereneseasons:' + season + '_crops', String(id))
                })
            })
        })
    })
})
