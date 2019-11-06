import React from 'react';

const Package = ({ pkg }) => {
   return (
      <div>
         Package No: {pkg.id}<br/>
         Service Provider: {pkg.service_provider} <br/>
         Package Service: {pkg.service}<br/>
         Weight: {pkg.weight}
         {/* need to display sender and receiver info here to */}
      </div>
   );
}

export default Package;
