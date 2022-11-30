export const checkClickable = (territory, clickableBoard, gameObject, userPlayerObject) => {
    

    if (!clickableBoard || territory.type === 'water') {
        return false
    }
    if (gameObject.placementOrder.length > 0 && (!territory.controlledBy || territory.controlledBy.season === userPlayerObject.season)) {
        return true
    }

}