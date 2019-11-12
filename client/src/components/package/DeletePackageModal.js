import React from 'react';
import { Modal, Button, Row, Col, Card} from 'react-bootstrap'
import { senderInfo, receiverInfo, addressInfo, formattedCost } from '../../helpers/PackageHelpers'
import getProviderLogo from '../../helpers/LogoHelpers'

/* 
This modal takes in a package and the history object.  
It is a warning modal to ask the user if they are sure they want to delete this package. 
The delete button on this modal will actually do the deleting.
*/
const DeletePackageModal = (props) => {

   const handleDeleteBtn = (event) => {
      props.deletePackage(props.package.id, props.history)
      props.onHide()
   }
   
   if (props.package) {
      const { id, weight, service_provider, service, cost, note, receiver, sender, tracking_num, created_at, updated_at } = props.package

      return (
         <Modal
            show={props.show}
            size="lg"
            onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
               <Modal.Title id="contained-modal-title-vcenter">
                  <Row className="text-center" style={{display: "flex", flexDirection: "col", alignContent: "center", justifyContent: "center"}}>
                     <Col md={{ span: 12 }}>
                        <Card style={{color: "white", background: "red", padding: "1rem"}} className="text-center"><h4>Are you sure you want to delete the following package?</h4></Card>
                        <hr />
                     </Col>
                  <Row>
                     <Col md={{ span: 12}}>
                        {getProviderLogo("shipd")} Shipd Package Id: {id}
                     </Col>
                  </Row>
                  </Row>
                  
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
                     Cost: ${formattedCost(cost)}
                  </Col>
               </Row>
               <Row style={{alignContent: "center", justifyContent: "space-evenly", padding: "10px"}}>
                  <Col className="text-center">
                     Tracking: {tracking_num}<br />
                     Note: {note}
                  </Col>   
                  <Col className="text-center">
                     Created: {new Date(created_at).toLocaleString()}<br/>
                     Last Updated: {new Date(updated_at).toLocaleString()}
                  </Col>
               </Row>
            </Modal.Body>
            <Modal.Footer style={{display: "flex", flexDirection: "row", paddingRight: "2rem", paddingLeft: "2rem", justifyContent: "space-between"}} >
               <Button variant="danger" onClick={handleDeleteBtn}> Delete Package </Button>   
               <Button variant="secondary" onClick={props.onHide}> Cancel </Button>
            </Modal.Footer>
         </Modal>
      );
   } else {
      return (
         <div data-modal="no-modal-needed-yet"></div>
      )
   }
}

export default DeletePackageModal;
               