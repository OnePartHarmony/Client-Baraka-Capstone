import React from 'react'
import ImageMapper from 'react-img-mapper'
import empty from '../../images/Empty-Hex.png'
import farmland from '../../images/Farmland-Hex.png'
import field from '../../images/Field-Hex.png'
import mountain from '../../images/Mountain-Hex.png'
import water from '../../images/Water-Hex.png'

const mapTerritories = (territories, clickFunction) => {
    console.log(territories)
    const territoriesJSX = Array(37)
    
    territories.forEach(territory => {
        let background
        switch (territory.type) {
            case 'farmland' :
                background = farmland
                break
            case 'empty' :
                background = empty
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
                            'coords': [50,0,100,28.5,100,85.5,50,114,0,85.5,0,28.5]
                            // strokeColor: rgb value for outline to represent ownership
                        }]                        
                    }

        territoriesJSX.splice(territory.number, 1, (
            <div
                key={territory.number}
                style={{backgroundImage: `url(${background})`, height: '114px', width: '100px', backgroundSize: '100px 114px'}}
            >
                <ImageMapper
                    src={'https://i.imgur.com/oAra3xY.png'}
                    map= {map}
                    height='114'
                    width='100'
                    onClick={clickFunction}
                />
                {/* render display of units and properties for territory */}
            </div>
        ))
    })
console.log(territoriesJSX)
    return (
        <div className='hexBoard' 
        style={{width: '800', display: 'flex', flexDirection: 'column', position: 'relative', top: '100px'}}
        >
            <div className='hexRow1' style={{margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                {territoriesJSX.slice(0,4)}
            </div>
            <div className='hexRow2' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-28px'}}>
                {territoriesJSX.slice(4,9)}
            </div>
            <div className='hexRow3' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-56px'}}>
                {territoriesJSX.slice(9,15)}
            </div>
            <div className='hexRow4' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-84px'}}>
                {territoriesJSX.slice(15,22)}
            </div>
            <div className='hexRow5' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-112px'}}>
                {territoriesJSX.slice(22,28)}
            </div>
            <div className='hexRow6' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-140px'}}>
                {territoriesJSX.slice(28,33)}
            </div>
            <div className='hexRow7' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-168px'}}>
                {territoriesJSX.slice(33,37)}
            </div>
        </div>
)}

export default mapTerritories