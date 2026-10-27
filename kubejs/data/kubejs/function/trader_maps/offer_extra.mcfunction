# One bounded search for one randomly selected extra map; execute as the trader.
execute unless entity @s[type=minecraft:wandering_trader] run return 0
execute unless dimension minecraft:overworld run return 0

loot spawn ~ ~ ~ loot kubejs:trader_maps/extra

# Exploration-map searches return an unfilled map when no destination is found.
# Remove that temporary item and offer nothing instead of selling a blank map.
execute unless entity @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_extra,distance=..1] run kill @n[type=minecraft:item,predicate=kubejs:trader_maps/generated_extra,distance=..1]
execute unless entity @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_extra,distance=..1] run return 0

data modify storage kubejs:trader_maps trade set value {maxUses:1,buy:{id:"minecraft:emerald",count:32},sell:{id:"minecraft:stick",count:1}}
data modify storage kubejs:trader_maps trade.sell set from entity @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_extra,distance=..1] Item
data modify entity @s Offers.Recipes append from storage kubejs:trader_maps trade
data remove storage kubejs:trader_maps trade
kill @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_extra,distance=..1]
