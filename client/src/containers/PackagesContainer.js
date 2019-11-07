import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Packages from '../components/package/Packages'
import { fetchPackages, createPackage, deletePackage } from '../actions/PackageActions'

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

                     <Packages 
                        packages={this.props.packages} 
                        createPackage={this.props.createPackage}
                        deletePackage={this.props.deletePackage}
                     />
                  </React.Fragment>
               )}}
            />
            <Route path={`${this.props.match.url}/:packageId`} render={routerProps => {
               //grab just the specific package and pass it down to the packages prop... I suppose this logic could be passed down to the Packages component.  REFACTOR
               const pkg = this.props.packages.filter(pack => pack.id === parseInt(routerProps.match.params.packageId))
               return (
                  <React.Fragment>
                     <Packages 
                        {...routerProps} 
                        createPackage={this.props.createPackage} 
                        packages={pkg}
                     />
                  </React.Fragment>
               )}}
            />
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
      createPackage: newPackage => dispatch(createPackage(newPackage)),
      deletePackage: pkgId => dispatch(deletePackage(pkgId))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)