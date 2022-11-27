import React from 'react'
import ImageMapper from 'react-img-mapper'
import empty from '../../images/Empty-Hex-lowSat.png'
import farmland from '../../images/Farmland-Hex-lowSat.png'
import field from '../../images/Field-Hex-lowSat.png'
import mountain from '../../images/Mountain-Hex-lowSat.png'
import water from '../../images/Water-Hex-lowSat.png'

const mapTerritories = (territories, width, clickFunction) => {
    // set a dynamic number based on the view width, with a max and min
    let hexWidth = .3 * width   
    if (hexWidth > 425) {
        hexWidth = 425
    } else if (hexWidth < 300) {
        hexWidth = 300
    }

    const territoriesJSX = Array(37)
    
    territories.forEach(territory => {
        let background
        switch (territory.type) {
            case 'farmland' :
                background = farmland
                break
            case 'field' :
                background = field
                break
            case 'water' :
                background = water
                break
            case 'mountain' :
                background = mountain
                break

            default :
                background = 'https://i.imgur.com/XIJpY5B.png?1'
        }

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
                            // strokeColor: rgb value for outline to represent ownership
                        }]                        
                    }

        territoriesJSX.splice(territory.number, 1, (
            <div
                key={territory.number}
                style={{backgroundImage: `url(${background})`, height: .285 * hexWidth, width: .25 * hexWidth, backgroundSize: '100% 100%'}}
            >
                <ImageMapper
                    src={'https://i.imgur.com/oAra3xY.png'}
                    map= {map}
                    onClick={clickFunction}
                    responsive= 'true'
                    parentWidth={hexWidth}
                />
                {/* render display of units and properties for territory */}
            </div>
        ))
    })

    return (
        <div className='hexBoard' style= {{height: 2* hexWidth}}>
            <div className='hexRow hexRow1'>
                {territoriesJSX.slice(0,4)}
            </div>
            <div className='hexRow hexRow2' style={{ top: -.072 * hexWidth }}>
                {territoriesJSX.slice(4,9)}
            </div>
            <div className='hexRow hexRow3' style={{ top: -.144 * hexWidth}}>
                {territoriesJSX.slice(9,15)}
            </div>
            <div className='hexRow hexRow4' style={{ top: -.216 * hexWidth}}>
                {territoriesJSX.slice(15,22)}
            </div>
            <div className='hexRow hexRow5' style={{ top: -.288 * hexWidth}}>
                {territoriesJSX.slice(22,28)}
            </div>
            <div className='hexRow hexRow6' style={{ top: -.360 * hexWidth}}>
                {territoriesJSX.slice(28,33)}
            </div>
            <div className='hexRow hexRow7' style={{ top: -.432 * hexWidth}}>
                {territoriesJSX.slice(33,37)}
            </div>
        </div>
)}

export default mapTerritories