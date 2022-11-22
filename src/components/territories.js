
const mapTerritories = (territories, clickFunction) => {
    console.log(territories)
    const territoriesJSX = Array(37)
    
    territories.forEach(territory => {
        let background
        switch (territory.type) {
            case 'farmland' :
                background = 'https://i.imgur.com/XIJpY5B.png?1'
                break
            case 'empty' :
                background = 'https://i.imgur.com/KY8A5PI.png'
                break
            case 'field' :
                background = 'https://i.imgur.com/CWDQxFf.png'
                break
            case 'water' :
                background = 'https://i.imgur.com/KjQzpkn.png'
                break
            // case 'mountain' :
            //     background = ''
            //     break

            default :
                background = 'https://i.imgur.com/XIJpY5B.png?1'
        }

        territoriesJSX.splice(territory.number, 1, (
            <div
                key={territory.number}
                style={{backgroundImage: `url(${background})`, height: '100px', width: '100px', backgroundSize: '100px 100px'}}
            >
                <img
                    src='https://i.imgur.com/oAra3xY.png'
                    alt='blank'
                    useMap={territory.number}
                    height='100'
                    witdh='100'
                    style={{zIndex: '2', postition: 'absolute', left: '0', top: '0'}}
                />

                <map name={territory.number}>
                    <area
                        shape='poly'
                        coords='50,0,100,25,100,75,50,100,0,75,0,25'
                        alt={`blank image for clicking on territory ${territory.number}`}                        
                        id={territory.number}
                        href=""
                        target='_self'
                        onClick={clickFunction}
                    />
                </map>
                {/* render display of units and properties for territory */}
            </div>
        ))
    })
console.log(territoriesJSX)
    return (
        <div className='hexBoard' 
        style={{width: '800', display: 'flex', flexDirection: 'column'}}
        >
            <div className='hexRow1' style={{margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                {territoriesJSX.slice(0,4)}
            </div>
            <div className='hexRow2' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-24px'}}>
                {territoriesJSX.slice(4,9)}
            </div>
            <div className='hexRow3' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-48px'}}>
                {territoriesJSX.slice(9,15)}
            </div>
            <div className='hexRow4' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-72px'}}>
                {territoriesJSX.slice(15,22)}
            </div>
            <div className='hexRow5' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-96px'}}>
                {territoriesJSX.slice(22,28)}
            </div>
            <div className='hexRow6' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-120px'}}>
                {territoriesJSX.slice(28,33)}
            </div>
            <div className='hexRow7' style={{margin: 'auto', display: 'flex', flexDirection: 'row', position: 'relative', top: '-144px'}}>
                {territoriesJSX.slice(33,37)}
            </div>
        </div>
)}

export default mapTerritories