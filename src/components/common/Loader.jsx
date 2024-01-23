import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loader = ({ height = '50px', width = '50px', colour = '#007bff' }) => {
  return (
    <div style={ { textAlign: 'center' } }>
      <ThreeCircles
        height={ height }
        width={ width }
        color={ colour }
        wrapperStyle={ {} }
        wrapperClass=""
        visible={ true }
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  )
}

export default Loader;