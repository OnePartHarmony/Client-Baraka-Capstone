import React, {useEffect, useState} from 'react'
import ImageMapper from 'react-img-mapper'
import { setTerritoryBackground, setSoldier, setPriest } from './setTerritoryImages'
import invisible from '../../../images/invisible.png'
import peasant from '../../../images/onePeasant.png'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

const Territory = (props) => {
    const {gameObject, userPlayerObject, territory, hexWidth, clickedTerritory, setClickedTerritory, clickableBoard, playerState, advancingTerritory, territoriesWithConfirmedCommands} = props
    const [clickable, setClickable] = useState(false)
    
    const background = setTerritoryBackground(territory)
    const soldier = setSoldier(territory)
    const priest = setPriest(territory.controlledBy)
    
    const checkClickable = () => {
    
        //water is never clickable
        if (!clickableBoard || territory.type === 'water') {
            return false

        //when placing a priest in beginning
        } else if (gameObject.placementOrder.length > 0 && (!territory.controlledBy || territory.controlledBy.season === userPlayerObject.season)) {
            return true
            
        //when choosing a territory to command, it must be controlled by the user and not already commanded
        } else if (playerState === 'selectTerritory' && !territoriesWithConfirmedCommands.includes(territory) && territory.controlledBy?.season === userPlayerObject.season){
            return true
            
        //when choosing a territory to advance to, it must be adjacent to the advancing territory
        //potentially playerState === 'selectCommand'
        } else if ( advancingTerritory?.adjacents.includes(territory.number) ) {
            return true
        } else {
            return false
        }    
    }
    
    useEffect(()=> {
        setClickable(checkClickable())        
    }, [clickableBoard, playerState, advancingTerritory])


    const toggleClickedTerritory = () => {        
        if (clickable){
            setClickedTerritory(previousClick => {
                if (previousClick !== territory){
                    setClickedTerritory(territory)
                } else {
                    setClickedTerritory(null)
                }
            })           
        }        
    }


    let fillColor = 'rgba(255, 255, 255, 0)'
    let preFillColor = 'rgba(0,0,0,0)'
    if (clickableBoard && !clickable && territory.type !== 'water') {
        fillColor = 'rgba(0, 0, 0, 0.5)'
        preFillColor = 'rgba(0, 0, 0, 0.5)'
    }
    //territoriesWithConfirmedCommands - same prefill and fill (unless clickable)
    if (territoriesWithConfirmedCommands.includes(territory)){        
        fillColor = 'rgba(0, 0, 255, 0.8)'
        preFillColor = 'rgba(0, 0, 255, 0.8)'
    }
    //advancingTerritory - same prefill and fill, (unless clickable - should never be clickable)
    if (territory === advancingTerritory) {
        fillColor = 'rgba(255, 0, 0, 0.5)'
        preFillColor = 'rgba(255, 0, 0, 0.5)'        
    }
    if (territory === clickedTerritory) {
        fillColor = 'rgba(255, 255, 0, 0.5)'
        preFillColor = 'rgba(255, 255, 0, 0.5)'
    }
    if (clickable) {
        fillColor = 'rgba(255, 255, 255, 0.5)'
    }

    //the hexagon-shaped clickable area
    const map = {
        name: `map ${territory.number}`,
        areas: [{
            'id': `${territory.number}`,
            'name': `${territory.number}`,
            'shape': 'poly',
            'coords': [50,0,100,28.5,100,85.5,50,114,0,85.5,0,28.5],
            'stayHighlighted': 'true',
            'fillColor': `${fillColor}`,
            'preFillColor': `${preFillColor}`
        }]
    }

    //the box that pops up to display stats when hovering over a territory
    const toolTipText = () => (        
        <>
            {territory.type === 'water'? <>Water</> :
            <>
                {
                    territory.controlledBy?
                        <>
                            Controlled by: {territory.controlledBy.user.username}
                            <br />
                        </>
                    :
                        null
                } 
                Abundance: {territory.abundance} || Population: {territory.population}
                <br />
                Wealth: {territory.wealth}
                <br />
                {
                    territory.priests?
                        <>
                            <img src={priest} alt='priest'/>: {territory.priests}
                            {/* <br /> */}
                        </>
                    :
                        null
                }
                {
                    territory.soldiers?
                        <>
                            <img src={soldier} alt='soldier'/>: {territory.soldiers}
                        </>
                    :
                        null
                }
            </>        
            }
        </>        
    )
    
    return (
        <OverlayTrigger placement="top" overlay={<Tooltip>{toolTipText()}</Tooltip>}key={territory.number}>         
            <div
                key={territory.number}
                style={{backgroundImage: `url(${background})`, height: 1.14 * hexWidth, width: hexWidth, backgroundSize: '100% 100%'}}
            >
                {/* a clear image cut to a hexagon for clicking (cannot just click on background image, because dudes may be in the way) */}
                <ImageMapper style={{zIndex: 2}}
                    areaKeyName={territory.number}
                    src={invisible}
                    map={map}
                    onClick={toggleClickedTerritory}
                    responsive= 'true'
                    width={hexWidth}
                    imgWidth={100}
                    parentWidth={hexWidth}
                    stayHighlighted={true}
                    toggleHighlighted={false}
                />              
                <div className="territoryImages">
                    {territory.soldiers > 0 && 
                        <><img className="territoryDude" src={soldier} alt='soldier'/><strong>x {territory.soldiers}</strong><br/></>
                    }                    
                    {territory.priests > 0 && 
                        <><img className="territoryDude" src={priest} alt='soldier'/><strong>x {territory.priests}</strong><br/></>
                    }                    
                    {territory.population > 0 && 
                        <><img className="territoryDude" src={peasant} alt='soldier'/><strong>x {territory.population}</strong></>
                    }
                </div>
                       
                {/* render display of units and properties for territory */}
            </div>
        </OverlayTrigger>               
    )
}


export default Territory