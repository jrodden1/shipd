import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Packages from '../components/package/Packages'
import { fetchPackages, createPackage, deletePackage } from '../actions/PackageActions'
import PackageDetail from '../components/package/PackageDetail'

class PackagesContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalShow: false, 
         modalPackage: this.props.packages[0]
      }
   }
   
   setModalShow = (value, pkg) => {
      this.setState({
         modalShow: value,
         modalPackage: pkg
      })
   }

            

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
                     <br/>
                     <Packages 
                        packages={this.props.packages} 
                        createPackage={this.props.createPackage}
                        deletePackage={this.props.deletePackage}
                        setModalShow={this.setModalShow}
                        modalShow={this.state.modalShow}
                        history={this.props.history}
                     />
                  </React.Fragment>
               )}}
            />
            <Route path={`${this.props.match.url}/:packageId`} render={routerProps => {
               console.log("Route - by Id")
               //grab just the specific package and pass it down to the packages prop... I suppose this logic could be passed down to the Packages component.  REFACTOR
               const pkg = this.props.packages.filter(pack => pack.id === parseInt(routerProps.match.params.packageId))
               return (
                  <React.Fragment>
                     <br/>
                     <Packages 
                        {...routerProps} 
                        createPackage={this.props.createPackage} 
                        packages={pkg}
                        deletePackage={this.props.deletePackage}
                        setModalShow={this.setModalShow}
                        history={this.props.history}
                     />
                  </React.Fragment>
               )}}
            />
            <PackageDetail 
               package={this.state.modalPackage}
               show={this.state.modalShow}
               onHide={() => this.setModalShow(false)}
               history={this.props.history}
               deletePackage={this.props.deletePackage}
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
      createPackage: (newPackage, history) => dispatch(createPackage(newPackage, history)),
      deletePackage: pkgId => dispatch(deletePackage(pkgId))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)