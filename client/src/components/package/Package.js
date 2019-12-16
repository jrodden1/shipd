import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Component } from 'react'
import { senderInfo, receiverInfo, formattedCost } from '../../helpers/PackageHelpers'
import getProviderLogo from '../../helpers/LogoHelpers'

//This component is the workhorse of my app.  It displays the basic information about a package in a card.
//This can be REFACTORed into a functional component
export default class Package extends Component {
   
   handleDeleteBtn = event => {
      this.props.deleteModalShow(true, this.props.pkg)
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
         <Col>
            <Card className="mx-auto" style={{width: '300px'}} bg="light" text="black">
               <Card.Header>
                  {getProviderLogo("shipd")} Shipd Package Id: {id}
               </Card.Header>
               <Card.Body>
                  <Row>
                     <Col className="text-center">{senderInfo(this.props.pkg)}</Col>
                     <Col className="text-center">{receiverInfo(this.props.pkg)}</Col>
                  </Row>
                  <Row style={{padding: "10px"}}>
                     <Col className="text-center">{getProviderLogo(service_provider)}<br/>
                     {service}
                     </Col>
                     <Col className="text-center align-self-center">
                        Weight: {weight} lb(s)<br />
                        Cost: ${formattedCost(cost)}
                     </Col>
                  </Row>
                  <Row style={{alignContent: "center", justifyContent: "center", padding: "10px"}}>
                     Tracking: {(tracking_num ? tracking_num : `None Specified`)}<br />
                     Note: {(note ? note : `None Specified`)}
                  </Row>
               </Card.Body>
               <Card.Footer >
                  <Row className="justify-content-space-around">
                     <Col> 
                        <Button  variant="danger" onClick={this.handleDeleteBtn}>Delete</Button>
                     </Col>
                     <Col></Col>
                     <Col>
                        <Button  variant="secondary" onClick={() => this.props.setModalShow(true, this.props.pkg)}>Details</Button>   
                     </Col>
                  </Row>   
               </Card.Footer>
            </Card><br />
         </Col>
      )
   }
}
