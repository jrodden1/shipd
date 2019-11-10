import React from 'react';
import { Modal, Button, Row, Col} from 'react-bootstrap'
import { senderInfo, receiverInfo, addressInfo } from '../../helpers/PackageHelpers'
import getProviderLogo from '../../helpers/LogoHelpers'

const PackageDetail = (props) => {
   if (props.package) {
      const { id, weight, service_provider, service, cost, note, receiver, sender, tracking_num, created_at, updated_at } = props.package
      const formattedCost = parseFloat(cost).toFixed(2).toString()
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
               </Col>
               <Col className="text-center">
                     {receiverInfo(props.package)}   
                     {addressInfo(receiver)}<br />
               </Col>
            </Row>
            <Row style={{padding: "10px"}}>
               <Col className="text-center">{getProviderLogo(service_provider)}<br/>
               {service}
               </Col>
               <Col className="text-center align-self-center">
                  Weight: {weight} lbs<br />
                  Cost: ${formattedCost}
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
      return (
         <div data-modal="no-modal-needed-yet"></div>
      )
   }
}

export default PackageDetail;
               