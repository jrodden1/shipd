import React from 'react';
import { Card } from 'react-bootstrap'
import { Component } from 'react'


//Should probably REFACTOR this into a functional component and pass down the handle delete button eventhandler
export default class Package extends Component {
   
   handleDeleteBtn = event => {
      this.props.deletePackage(this.props.pkg.id)
   }

   render() {
      const { 
         sender, 
         receiver, 
         id, 
         service, 
         service_provider,
         weight,
         tracking_num,
         cost,
         note
      } = this.props.pkg

      // I can refactor these two methods to outside of the render method to tidy this up.  Just need to pass in the package object to these methods 
      const senderInfo = () => {
         const haveNames = sender.firstname && sender.lastname
         const haveCompany = !!sender.company
         
         //Possibly refactor this so its more performant with most common case first
         if (haveNames && haveCompany) {
            return (
               <React.Fragment>
                  Sender: {`${sender.firstname} ${sender.lastname}`}<br/>
                  Company: {sender.company}<br/>
               </React.Fragment>
            )
         } else if (haveNames && !haveCompany) {
            return (
               <React.Fragment>
                  Sender: {`${sender.firstname} ${sender.lastname}`}
               </React.Fragment>
            )
         } else if (!haveNames && haveCompany) {
            return (
               <React.Fragment>
                  Sender: {`${sender.company} (Company)`}
               </React.Fragment>
            )
         }
      }

      const receiverInfo = () => {
         const haveNames = receiver.firstname && receiver.lastname
         const haveCompany = !!receiver.company
         
         //Possibly refactor this so its more performant
         if (haveNames && haveCompany) {
            return (
               <React.Fragment>
                  Receiver: {`${receiver.firstname} ${receiver.lastname}`} <br />
                  Company: {receiver.company}<br/>
               </React.Fragment>
            )
         } else if (haveNames && !haveCompany) {
            return (
               <React.Fragment>
                  Receiver: {`${receiver.firstname} ${receiver.lastname}`}
               </React.Fragment>
            )
         } else if (!haveNames && haveCompany) {
            return (
               <React.Fragment>
                  Receiver: {`${receiver.company} (Company)`}
               </React.Fragment>
            )
         }
      }

      return (
         <div>
            <Card style={{flex: 1, width: '18rem'}} bg="light" text="black">
               <Card.Body>
                  {senderInfo()}<br />
                  {receiverInfo()}<br />
                  Package No: {id}<br/>
                  Service Provider: {service_provider} <br/>
                  Package Service: {service}<br/>
                  Weight: {weight}<br />
                  Note: {note}<br />
                  Tracking: {tracking_num}<br />
                  Cost: {cost}<br />
                  <button onClick={this.handleDeleteBtn}> Delete Package </button>  
               </Card.Body>
            </Card><br />
         </div>
      )
   }
}




// const Package = ({ pkg }) => {
//    return (
//       <div>
//          Package No: {pkg.id}<br/>
//          Service Provider: {pkg.service_provider} <br/>
//          Package Service: {pkg.service}<br/>
//          Weight: {pkg.weight}
         
//          {/* need to display sender and receiver info here to */}
//       </div>
//    );
// }

// export default Package;
