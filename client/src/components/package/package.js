import React from 'react';

const Package = ({ pkg }) => {
   return (
      <div>
         {pkg.id}<br/>
         {pkg.service}<br/>
         {pkg.service_provider}
      </div>
   );
}

export default Package;
