import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Component } from 'react'
import { senderInfo, receiverInfo } from '../../helpers/PackageHelpers'
import getProviderLogo from '../../helpers/LogoHelpers'


//Should probably REFACTOR this into a functional component and pass down the handle delete button eventhandler
export default class Package extends Component {
   
   handleDeleteBtn = event => {
      this.props.deletePackage(this.props.pkg.id)
   }

   render() {
      const { 
         id, 
         service, 
         service_provider,
         weight,
         tracking_num,
         cost,
         note
      } = this.props.pkg

      return (
         <div>
            <Card style={{flex: 1, width: '25rem'}} bg="light" text="black">
               <Card.Header>
                  {getProviderLogo("shipd")} Shipd Package Id: {id}
               </Card.Header>
               <Card.Body>
                  <Row>
                     <Col style={{width: 11}} className="text-center">{senderInfo(this.props.pkg)}</Col>
                     <Col style={{width: 11}} className="text-center">{receiverInfo(this.props.pkg)}</Col>
                  </Row>
                  <Row style={{padding: "10px"}}>
                     <Col className="text-center">{getProviderLogo(service_provider)}<br/>
                     {service}
                     </Col>
                     <Col className="text-center align-self-center">
                        Weight: {weight} lb(s)<br />
                        Cost: ${cost}
                     </Col>
                  </Row>
                  <Row style={{alignContent: "center", justifyContent: "center", padding: "10px"}}>
                     Tracking: {tracking_num}<br />
                     Note: {note}
                  </Row>
               </Card.Body>
               <Card.Footer >
                  <Row style={{paddingRight: "10px", paddingLeft: "10px"}} className="justify-content-between">
                     <Button  variant="danger" onClick={this.handleDeleteBtn}> Delete Package </Button>
                     <Button  variant="secondary" onClick={() => this.props.setModalShow(true, this.props.pkg)}>Details</Button>   
                  </Row>   
               </Card.Footer>
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
