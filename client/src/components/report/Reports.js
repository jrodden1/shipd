import React from 'react';
import serviceProviders from '../../helpers/serviceProviderHelpers'
import { Card, CardDeck } from 'react-bootstrap'
import getProviderLogo from '../../helpers/LogoHelpers'

// Functional Component that takes in the reports object and then renders out the reports based on that object
// Currently it will render out the total packages overall, total packages by provider, and total packages per each provider's service
const Reports = ({ reports }) => {
   
   //Maps through all the service provider keys and maps through all the service provider services and creates up the cards for each service provider
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

   //Renders out a card deck of all the provider's stats
   const renderProviderStats = () => {
      return (
         <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-start' }}>
            {serviceProvidersStats()}  
         </CardDeck>     
      )
   }
         
   //Actually renders out the reports page in the desired format
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
