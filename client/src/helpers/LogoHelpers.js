import React from 'react'
import fedexLogo from '../images/fedex-logo.svg'
import upsLogo from '../images/ups-logo.svg'
import uspsLogo from '../images/usps-logo.svg'
import shipdLogo from '../images/shipd.svg'

//Helper function that returns the logo file based on the input given to it.
//NOTE: this helper will need manually updated though for additional shippers / REFACTOR
const getProviderLogo = (provider) => {
   switch (provider) {
      case "FedEx":
         return <img src={fedexLogo} alt="FedEx Logo" style={{width: 90, height: 50}}/>
      case "UPS":
         return <img src={upsLogo} alt="UPS Logo" style={{width: 50, height: 50, padding: "2px"}}/>
      case "USPS":
         return <img src={uspsLogo} alt="USPS Logo" style={{width: 50, height: 50, padding: "2px"}}/>
      default:
         return <img src={shipdLogo} alt="shipd Logo" style={{width: 50, height: 50}}/>
   } 
}

export default getProviderLogo