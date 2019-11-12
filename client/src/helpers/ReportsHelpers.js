import serviceProviders from './serviceProviderHelpers'

// this helper runs every time the packages info is fetched or when the array gets updated and keeps the reports numbers accurate
const reportServiceProviderStats = (packages, providers = serviceProviders) => {
   //Grab all the names of the service providers from the providers object
   const serviceProviderNames = Object.keys(providers)
   //create a shiny new reportsObject to export.
   const reportsObj = {}
   //set some initial keys for overarching stats
   reportsObj["totalPackages"] = packages.length
   
   //Go through each provider and write a key for it inside of the reports object,
   //then filter the packages for that provider and get the total
   serviceProviderNames.forEach(provider => {
      //for each service provider, add a key for them in the reportsObj
      reportsObj[provider] = {
         total: packages.filter(pkg => pkg.service_provider === provider).length
      }
      //Now that I have the total, 
      //get the services for this provider from the providers object
      const services = providers[provider]
      //get the specific reportsObj key for this provider
      const providerObj = reportsObj[provider]

      //For each of this provider's services, add a key with the service name and 
      //make the value an array of the packages that match that provider and service
      services.forEach(service => {
         providerObj[service] = packages.filter(pkg => pkg.service_provider === provider && pkg.service === service)
      })
   })

   return reportsObj
}

export default reportServiceProviderStats