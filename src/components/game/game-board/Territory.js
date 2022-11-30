import React, {useEffect, useState} from 'react'
import ImageMapper from 'react-img-mapper'
import { setTerritoryBackground, setSoldier, setPriest } from './setTerritoryImages'
import invisible from '../../../images/invisible.png'
import peasant from '../../../images/onePeasant.png'
import { checkClickable } from './checkClickable'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

const Territory = (props) => {

    const {gameObject, userPlayerObject, territory, hexWidth, clickedTerritory, setClickedTerritory, clickableBoard, playerState, advancingTerritory} = props
    const [clickable, setClickable] = useState(false)
    
    const background = setTerritoryBackground(territory)
    const soldier = setSoldier(territory)
    const priest = setPriest(territory)
    
    
    useEffect(()=> {
        setClickable(checkClickable(territory, clickableBoard, gameObject, userPlayerObject, playerState, advancingTerritory))        
    }, [clickableBoard])


    const toggleClickedTerritory = () => {        
        if (clickable){
            setClickedTerritory(previousClick => {
                if (previousClick != territory){
                    setClickedTerritory(territory)
                } else {
                    setClickedTerritory(null)
                }
            })           
        }        
    }

    let fillColor = 'rgba(255, 255, 255, 0.5)'    
    if (!clickable) {
        console.log('here')
        fillColor = 'rgba(255, 255, 255, 0)'
    }

    const map = {
        name: `map ${territory.number}`,                      
        areas: [{
            'id': `${territory.number}`,
            'name': `${territory.number}`,
            'shape': 'poly',
            'coords': [50,0,100,28.5,100,85.5,50,114,0,85.5,0,28.5],
            'stayHighlighted': 'true',
            'fillColor': `${fillColor}`,
            'preFillColor': 'rgba(255,255,0,0)'            
        }]
    }


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
                    toggleHighlighted={true}
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