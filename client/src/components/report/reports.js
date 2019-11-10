import React from 'react';
import serviceProviders from '../../helpers/serviceProviderHelpers'
import { Card, CardDeck } from 'react-bootstrap'
import getProviderLogo from '../../helpers/LogoHelpers'

//I am getting the data in the reports prop to be able to eventually make it so that the numbers for each type of package
//will be links that will show the packages
const Reports = ({ reports }) => {
   
   const serviceProvidersStats = () => {
      const serviceProviderNames = Object.keys(serviceProviders)
      return serviceProviderNames.map(provider => {

         const services = serviceProviders[provider]
         const { total } = reports[provider]
         return (
            <div key={provider}>
               <Card style={{flex: 1, width: '15rem', height: '16.5rem'}} bg="light" text="black">
                  <Card.Body>
                     <div>
                     {getProviderLogo(provider)}<br/>
                     {provider} Stats<br />
                     Total {provider} Packages: {total}
                     <br />
                     {services.map(service => {
                        return (
                           <React.Fragment key={service}>
                           <br/>
                              {service}: {reports[provider][service].length}
                           </React.Fragment>
                        )
                     })}
                     </div>
                  </Card.Body>
               </Card><br />
            </div>
         )
      })
   }

   const renderProviderStats = () => {
      return (
         <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            {serviceProvidersStats()}  
         </CardDeck>     
      )
   }
         

   return (
      <div style={{padding: "2rem"}}>
         <div style={{paddingBottom: "2rem", display: 'flex', justifyContent: "center"}}>
            <Card key="0-card" style={{width: '23rem'}} bg="light" text="black">
               <Card.Body>
                  <div className="text-center">
                     {getProviderLogo("shipd")} <strong>Overall Total Packages: {reports.totalPackages}</strong>
                  </div>
               </Card.Body>
            </Card>
         </div>
         <div>
            {renderProviderStats()}
         </div>
      </div>
   );
}

export default Reports;
