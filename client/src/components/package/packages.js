import React from 'react';
import Package from './Package'
import { Link } from 'react-router-dom'
import { CardDeck } from 'react-bootstrap'

const Packages = ({ packages, createPackage, deletePackage, history, setModalShow, modalShow }) => {
   const formatPackages = () => {
      //REFACTOR ; Code clean up.  I can remove this console log and make this a one line arrow function depending upon formatting.
      console.log("formatPackages", packages)
      return packages.map(pkg => <Package key={pkg.id} pkg={pkg} deletePackage={deletePackage} setModalShow={setModalShow} modalShow={modalShow} />)
   }
   
   console.log("Packages comp packages prop", packages)
   return (
      <div className="text-center">
         <Link to="/packages/new" className="btn btn-secondary">Create New Package</Link><br /><br />
         <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            {formatPackages()}
         </CardDeck>
      </div>
   );
}

export default Packages;
