import React, {useEffect, useState} from 'react'
import ImageMapper from 'react-img-mapper'
import { setTerritoryBackground, setSoldier, setPriest } from './setTerritoryImages'
import invisible from '../../../images/invisible.png'
import peasant from '../../../images/onePeasant.png'

const Territory = (props) => {

    const {user, territory, hexWidth, setClickedTerritory} = props

    const background = setTerritoryBackground(territory)
    const soldier = setSoldier(territory)
    const priest = setPriest(territory)

    const clickFunction = (e) => {
        setClickedTerritory(e.id)
    }

    const map = {
        name: `map ${territory.number}`,                      
        areas: [{
            'id': `${territory.number}`,
            'name': `${territory.number}`,
            'shape': 'poly',
            'coords': [50,0,100,28.5,100,85.5,50,114,0,85.5,0,28.5],
            'stayHighlighted': 'true',
        }]
    }

    
    return (        
        <div
            key={territory.number}
            style={{backgroundImage: `url(${background})`, height: 1.14 * hexWidth, width: hexWidth, backgroundSize: '100% 100%'}}
        >
            {territory.type != 'water' && 
                <ImageMapper style={{zIndex: 2}}
                    areaKeyName={territory.number}
                    src={invisible}
                    map={map}
                    onClick={clickFunction}
                    responsive= 'true'
                    width={hexWidth}
                    imgWidth={100}
                    parentWidth={hexWidth}
                    stayHighlighted
                    toggleHighlighted
                /> 
            }
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
    )
}


export default Territory