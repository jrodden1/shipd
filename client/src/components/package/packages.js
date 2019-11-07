import React from 'react';
import Package from './Package'
import PackageForm from './PackageForm'
import serviceProviders from '../../helpers/serviceProviderHelpers'
//import { Link } from 'react-router'

const Packages = ({ packages, createPackage, deletePackage }) => {
   const formatPackages = () => {
      //REFACTOR ; Code clean up.  I can remove this console log and make this a one line arrow function depending upon formatting.
      console.log("formatPackages", packages)
      return packages.map(pkg => <Package key={pkg.id} pkg={pkg} deletePackage={deletePackage} />)
   }
   
   console.log("Packages comp packages prop", packages)
   return (
      <div>
         {formatPackages()}
         <PackageForm createPackage={createPackage}
            serviceProviders={serviceProviders}
         />
      </div>
   );
}

export default Packages;
