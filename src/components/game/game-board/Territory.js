import React, {useEffect, useState} from 'react'
import ImageMapper from 'react-img-mapper'
import { setTerritoryBackground } from './setTerritoryBackground'

//territory attributes
//type: [field, farmland, water, mountain]
//priests: number
//soldiers: number
//wealth: number
//abundance: number
//adjacents:
//controlledBy: Player._id
//population: number

const Territory = (props) => {

    const {user, territory, hexWidth, clickFunction} = props

    const background = setTerritoryBackground(territory)

    const map = {
        name: `map ${territory.number}`,                      
        areas: [{
            'id': `${territory.number}`,
            'name': `${territory.number}`,
            'shape': 'poly',
            'coords': [50,0,100,28.5,100,85.5,50,114,0,85.5,0,28.5],
            stayHighlighted: 'true',
            // preFillColor: 'rgba(255,0,0,.4)',
            lineWidth: 4
        }]                        
    }

    return (
        
                <div
                key={territory.number}
                style={{backgroundImage: `url(${background})`, height: .285 * hexWidth, width: .25 * hexWidth, backgroundSize: '100% 100%'}}
            >
                <ImageMapper
                    src={'https://i.imgur.com/oAra3xY.png'}
                    map={map}
                    onClick={clickFunction}
                    responsive= 'true'
                    parentWidth={hexWidth}
                />
                {/* render display of units and properties for territory */}
            </div>
               
    )
}


export default Territory