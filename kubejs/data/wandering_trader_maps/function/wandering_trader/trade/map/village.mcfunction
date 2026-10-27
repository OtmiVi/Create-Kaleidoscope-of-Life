# Towns and Towers settlement map. Do not sell blank maps after a failed search.
loot spawn ~ ~ ~ loot wandering_trader_maps:map/village
execute unless entity @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_town,distance=..1] run kill @n[type=minecraft:item,predicate=wandering_trader_maps:item/map/village,distance=..1]
execute unless entity @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_town,distance=..1] run return 0

data modify storage wandering_trader_maps:main trade set value {maxUses:1,buy:{id:"minecraft:emerald",count:16},sell:{id:"minecraft:stick",count:1}}
data modify storage wandering_trader_maps:main trade.sell set from entity @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_town,distance=..1] Item
data modify entity @s Offers.Recipes append from storage wandering_trader_maps:main trade
data remove storage wandering_trader_maps:main trade
kill @n[type=minecraft:item,predicate=kubejs:trader_maps/valid_town,distance=..1]
