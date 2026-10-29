# Script organization

KubeJS loads JavaScript files from subfolders within each script directory.

- `server_scripts/recipes/`: crafting recipes and ingredient changes.
- `server_scripts/tags/`: item tags for storage connectors and waystones.
- `server_scripts/compat/`: mod compatibility fixes. `placed_food_foodbook.js` counts successful bites of placed Kaleidoscope Cookery dishes (including addons) in the Spice of Life food book, using its normal progression and sync.
- `server_scripts/restrictions/`: disabled items, recipes, and brewing behavior, including related recipe viewer changes.
- `server_scripts/jei/`: recipe viewer information pages, including water and lava tank filling instructions.
- `client_scripts/jei/`: visual JEI recipes for filling tanks under a Create Spout. These displays do not add server recipes.
- `client_scripts/compat/`: Nether item usage tooltips and the Ghast Pendant's JEI source page, opened with the recipe key.
- `startup_scripts/compat/`: adds the Ghast Pendant to Nether's creative tab and creative search before JEI collects ingredients.
- `startup_scripts/compat/end_dragon_breath.js`: uses Create Dragons Plus's Dragon Breath Bucket for End's existing soup base and hides End's duplicate from creative tabs. The matching client script hides the duplicate in JEI; the server script converts old buckets and buckets collected from clouds when they enter a player's inventory.
- `data/kaleidoscope_nether/`: repairs the advancement item tag and four legacy loot modifiers for Nether 1.1.4 with Cookery 1.6.
- `data/kaleidoscope_nether/advancement/`: puts Nether advancements in their mod namespace for correct search and attribution.
- `data/minecraft/advancement/kaleidoscope_nether/`: invisible legacy definitions retain existing advancement progress; `server_scripts/compat/nether_advancement_namespace.js` copies completed criteria to the new IDs when a player logs in.
- `assets/kaleidoscope_nether/models/item/`: supplies the three missing Blowgun charging models.
- `server_scripts/examples/`, `client_scripts/examples/`, and `startup_scripts/examples/`: original example scripts.

Keep scripts inside their original server, client, or startup directory, since these load at different stages. Current custom scripts do not depend on one another's file order.

Reload server scripts with `/reload`. Client scripts reload with `F3+T`. Restart Minecraft after changing startup scripts.
