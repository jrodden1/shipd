import React, { Component } from 'react'
import { Form, Row, Col, Container, Card } from 'react-bootstrap'
import { stateList } from '../../helpers/PackageHelpers.js'

export default class PackageForm extends Component {
   constructor(props) {
      super(props);

      const initialProviderSelected = Object.keys(this.props.serviceProviders)[0]
      const initialProviderOptions = this.props.serviceProviders[initialProviderSelected]
      this.state = {
         sender: {
            firstname: "",
            lastname: "",
            company: "",
            street1: "",
            street2: "",
            city: "",
            state: "AL",
            zip: "",
            phone: ""
         },
         receiver: {
            firstname: "",
            lastname: "",
            company: "",
            street1: "",
            street2: "",
            city: "",
            state: "AL",
            zip: "",
            phone: ""
         },
         serviceProviders: this.props.serviceProviders, //this will be an object with providers as keys, and services as an array for that key
         serviceProviderSelected: initialProviderSelected,
         serviceProviderOptions: initialProviderOptions,
         serviceOptionSelected: initialProviderOptions[0],
         weight: "",
         cost: "",
         trackingNum: "",
         note: ""
      }
   }
   
   handleSubmit = event => {
      event.preventDefault()
      
      const newPackage = {
         service_provider: this.state.serviceProviderSelected,
         service: this.state.serviceOptionSelected,
         weight: this.state.weight,
         cost: this.state.cost,
         note: this.state.note,
         tracking_num: this.state.trackingNum,
         sender_attributes: {
            ...this.state.sender
         },
         receiver_attributes: {
            ...this.state.receiver
         }
      }
   
      this.props.createPackage(newPackage, this.props.history)
   }

   handleSPChange = event => {
      const newServiceProviderOptions = this.props.serviceProviders[event.target.value]

      this.setState({
         ...this.state,
         serviceProviderSelected: event.target.value,
         serviceProviderOptions: newServiceProviderOptions,
         serviceOptionSelected: newServiceProviderOptions[0]
      })
   }

   handleSOChange = event => {
      this.setState({
         ...this.state,
         serviceProviders: this.state.serviceProviders,
         serviceProviderOptions: [...this.state.serviceProviderOptions],
         serviceOptionSelected: event.target.value
      })
   }
   
   handleChange = event => {
      const { name, value } = event.target

      //need to make sure this only updates the one field or else it may blow away all my other changes :( 
      this.setState({
         [name]: value
      })

   }

   //Handle Sender or Receiver Change of input
   handleSRChange = event => {
      const kind = event.target.getAttribute("data-addr-kind")
      const {name, value} = event.target

      if (kind === "sender") {
         this.setState({
            ...this.state,
            sender: {
               ...this.state.sender,
               [name]: value
            },
            receiver: {
               ...this.state.receiver
            },
            serviceProviders: this.state.serviceProviders, //this will be an object with providers as keys, and services as an array for that key
            serviceProviderSelected: this.state.serviceProviderSelected,
            serviceProviderOptions: this.state.serviceProviderOptions,
            serviceOptionSelected: this.state.serviceOptionSelected
         })
      } else {
         this.setState({
            ...this.state,
            sender: {
               ...this.state.sender
            },
            receiver: {
               ...this.state.receiver,
               [name]: value
            },
            serviceProviders: this.state.serviceProviders, //this will be an object with providers as keys, and services as an array for that key
            serviceProviderSelected: this.state.serviceProviderSelected,
            serviceProviderOptions: this.state.serviceProviderOptions,
            serviceOptionSelected: this.state.serviceOptionSelected
         })
      }
   }

   formatCostInput = (event) => {
      event.target.value = parseFloat(event.target.value).toFixed(2)
      this.setState({
         cost: event.target.value.toString()
      })
   }

   renderProviderOptions = () => {
      const serviceProviderNames = Object.keys(this.state.serviceProviders)
      return (
         <Form.Control as="select" value={this.state.serviceProviderSelected} onChange={this.handleSPChange}>
            {serviceProviderNames.map((provider, i) => <option key={i} value={provider}>{provider}</option>)}
         </Form.Control>
      )
   }

   renderServiceOptions = () => {
      return (
         <Form.Control as="select" value={this.state.serviceOptionSelected} onChange={this.handleSOChange}>
            {this.state.serviceProviderOptions.map((pOption, i) => <option key={i} value={pOption}>{pOption}</option>)}
         </Form.Control>
      )
   }

   renderStateList = (shipperType) => {
      if (shipperType === "sender") {
         return (
            <Form.Control as="select" name="state" id="sender_state" type="select" data-addr-kind="sender" value={this.state.sender.state} onChange={this.handleSRChange}>
               {stateList.map((usaState, i) => <option key={i} value={usaState}>{usaState}</option>)}
            </Form.Control>
         )
      } else {
         return (
            <Form.Control as="select" name="state" id="receiver_state" data-addr-kind="receiver" value={this.state.receiver.state} onChange={this.handleSRChange}>
               {stateList.map((usaState, i) => <option key={i} value={usaState}>{usaState}</option>)}
            </Form.Control>
         )
      }
   }

   //This Render method is huge.  Could probably make the sender and receiver components separate items to render
   render() {
      return (
         <Container style={{paddingTop: "2rem"}}>
         <h2 className="text-center">Create New Package</h2><br/>
         <Card bg="light" variant="light" style={{padding: "2rem"}}>
         <Form onSubmit={this.handleSubmit}>
            <h3>Sender</h3>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Firstname: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="sender" name="firstname" id="sender_firstname" onChange={this.handleSRChange} value={this.state.sender.firstname} />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Lastname: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="sender" name="lastname" id="sender_lastname" onChange={this.handleSRChange} value={this.state.sender.lastname} />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Company: </Form.Label>
                     <Form.Control type="text" data-addr-kind="sender" name="company" id="sender_company" onChange={this.handleSRChange} value={this.state.sender.company} />
                  </Form.Group>   
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Street Line 1: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="sender" name="street1" id="sender_street1" onChange={this.handleSRChange} value={this.state.sender.street1} />
                  </Form.Group>   
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Street Line 2: </Form.Label>
                     <Form.Control type="text" data-addr-kind="sender" name="street2" id="sender_street2" onChange={this.handleSRChange} value={this.state.sender.street2} />
                  </Form.Group>   
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>City: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="sender" name="city" id="sender_city" onChange={this.handleSRChange} value={this.state.sender.city} />
                  </Form.Group>
               </Col>
               <Col>   
                  <Form.Group>
                     <Form.Label>State: </Form.Label>
                     {this.renderStateList("sender")}
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Zipcode: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="sender" name="zip" id="sender_zip" onChange={this.handleSRChange} value={this.state.sender.zip} />
                  </Form.Group>   
               </Col>
            </Row>     
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Phone: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="sender" name="phone" id="sender_phone" onChange={this.handleSRChange} value={this.state.sender.phone} />
                  </Form.Group>   
               </Col>
            </Row>
            <br />
            <h3>Receiver</h3>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Firstname: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="receiver" name="firstname" id="receiver_firstname" onChange={this.handleSRChange} value={this.state.receiver.firstname} />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Lastname: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="receiver" name="lastname" id="receiver_lastname" onChange={this.handleSRChange} value={this.state.receiver.lastname} />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Company: </Form.Label>
                     <Form.Control type="text" data-addr-kind="receiver" name="company" id="receiver_company" onChange={this.handleSRChange} value={this.state.receiver.company} />
                  </Form.Group>   
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Street Line 1: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="receiver" name="street1" id="receiver_street1" onChange={this.handleSRChange} value={this.state.receiver.street1} />
                  </Form.Group>   
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Street Line 2: </Form.Label>
                     <Form.Control type="text" data-addr-kind="receiver" name="street2" id="receiver_street2" onChange={this.handleSRChange} value={this.state.receiver.street2} />
                  </Form.Group>   
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>City: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="receiver" name="city" id="receiver_city" onChange={this.handleSRChange} value={this.state.receiver.city} />
                  </Form.Group>
               </Col>
               <Col>   
                  <Form.Group>
                     <Form.Label>State: </Form.Label>
                     {this.renderStateList("receiver")}
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Zipcode: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="receiver" name="zip" id="receiver_zip" onChange={this.handleSRChange} value={this.state.receiver.zip} />
                  </Form.Group>   
               </Col>
            </Row>     
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Phone: </Form.Label>
                     <Form.Control required type="text" data-addr-kind="receiver" name="phone" id="receiver_phone" onChange={this.handleSRChange} value={this.state.receiver.phone} />*Required
                  </Form.Group>   
               </Col>
            </Row><br/>
            <h3>Package Shipping Details</h3>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Shipping Provider: </Form.Label><br />
                     {this.renderProviderOptions()}
                  </Form.Group>     
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Shipping Service: </Form.Label><br />
                     {this.renderServiceOptions()}
                  </Form.Group>     
               </Col>
            </Row>
            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Weight <em>in lb(s):</em> </Form.Label>
                     <Form.Control required className="validate" min="1" step="1" type="number" name="weight" value={this.state.weight} onChange={this.handleChange} />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>
                     <Form.Label>Cost: </Form.Label>
                     <Form.Control 
                        required 
                        className="validate" 
                        type="number" 
                        name="cost" 
                        value={this.state.cost}
                        onChange={this.handleChange}
                        onBlur={this.formatCostInput} 
                        min="0.00" 
                        step=".01" 
                        pattern="\d+(\.\d{2})?"
                        />
                  </Form.Group>
               </Col>
            </Row>   
            

            <Row>
               <Col>
                  <Form.Group>
                     <Form.Label>Tracking Number: </Form.Label>
                     <Form.Control type="text" name="trackingNum" id="trackingNum" value={this.state.trackingNum} onChange={this.handleChange} /><br />
                  </Form.Group>
               </Col>
               <Col>
                  <Form.Group>   
                     <Form.Label>Note: </Form.Label>
                     <Form.Control type="text" name="note" id="note" value={this.state.note} onChange={this.handleChange} />
                  </Form.Group>
               </Col>
            </Row>
            <Row>
               <Col md={{ span: 4, offset: 4 }}>
                  <Form.Control className="btn btn-secondary" type="submit" value="Create Package" />
               </Col>
            </Row>
            
            
            <br/>
            
         </Form>
         </Card>
         </Container>
      )
   }
}
