import React from 'react';
import Package from './Package'
import { Link } from 'react-router-dom'
import { CardDeck, Card } from 'react-bootstrap'

// Functional component that renders out a welcome card if no packages yet, or renders out all the packages
const Packages = ({ packages, deleteModalShow, setModalShow, modalShow }) => {
   //This helper returns an array of all the packages formatted as Package components
   const formatPackages = () => {
      return packages.map(pkg => <Package key={pkg.id} pkg={pkg} deleteModalShow={deleteModalShow} setModalShow={setModalShow} modalShow={modalShow} />)
   }
   
   if (packages.length === 0) {
      return (
         <div className="text-center">
            <Link to="/packages/new" className="btn btn-secondary">Create New Package</Link><br /><br />
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
               <Card style={{width: "25rem", background: "light", padding: "1rem"}}>
                  <Card.Body>
                     Looks like you don't have any packages yet. <br /> Click on the Create New Package button to put your first package in!
                  </Card.Body>
               </Card>
            </div>
         </div>
      );
   } else {
      return (
         <div className="text-center">
            <Link to="/packages/new" className="btn btn-secondary">Create New Package</Link><br /><br />
            <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
               {formatPackages()}
            </CardDeck>
         </div>
      );
   }
}

export default Packages;
