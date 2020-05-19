import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        { props.sushis.map(sushi => 
        <Sushi sushi={sushi} key={sushi.id} 
        eatenArray={props.eatenArray}
        buySushi={props.buySushi} 
        />)}
        <MoreButton getMoreSushi={props.getMoreSushi}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer