import React from 'react';
import serviceProviders from '../../helpers/serviceProviderHelpers'
import { Card } from 'react-bootstrap'
import fedexLogo from '../../images/fedex-logo.svg'
import upsLogo from '../../images/ups-logo.svg'
import uspsLogo from '../../images/usps-logo.svg'

//I am getting the data in the reports prop to be able to eventually make it so that the numbers for each type of package
//will be links that will show the packages
const Reports = ({ reports }) => {
   console.log("Reports Props", reports)

   //this requires manual updating if additional providers are added. REFACTOR
   const getProviderLogo = (provider) => {
      switch (provider) {
         case "FedEx":
            return <img src={fedexLogo} alt="FedEx Logo"/>
         case "UPS":
            return <img src={upsLogo} alt="UPS Logo"/>
         case "USPS":
            return <img src={uspsLogo} alt="USPS Logo" style={{width: 50, height: 50}}/>
         default:
            return ""
      } 
   }

   const renderProviderStats = () => {
      const serviceProviderNames = Object.keys(serviceProviders)
      return serviceProviderNames.map((provider, i) => {

         const services = serviceProviders[provider]
         const { total } = reports[provider]
         return (
            <Card key={i}>
               <Card.Body>
                  <div>
                  {getProviderLogo(provider)}<br/>
                  {provider} Stats<br />
                  Total {provider} Packages: {total}
                  <br />
                  {services.map((service, i) => {
                     return (
                        <React.Fragment key={i}>
                        <br/>
                           {service}: {reports[provider][service].length}
                        </React.Fragment>
                     )
                  })}
                  </div>
               </Card.Body>
            </Card>
         )
      })
   }

   return (
      <div>
         <Card>
            <Card.Body>
               <div>
                  Overall Total Packages: {reports.totalPackages}
               </div>
            </Card.Body>
         </Card>
         {renderProviderStats()}
      </div>
   );
}

export default Reports;
