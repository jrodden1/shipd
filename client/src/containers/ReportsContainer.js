import React from 'react';
import Reports from '../components/report/Reports'
import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchPackages } from '../actions/PackageActions'
import Loading from '../helpers/Loading'

class ReportsContainer extends Component {
   componentDidMount () {
      this.props.fetchPackages()
   }
   
   render() {
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

const mapStateToProps = storeState => {
   return {
      reports: storeState.packagesReducer.reports,
      loadingPackages: storeState.packagesReducer.loadingPackages
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchPackages: () => dispatch(fetchPackages())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer)
