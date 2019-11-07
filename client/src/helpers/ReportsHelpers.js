import serviceProviders from './serviceProviderHelpers'

const reportServiceProviderStats = (packages, providers = serviceProviders) => {
   const serviceProviderNames = Object.keys(providers)
   const reportsObj = {}
   //set some initial keys for overarching stats
   reportsObj["totalPackages"] = packages.length
   

   serviceProviderNames.forEach(provider => {
      //for each service provider, add a key for them in the reportsObj
      reportsObj[provider] = {
         total: packages.filter(pkg => pkg.service_provider === provider).length
      }

      //get the services for this provider on this iteration
      const services = providers[provider]
      //get the specific reportsObj key for this provider
      const providerObj = reportsObj[provider]

      //For each of this provider's services, add a key with the service name and make the value an array fo the packages that match that provider and service
      services.forEach(service => {
         providerObj[service] = packages.filter(pkg => pkg.service_provider === provider && pkg.service === service)
      })
   })

   return reportsObj
}

export default reportServiceProviderStats