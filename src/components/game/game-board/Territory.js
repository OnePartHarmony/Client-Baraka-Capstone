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
            // 'coords': [50,0,100,28.5,100,85.5,50,114,0,85.5,0,28.5],
            'coords': [170,0,343,100,343,295,170,395,0,295,0,100],
            'stayHighlighted': 'true',
            // preFillColor: 'rgba(255,0,0,.4)',
            // lineWidth: 4
        }]                        
    }

    return (        
        <div
            key={territory.number}
            style={{backgroundImage: `url(${background})`, height: hexWidth, width: .87 * hexWidth, backgroundSize: '100% 100%'}}
            // style={{backgroundImage: `url(${background})`, height: .285 * hexWidth, width: .25 * hexWidth, backgroundSize: '100% 100%'}}
        >
            <ImageMapper style={{zIndex: 2}}
                src={'https://i.imgur.com/oAra3xY.png'}
                map={map}
                onClick={clickFunction}
                responsive= 'true'
                parentWidth={hexWidth}
                stayHighlighted
            />            
            {/* render display of units and properties for territory */}
            {/* <p>P: {territory.priests}</p>
            <p>S: {territory.soldiers}</p>
            <p>W: {territory.wealth}</p>
            <p>A: {territory.abundace}</p>
            <p>Pop: {territory.pop}</p> */}
        </div>               
    )
}


export default Territory