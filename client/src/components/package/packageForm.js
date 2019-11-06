import React, { Component } from 'react'

export default class PackageForm extends Component {
   constructor(props) {
      super(props);

      const initialProviderSelected = Object.keys(this.props.serviceProviders)[0]
      const initialProviderOptions = this.props.serviceProviders[initialProviderSelected]
      this.state = {
         serviceProviders: this.props.serviceProviders, //this will be an object with providers as keys, and services as an array for that key
         serviceProviderSelected: initialProviderSelected,
         serviceProviderOptions: initialProviderOptions,
         serviceOptionSelected: initialProviderOptions[0],
         note: "",
         //REFACTOR / Post MVP - make serviceProviders prop; array of service providers and their associated service options.  Then create option values iteratively based on this array
      }
   }
   
   handleSubmit = event => {
      event.preventDefault()
      debugger
      // use a callback here to send the state to the container like:
      // this.props.createPackage()
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
   
   render() {
      return (
         <form onSubmit={this.handleSubmit}>
            {this.renderProviderOptions()}
            {this.renderServiceOptions()}
            <input type="submit" value="Create Package" />
         </form>
      )
   }
}
