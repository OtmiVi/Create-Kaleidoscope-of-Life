// Nether 1.1.4 ships its advancements in Minecraft's namespace.
// Keep invisible legacy definitions so saved criteria and mod references survive,
// then copy completed criteria into the correctly namespaced advancements on login.
const NETHER_ADVANCEMENT_LOCATION = Java.loadClass('net.minecraft.resources.ResourceLocation')
const NETHER_ADVANCEMENT_MIGRATION = [
    [
        "eight_cuisines",
        [
            "chongqing_noodles",
            "couples_lung_slice",
            "forgetfulness_soup",
            "garlic_oysters",
            "luosifen",
            "mapo_tofu",
            "mapo_tofu_rice",
            "pepper_pork_belly_chicken_soup",
            "roujiamo",
            "sauerkraut_fish",
            "spicy_pot",
            "spicy_pot_rice"
        ]
    ],
    [
        "gilded_barbaric_roast",
        [
            "gilded_barbaric_roast"
        ]
    ],
    [
        "gilded_fragment",
        [
            "gilded_fragment"
        ]
    ],
    [
        "hoglin_tusk",
        [
            "hoglin_tusk"
        ]
    ],
    [
        "hoglin_tusk_braised_meat",
        [
            "hoglin_tusk_braised_meat"
        ]
    ],
    [
        "lava_roasted_chicken",
        [
            "lava_roasted_chicken"
        ]
    ],
    [
        "nether_agriculturist",
        [
            "crimson_fruit",
            "poisonous_fruit",
            "soul_pepper",
            "warped_fruit"
        ]
    ],
    [
        "nether_caterpillar",
        [
            "nether_caterpillar"
        ]
    ],
    [
        "nether_caterpillar_feast",
        [
            "caramel_nether_caterpillar",
            "caramel_nether_caterpillar_rice",
            "nether_caterpillar_sashimi"
        ]
    ],
    [
        "root",
        [
            "mod_items"
        ]
    ],
    [
        "soul_return_rice",
        [
            "soul_return_rice"
        ]
    ],
    [
        "star_blessing_buff",
        [
            "star_blessing_buff"
        ]
    ],
    [
        "star_diet",
        [
            "soul_return_rice",
            "star_ghast_pasta",
            "star_stew",
            "star_stew_meat"
        ]
    ],
    [
        "star_dust",
        [
            "star_dust"
        ]
    ],
    [
        "tusk_knife",
        [
            "primitive_machete"
        ]
    ],
    [
        "wither_bone_soup",
        [
            "wither_bone_soup"
        ]
    ],
    [
        "wither_rib",
        [
            "wither_rib"
        ]
    ]
]

PlayerEvents.loggedIn(event => {
    const player = event.player
    const server = player.getServer()
    if (server === null) return

    const definitions = server.getAdvancements()
    const progress = player.getAdvancements()

    NETHER_ADVANCEMENT_MIGRATION.forEach(entry => {
        const path = entry[0]
        const legacy = definitions.get(NETHER_ADVANCEMENT_LOCATION.parse('minecraft:kaleidoscope_nether/' + path))
        const current = definitions.get(NETHER_ADVANCEMENT_LOCATION.parse('kaleidoscope_nether:' + path))
        if (legacy === null || current === null) return

        const legacyProgress = progress.getOrStartProgress(legacy)
        entry[1].forEach(name => {
            const criterion = legacyProgress.getCriterion(name)
            if (criterion !== null && criterion.isDone()) {
                progress.award(current, name)
            }
        })
    })
})
