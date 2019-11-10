// I can refactor these two methods to outside of the render method to tidy this up.  Just need to pass in the package object to these methods 
import React from 'react'

const senderInfo = (pkg) => {
   const { sender } = pkg

   const haveNames = sender.firstname && sender.lastname
   const haveCompany = !!sender.company
   
   //Possibly refactor this so its more performant with most common case first
   if (haveNames && haveCompany) {
      return (
         <React.Fragment>
            <h5>Sender</h5>
            <p>
               <strong>{`${sender.firstname} ${sender.lastname}`}</strong><br/>
               <em>{sender.company}</em>
            </p>
         </React.Fragment>
      )
   } else if (haveNames && !haveCompany) {
      return (
         <React.Fragment>
            <h5>Sender</h5>
            <p>
               <strong>{`${sender.firstname} ${sender.lastname}`}</strong><br/>
               <small className="text-muted">No Company Specified</small>
            </p>
         </React.Fragment>
      )
   } else if (!haveNames && haveCompany) {
      return (
         <React.Fragment>
            <h5>Sender</h5>
            <p>
               <strong>{sender.company}</strong><br/>
               <small className="text-muted">No Name Specified</small>
            </p>
         </React.Fragment>
      )
   }
}

const receiverInfo = (pkg) => {
   const { receiver } = pkg

   const haveNames = receiver.firstname && receiver.lastname
   const haveCompany = !!receiver.company
   
   //Possibly refactor this so its more performant with most common case first
   if (haveNames && haveCompany) {
      return (
         <React.Fragment>
            <h5>Receiver</h5>
            <p>
               <strong>{`${receiver.firstname} ${receiver.lastname}`}</strong><br/>
               <em>{receiver.company}</em>
            </p>
         </React.Fragment>
      )
   } else if (haveNames && !haveCompany) {
      return (
         <React.Fragment>
            <h5>Receiver</h5>
            <p>
               <strong>{`${receiver.firstname} ${receiver.lastname}`}</strong><br/>
               <small className="text-muted">No Company Specified</small>
            </p>
         </React.Fragment>
      )
   } else if (!haveNames && haveCompany) {
      return (
         <React.Fragment>
            <h5>Receiver</h5>
            <p>
               <strong>{receiver.company}</strong><br/>
               <small className="text-muted">No Name Specified</small>
            </p>
         </React.Fragment>
      )
   }
}

const addressInfo = (shipperObj) => {
   const { street1, street2, city, state, zip } = shipperObj
   
   if (street1 && !street2) {
      return (
         <React.Fragment>
            {street1}<br />
            {city}, {state}  {zip}
         </React.Fragment>
      )
   } else if (street1 && street2) {
      return (
         <React.Fragment>
            {street1}, {street2}<br />
            {city}, {state}  {zip}
         </React.Fragment>
      )
   }
}

const stateList = 
   [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", 
      "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", 
      "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", 
      "OK", "OR", "MD", "MA", "MI", "MN", "MS", "MO", "PA", "RI",
      "SC", "SD",  "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
   ]

const formattedCost = (costRaw) => parseFloat(costRaw).toFixed(2).toString()

export {
   senderInfo,
   receiverInfo,
   addressInfo,
   stateList,
   formattedCost
}

