# Script organization

KubeJS loads JavaScript files from subfolders within each script directory.

- `server_scripts/recipes/`: crafting recipes and ingredient changes.
- `server_scripts/tags/`: item tags for storage connectors and waystones.
- `server_scripts/restrictions/`: disabled items, recipes, and brewing behavior, including related recipe viewer changes.
- `server_scripts/jei/`: recipe viewer information pages, including water and lava tank filling instructions.
- `client_scripts/jei/`: visual JEI recipes for filling tanks under a Create Spout. These displays do not add server recipes.
- `server_scripts/examples/`, `client_scripts/examples/`, and `startup_scripts/examples/`: original example scripts.

Keep scripts inside their original server, client, or startup directory, since these load at different stages. Current custom scripts do not depend on one another's file order.

Reload server scripts with `/reload`. Client scripts reload with `F3+T`. Restart Minecraft after changing startup scripts.
