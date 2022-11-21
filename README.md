# Client-Baraka-Capstone

## Server Github

https://github.com/OnePartHarmony/Server-Baraka-Capstone

## Technologies

JavaScript, HTML, CSS, Node, React, MongoDB, Mongoose, Express

## User Stories

Users will be able to:

-sign up an account
-create a username
-choose a password
-log in with their username and password
-play a game with 2-4 people
-choose an alignment associated with a season
-choose a starting position
-issue commands during the command phase
-watch their units carry out their commands during execution phase
-attain victory by defeating their opponents' units
-potentially save replay files of games

Baraka - Choose your deity and remake the world in your image

Your objective is outmaneuvering your rival gods and conquering the land:
A player wins by eliminating all enemy priests.

Players log into our site (POST) and create a game (POST) or join an existing one (PATCH) that hasn't started. When creating a game you choose the number of players and your alignment. When joining you choose an alignment that hasn't already been chosen.

Setup - 
Alignment conveys a unique set of modifiers to all commands, powers, and units as well as determining move priority and other attributes. Turn order is established by the season (Autumn, Winter, Spring, Summer) connected to each player’s alignment. One at a time in season order, each player chooses a starting territory and places 1 soldier and 1 priest in that territory (POST unit/PATCH territory&player). In reverse order, each player places 1 soldier and 1 priest in a second territory. Players may not choose territories adjacent to an enemy.

Game Phases

Phase 1 - Command (POST commands, GET targets and other data)
For each territory they control with units, players choose one command to execute on that territory, unless that territory has multiple priests in which case that many commands are possible from that territory. Players choose in which order their commands of the same type and speed will execute. Multiple priests in one territory may combine commands to execute single higher level commands, which are more specific to each alignment, otherwise the player may choose the order of multiple commands per territory. The “sow” command does not have higher levels.  Level one commands are as follows:

Advance/March - Player chooses which of the units in the advancing territory will move and which will stay put. On encountering a territory occupied by an enemy, combat begins. Territory must contain priest or soldier to march. (PATCH units around territories, DELETE defeated units)

Excise -  Player gains gold equal to the territory’s wealth, decreasing that territory’s wealth by 1. Territory must contain priest or soldier to excise. (PATCH)

Muster -  Player purchases a new unit, either a soldier or a priest, using gold abundance and population. Costs vary by alignment. Territory must contain priest to muster. (POST new unit / DELETE peasant)

Miracle - Unique to each alignment
Each player gets one super-cool power to use once per game, implemented during command phase - could go horribly wrong, who knows? Territory must contain priest to miracle.

Sow - Increase territory’s wealth abundance and population by 1. Auto-sow happens in all controlled territories with only peasants. Territory must contain peasant to sow. (PATCH)


Phase 2 - Execution
Commands are carried out in subphases ordered by type - Miracle, Advance, Excise, Muster, Sow.
Within each subphase, players in season order (in Spring, the Spring player goes first followed by Summer, Autumn, Winter; next turn Summer goes first followed by Autumn etc.)
Within each subphase, one command per player who chose that command is executed in season order. If players have additional commands still to execute for that subphase, this cycle is repeated until all appropriate commands are executed. The subphase advances when all commands of that type have been executed.
If a priest (or unit commanded without a priest) is killed or pushed out of its territory before that territory’s command is executed, the command is canceled.

Battle - When a player’s units enter a territory controlled by another player, battle ensues.
When a column initiates a battle, that whole column is wagered by the attacking player. The defending player secretly chooses a number of units from the defending territory as their wager. Each player secretly chooses a formation die to roll, then multiplies their wager by the resulting roll (current implementation is die roll winner multiplies their units’ strength by 2x, this seems better for balance). The player with the higher score wins the battle. All losing units perish.


Phase 3 - Season
The season advances and turn orders change appropriately. (PATCH)
Supply is checked. (GET)
Victory conditions are checked. (GET)