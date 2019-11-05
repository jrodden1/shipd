import React from 'react';

const Packages = ({ packages }) => {
   const formatPackages = () => {
      return (
         packages.map((pack, i) => {
            return (
               <p key={i}>{pack.note}</p>
            )
         }))
   }
   
   console.log("Packages comp packages prop", packages)
   return (
      <div>
         {formatPackages()}
      </div>
   );
}

export default Packages;
