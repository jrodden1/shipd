import React from 'react';
import { Modal, Button, Row, Col} from 'react-bootstrap'
import { senderInfo, receiverInfo, addressInfo, formattedCost } from '../../helpers/PackageHelpers'
import getProviderLogo from '../../helpers/LogoHelpers'

/*
This functional component displays a modal which shows more in-depth details about a package
Mainly, the detailed address information for the sender and receiver, and the created_at, and updated_at

Also note for simplicity sake, the Package objects coming back from the Rails backend have been left snake cased
so that's why you'll see some snake cased variables here.
*/

const PackageDetail = (props) => {
   if (props.package) {
      const { id, weight, service_provider, service, cost, note, receiver, sender, tracking_num, created_at, updated_at } = props.package
   return (
      <Modal
         {...props}
         size="lg"
         aria-labelledby="contained-modal-title-vcenter"
         centered>
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               {getProviderLogo("shipd")} Shipd Package Id: {id}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Row>
               <Col className="text-center" >
                     {senderInfo(props.package)}
                     {addressInfo(sender)}<br />
                     {sender.phone}
               </Col>
               <Col className="text-center">
                     {receiverInfo(props.package)}   
                     {addressInfo(receiver)}<br />
                     {receiver.phone}
               </Col>
            </Row>
            <Row style={{padding: "10px"}}>
               <Col className="text-center">{getProviderLogo(service_provider)}<br/>
               {service}
               </Col>
               <Col className="text-center align-self-center">
                  Weight: {weight} lbs<br />
                  Cost: ${formattedCost(cost)}
               </Col>
            </Row>
            <Row style={{alignContent: "center", justifyContent: "space-evenly", padding: "10px"}}>
               <Col className="text-center">
                  Tracking: {(tracking_num ? tracking_num : `None Specified`)}<br />
                  Note: {(note ? note : `None Specified`)}
               </Col>   
               <Col className="text-center">
                  Created: {new Date(created_at).toLocaleString()}<br/>
                  Last Updated: {new Date(updated_at).toLocaleString()}
               </Col>
            </Row>
         </Modal.Body>
         <Modal.Footer >
            <Row style={{paddingRight: "10px", paddingLeft: "10px"}} className="justify-content-between">
                  <Button  variant="secondary" onClick={props.onHide}> Close </Button>
            </Row>   
         </Modal.Footer>
      </Modal>
   );} else {
      // When doing initial loading, and there is no package information passed to the modal, return a blank placeholder div.
      return (
         <div data-modal="no-modal-needed-yet"></div>
      )
   }
}

export default PackageDetail;
               