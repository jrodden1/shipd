import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Packages from '../components/package/Packages'
import { fetchPackages /*, addPackage, deletePackage */} from '../actions/PackageActions'

class PackagesContainer extends Component {
   componentDidMount() {
      this.props.fetchPackages()
   }
   
   render() {
      console.log("Packages Container Props", this.props)
      return (
         <div>
            <Route exact path={this.props.match.url} render={() => {
               return (
                  <React.Fragment>
                     <h3>welcome to Packages Container</h3>
                     <Packages packages={this.props.packages} />
                  </React.Fragment>
               )
            }}/>
            <Route path={`${this.props.match.url}/:packageId`} render={routerProps => <Packages {...routerProps} packages={this.props.packages} />} />         
         </div>
      )
   }
}

const mapStateToProps = store => {
   console.log("StoreState", store)
   return {
      packages: store.packagesReducer.packages
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchPackages: () => dispatch(fetchPackages()),
      //addPackage: newPackage => dispatch(addPackage(newPackage)),
      //deletePackage: pack => dispatch(deletePackage(pack))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)