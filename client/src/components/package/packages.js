import React from 'react';

const Packages = ({ packages }) => {
   const formatPackages = () => {
      console.log("formatPackages", packages)
      return (
         packages.map((pack, i) => {
            // REFACTOR:  THIS NEEDS TO RENDER A <Package> component
            return (
               <p key={pack.id}>{pack.service}, {pack.service_provider}</p>
            )
         })
      )
   }
   
   console.log("Packages comp packages prop", packages)
   return (
      <div>
         {formatPackages()}
      </div>
   );
}

export default Packages;
