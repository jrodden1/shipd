import React, { Component } from 'react'
import { Form, Row, Col, Container, Card } from 'react-bootstrap'
import { stateList, formattedCost } from '../../helpers/PackageHelpers.js'

/*
This Class Component is a form component for the creation of a package (and by proxy, Senders and Receivers)
This form component manages it's own internal state (as Redux doesn't need to know about it until its submitted)
It is a bit complicated but the comments below should be helpful
*/

export default class PackageForm extends Component {
   constructor(props) {
      super(props);

      // Start out by setting up some variables
      // I needed to pick an initial provider so I just selected the first one in the serviceProviders object that is passed down to me in the props.
      const initialProviderSelected = Object.keys(this.props.serviceProviders)[0]
      
      // Now that I have a provider "selected", I want to set what provider options to initially show by accessing the serviceProviders object by the key of the initialSelectedProvider
      // This returns an array of services 
      const initialProviderOptions = this.props.serviceProviders[initialProviderSelected]
      
      // Initial State setup.  For the sender and receiver state (for the address), the first item in the stateList array is selected
      this.state = {
         sender: {
            firstname: "",
            lastname: "",
            company: "",
            street1: "",
            street2: "",
            city: "",
            state: stateList[0],
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
            state: stateList[0],
            zip: "",
            phone: ""
         },
         serviceProviders: this.props.serviceProviders, //this is an object with providers as keys, and services as an array for that key
         serviceProviderSelected: initialProviderSelected, //actually do the setting of the state for the serviceProviderSelected to the initialProviderSelected variable I set above
         serviceProviderOptions: initialProviderOptions, //actually do the setting of the state for the serviceProviderOptions to the initialProviderOptions variable I set above.
         serviceOptionSelected: initialProviderOptions[0],
         weight: "",
         cost: "",
         trackingNum: "",
         note: ""
      }
   }
   
   //Handles the submitting of the form and formats the newPackage to snake_case so that when it is POSTed to the backend, I don't have to do as much formatting and is simpler to format to meet Rails strong params
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

   //Handles the Service Provider Change on the form (which will trigger an updated to the Service Options shown)
   handleSPChange = event => {
      const newServiceProviderOptions = this.props.serviceProviders[event.target.value]

      this.setState({
         ...this.state,
         serviceProviderSelected: event.target.value, //update the service provider to the new value selected
         serviceProviderOptions: newServiceProviderOptions, //Set the serviceOptions to the new provider's options
         serviceOptionSelected: newServiceProviderOptions[0] //select the first provider option by default
      })
   }

   //Handles a change to the serviceOptionSelected
   handleSOChange = event => {
      this.setState({
         ...this.state,
         serviceProviders: this.state.serviceProviders,
         serviceProviderOptions: [...this.state.serviceProviderOptions],  //Options stay the same
         serviceOptionSelected: event.target.value //Just the selected value is updated
      })
   }

   //Handle Sender or Receiver Change of input
   //A special handler is needed here since the attributes are nested. 
   handleSRChange = event => {
      // A data attribute is set on each of the sender and receiver inputs so I can know which one to update
      // the next line grabs this attribute's value.
      const kind = event.target.getAttribute("data-addr-kind")
      const {name, value} = event.target
      
      // checking for which kind of address input I'm updating, whether sender or receiver.
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
            serviceProviders: this.state.serviceProviders,
            serviceProviderSelected: this.state.serviceProviderSelected,
            serviceProviderOptions: this.state.serviceProviderOptions,
            serviceOptionSelected: this.state.serviceOptionSelected
         })
      } else {
         // if not a sender, then it must be a receiver.
         this.setState({
            ...this.state,
            sender: {
               ...this.state.sender
            },
            receiver: {
               ...this.state.receiver,
               [name]: value
            },
            serviceProviders: this.state.serviceProviders,
            serviceProviderSelected: this.state.serviceProviderSelected,
            serviceProviderOptions: this.state.serviceProviderOptions,
            serviceOptionSelected: this.state.serviceOptionSelected
         })
      }
   }

   //Genereic input change handler for simple inputs -- maintains controlled inputs 
   handleChange = event => {
      const { name, value } = event.target

      this.setState({
         [name]: value
      })
   }

   //I want my cost input to always show 2 decimal places.  onBlur of the cost input, it is updated to the nicely formatted value
   formatCostInput = (event) => {
      const formattedValue = formattedCost(event.target.value)
      this.setState({
         cost: formattedValue
      })
   }

   //Renders the service provider options as a select dropdown
   renderProviderOptions = () => {
      const serviceProviderNames = Object.keys(this.state.serviceProviders)
      return (
         <Form.Control as="select" value={this.state.serviceProviderSelected} onChange={this.handleSPChange}>
            {serviceProviderNames.map(provider => <option key={provider} value={provider}>{provider}</option>)}
         </Form.Control>
      )
   }

   //Renders the specific service provider selected's service options as a select dropdown
   renderServiceOptions = () => {
      return (
         <Form.Control as="select" value={this.state.serviceOptionSelected} onChange={this.handleSOChange}>
            {this.state.serviceProviderOptions.map((pOption, i) => <option key={i} value={pOption}>{pOption}</option>)}
         </Form.Control>
      )
   }

   //Renders out a select dropdown of all the US states for a sender or receiver based on the argument you give it
   //it is expecting a string of sender or receiver, otherwise, nothing will render. 
   renderStateList = (shipperType) => {
      if (shipperType === "sender") {
         return (
            <Form.Control as="select" name="state" id="sender_state" type="select" data-addr-kind="sender" value={this.state.sender.state} onChange={this.handleSRChange}>
               {stateList.map((usaState, i) => <option key={i} value={usaState}>{usaState}</option>)}
            </Form.Control>
         )
      } else if (shipperType === "receiver") {
         return (
            <Form.Control as="select" name="state" id="receiver_state" data-addr-kind="receiver" value={this.state.receiver.state} onChange={this.handleSRChange}>
               {stateList.map((usaState, i) => <option key={i} value={usaState}>{usaState}</option>)}
            </Form.Control>
         )
      }
   }

   // This Render method is a bit huge and needs Refactoring.  
   // Could probably make a generic Shipper component to render out the Sender and Receiver inputs areas. 
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
                           <Form.Control required placeholder="5 Digit Zip" type="text" pattern="^\d{5}$" data-addr-kind="sender" name="zip" id="sender_zip" onChange={this.handleSRChange} value={this.state.sender.zip} />
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
                           <Form.Control required placeholder="5 Digit Zip" type="text" pattern="^\d{5}$" data-addr-kind="receiver" name="zip" id="receiver_zip" onChange={this.handleSRChange} value={this.state.receiver.zip} />
                        </Form.Group>   
                     </Col>
                  </Row>     
                  <Row>
                     <Col>
                        <Form.Group>
                           <Form.Label>Phone: </Form.Label>
                           <Form.Control required type="text" data-addr-kind="receiver" name="phone" id="receiver_phone" onChange={this.handleSRChange} value={this.state.receiver.phone} />
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
