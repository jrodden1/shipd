import React, { Component } from 'react'

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
            state: "",
            zip: ""
         },
         receiver: {
            firstname: "",
            lastname: "",
            company: "",
            street1: "",
            street2: "",
            city: "",
            state: "",
            zip: ""
         },
         serviceProviders: this.props.serviceProviders, //this will be an object with providers as keys, and services as an array for that key
         serviceProviderSelected: initialProviderSelected,
         serviceProviderOptions: initialProviderOptions,
         serviceOptionSelected: initialProviderOptions[0],
         weight: "",
         cost: "",
         trackingNum: "",
         note: ""
         //REFACTOR / Post MVP - make serviceProviders prop; array of service providers and their associated service options.  Then create option values iteratively based on this array
      }
   }
   
   handleSubmit = event => {
      event.preventDefault()
      debugger
      const newPackage = {
         service_provider: this.state.serviceProviderSelected,
         service: this.state.serviceOptionSelected,
         weight: this.state.weight,
         sender: {
            street1: this.state.sender.street1
         },
         receiver: {
            street1: this.state.receiver.street1
         },
         note: this.state.note

      }
      // use a callback here to send the state to the container like:
      this.props.createPackage(newPackage)
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

   renderProviderOptions = () => {
      const serviceProviderNames = Object.keys(this.state.serviceProviders)
      return (
         <select value={this.state.serviceProviderSelected} onChange={this.handleSPChange}>
            {serviceProviderNames.map(provider => <option value={provider}>{provider}</option>)}
         </select>
      )
   }

   renderServiceOptions = () => {
      return (
         <select value={this.state.serviceOptionSelected} onChange={this.handleSOChange}>
            {this.state.serviceProviderOptions.map(pOption => <option value={pOption}>{pOption}</option>)}
         </select>
      )
   }
   
   handleChange = event => {
      const { name, value } = event.target

      //need to make sure this only updates the one field or else it may blow away all my other changes :( 
      this.setState({
         [name]: value
      })

   }

   handleSRChange = event => {
      //debugger
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

   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            <p><strong>Sender:</strong><br/>
               Firstname: <input type="text" data-addr-kind="sender" name="firstname" id="sender_firstname" onChange={this.handleSRChange} value={this.state.sender.firstname} />
               Lastname: <input type="text" data-addr-kind="sender" name="lastname" id="sender_lastname" onChange={this.handleSRChange} value={this.state.sender.lastname} /><br/>
               Company: <input type="text" data-addr-kind="sender" name="company" id="sender_company" onChange={this.handleSRChange} value={this.state.sender.company} /><br/>
               Street Line 1: <input type="text" data-addr-kind="sender" name="street1" id="sender_street1" onChange={this.handleSRChange} value={this.state.sender.street1} /><br/>
               Street Line 2: <input type="text" data-addr-kind="sender" name="street2" id="sender_street2" onChange={this.handleSRChange} value={this.state.sender.street2} /><br/>
               City: <input type="text" data-addr-kind="sender" name="city" id="sender_city" onChange={this.handleSRChange} value={this.state.sender.city} />
               {/*should probably REFACTOR state to be a select dropdown*/}
               State: <input type="text" data-addr-kind="sender" name="state" id="sender_state" onChange={this.handleSRChange} value={this.state.sender.state} />
               Zipcode: <input type="text" data-addr-kind="sender" name="zip" id="sender_zip" onChange={this.handleSRChange} value={this.state.sender.zip} /><br/>
            </p>
            <p><strong>Receiver:</strong><br/>
               Firstname: <input type="text" data-addr-kind="reciever" name="firstname" id="receiver_firstname" onChange={this.handleSRChange} value={this.state.receiver.firstname} />
               Lastname: <input type="text" data-addr-kind="reciever" name="lastname" id="receiver_lastname" onChange={this.handleSRChange} value={this.state.receiver.lastname} /><br/>
               Company: <input type="text" data-addr-kind="reciever" name="company" id="receiver_company" onChange={this.handleSRChange} value={this.state.receiver.company} /><br/>
               Street Line 1: <input type="text" data-addr-kind="reciever" name="street1" id="receiver_street1" onChange={this.handleSRChange} value={this.state.receiver.street1} /><br/>
               Street Line 2: <input type="text" data-addr-kind="reciever" name="street2" id="receiver_street2" onChange={this.handleSRChange} value={this.state.receiver.street2} /><br/>
               City: <input type="text" data-addr-kind="reciever" name="city" id="receiver_city" onChange={this.handleSRChange} value={this.state.receiver.city} />
               {/*should probably REFACTOR state to be a select dropdown*/}
               State: <input type="text" data-addr-kind="reciever" name="state" id="receiver_state" onChange={this.handleSRChange} value={this.state.receiver.state} />
               Zipcode: <input type="text" data-addr-kind="reciever" name="zip" id="receiver_zip" onChange={this.handleSRChange} value={this.state.receiver.zip} /><br/>
            </p>
            <p>Shipping Service: <br/>
               {this.renderProviderOptions()}
               {this.renderServiceOptions()}
            </p>
            <p>Weight: 
            <input type="number" name="weight" value={this.state.weight} onChange={this.handleChange} />
            </p>
            <input type="submit" value="Create Package" />
            <br/>
         </form>
      )
   }
}
