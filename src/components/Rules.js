import React from 'react'

const Rules = (props) => {

    return (
        <>
            <h1>Baraka</h1>
            <h2>Choose your deity and remake the world in your image</h2>
            <h3>Your objective is outmaneuvering your rival gods and conquering the land. <br/>A player wins by eliminating all enemy priests.</h3>
            <h4>Setup</h4>
            <p>Alignment conveys a unique set of modifiers to all commands, powers, and units as well as determining move priority and other attributes. Turn order is established by the season (Autumn, Winter, Spring, Summer) connected to each player's alignment. One at a time in season order, each player chooses a starting territory and places 1 soldier and 1 priest in that territory. In reverse order, each player places 1 soldier and 1 priest in a second territory. Players may not choose territories adjacent to an enemy.</p>
            <h4>Game Phases</h4>
            <h5>Phase 1: Command</h5>
            <p>For each territory they control with units, players choose one command to execute on that territory, unless that territory has multiple priests in which case that many commands are possible from that territory. Players choose in which order their commands of the same type and speed will execute. Multiple priests in one territory may combine commands to execute single higher level commands, which are more specific to each alignment, otherwise the player may choose the order of multiple commands per territory. The “sow” command does not have higher levels. Level one commands are as follows:</p>
            <h6>March:</h6>
            <p>Player chooses which of the units in the advancing territory will move and which will stay put. On encountering a territory occupied by an enemy, combat begins. Territory must contain priest or soldier to march.</p>
            <h6>Excise:</h6>
            <p>Player gains gold equal to the territory's wealth, decreasing that territory’s wealth by 1. Territory must contain priest or soldier to excise. </p>
            <h6>Muster:</h6>
            <p>Player purchases a new unit, either a soldier or a priest, using gold abundance and population. Costs vary by alignment. Territory must contain priest to muster. </p>
            <h6>Miracle:</h6>
            <p>Unique to each alignment Each player gets one super-cool power to use once per game, implemented during command phase - could go horribly wrong, who knows? Territory must contain priest to miracle.</p>
            <h6>Sow:</h6>
            <p>Increase territory's wealth abundance and population by 1. Auto-sow happens in all controlled territories with only peasants. Territory must contain peasant to sow.</p>
            <h5>Phase 2: Execution</h5>
            <p>Execution Commands are carried out in subphases ordered by type - Miracle, Advance, Excise, Muster, Sow. Within each subphase, players in season order (in Spring, the Spring player goes first followed by Summer, Autumn, Winter; next season Summer goes first followed by Autumn etc.) Within each subphase, one command per player who chose that command is executed in season order. If players have additional commands still to execute for that subphase, this cycle is repeated until all appropriate commands are executed. The subphase advances when all commands of that type have been executed. If a priest (or unit commanded without a priest) is killed or pushed out of its territory before that territory's command is executed, the command is canceled.</p>
            <h6>Battle:</h6>
            <p>When a player's units enter a territory controlled by another player, battle ensues. Each player secretly chooses a formation die to roll, then multiplies the total number of their units in battle by the resulting roll. The winner of the die roll multiplies their units' strength by 2 and the player with the higher total strength wins the battle. All losing units perish.</p>
            <h5>Phase 3: Season</h5>
            <p>Season The season advances and turn orders change appropriately. Supply and victory conditions are checked.</p>        
        
        </>
    )
}


export default Rules