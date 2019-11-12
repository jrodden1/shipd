import React from 'react';
import Reports from '../components/report/Reports'
import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchPackages } from '../actions/PackageActions'
import Loading from '../helpers/Loading'

// Class Component that connects to the redux store to get reports information and then display it. 
class ReportsContainer extends Component {
   //In case a user navigates directly to /reports, 
   //go ahead and make sure the packages are fetched and the reports are created in the redux store
   componentDidMount () {
      this.props.fetchPackages()
   }
   
   render() {
      //show Loading if loadingPackages true, otherwise, show the reports
      if (this.props.loadingPackages) {
         return (
            <Loading />
         )
      } else {
         return (
            <div>
               <Reports reports={this.props.reports} />
            </div>
         )
      }
   } 
} 

//Grabbing and mapping state information to props 
const mapStateToProps = storeState => {
   return {
      reports: storeState.packagesReducer.reports,
      loadingPackages: storeState.packagesReducer.loadingPackages
   }
}

//Allows me to fetch packages on component mount.
const mapDispatchToProps = dispatch => {
   return {
      fetchPackages: () => dispatch(fetchPackages())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer)
