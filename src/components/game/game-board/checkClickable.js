export const checkClickable = (territory, clickableBoard, gameObject, userPlayerObject) => {
    

    if (!clickableBoard || territory.type === 'water') {
        return false
    }
    if (gameObject.placementOrder.length > 0 && (!territory.controlledBy || territory.controlledBy.season === userPlayerObject.season)) {
        return true
    }

    //if player state is selectTerritory, all un-commanded territories controlled by player are clickable
    //if player state is selectCommand, and advancingTerritory exists, all adjacents of advancingTerritory are clickable


}