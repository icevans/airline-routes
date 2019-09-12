import React from 'react';

const RouteLine = (props) => {
  const src = props.getAirportByCode(props.route.src);
  const dest = props.getAirportByCode(props.route.dest);

  return (
    <g key="">
    <circle 
      className="source" 
      cx={src.long} 
      cy={src.lat}>
      <title></title>
    </circle> 
    <circle 
      className="destination" 
      cx={dest.long} 
      cy={dest.lat}>
      <title></title>
    </circle>
    <path 
      d={`M${src.long} ${src.lat} L ${dest.long} ${dest.lat}`}
    />
  </g>
  )
}

export default RouteLine;
