import React from 'react';
import RouteLine from './RouteLine';

const RoutesMap = (props) => {
  console.log(props.routes);
  
  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image 
          xlinkHref="equirectangular_world.jpg" 
          href="equirectangular_world.jpg" 
          x="-180" y="-90" 
          height="100%" 
          width="100%" 
          transform="scale(1 -1)"
        />

        {props.routes.map(route => (
          <RouteLine
            route={route}
            getAirportByCode={props.getAirportByCode}
          />
        ))}
      </g>
    </svg>
  );
}

export default RoutesMap;
