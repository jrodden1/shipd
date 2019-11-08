import React from 'react';
import Package from './Package'
import PackageForm from './PackageForm'
import serviceProviders from '../../helpers/serviceProviderHelpers'
//import { Link } from 'react-router'
import { Row, Col, CardDeck } from 'react-bootstrap'

const Packages = ({ packages, createPackage, deletePackage, history }) => {
   const formatPackages = () => {
      //REFACTOR ; Code clean up.  I can remove this console log and make this a one line arrow function depending upon formatting.
      console.log("formatPackages", packages)
      return packages.map(pkg => <Package key={pkg.id} pkg={pkg} deletePackage={deletePackage} />)
   }
   
   console.log("Packages comp packages prop", packages)
   return (
      <div>
         <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            {formatPackages()}
         </CardDeck>
         <PackageForm 
            createPackage={createPackage}
            serviceProviders={serviceProviders}
            history={history}
         />
      </div>
   );
}

export default Packages;
