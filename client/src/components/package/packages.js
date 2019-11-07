import React from 'react';
import Package from './Package'
import PackageForm from './PackageForm'
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
            serviceProviders={
               {
                  FedEx: ["Overnight", "2 Day", "Express Saver", "Ground"],
                  UPS: ["Ground", "Next Day Air", "2nd Day Air", "3 Day Select"],
                  USPS: ["Priority Mail Express", "Priority Mail", "First-Class Mail"]
               }
            }
         />
      </div>
   );
}

export default Packages;
