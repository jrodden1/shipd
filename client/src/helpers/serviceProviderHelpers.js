//serviceProviders helper object.  This allows for the app to easily add additional service providers in one place (almost)
//MANUAL UPDATE LogoHelpers file with any new Providers that get added with the associated logo svg file. 
const serviceProviders = 
   {
      FedEx: ["Overnight", "2 Day", "Express Saver", "Ground"],
      UPS: ["Ground", "Next Day Air", "2nd Day Air", "3 Day Select"],
      USPS: ["Priority Mail Express", "Priority Mail", "First-Class Mail"]
   }

export default serviceProviders
