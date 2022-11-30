import React, {useEffect, useState} from 'react'
import ImageMapper from 'react-img-mapper'
import { setTerritoryBackground, setSoldier, setPriest } from './setTerritoryImages'
import invisible from '../../../images/invisible.png'

const Territory = (props) => {

    const {user, territory, hexWidth, clickFunction} = props

    const background = setTerritoryBackground(territory)
    const soldier = setSoldier(territory)
    const priest = setPriest(territory)



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
                /> 
            }
            {/* {territory.soldiers && 

            }            */}
            {/* render display of units and properties for territory */}
        </div>               
    )
}


export default Territory