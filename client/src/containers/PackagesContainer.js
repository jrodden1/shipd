import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Packages from '../components/package/Packages'
import { fetchPackages, createPackage, deletePackage } from '../actions/PackageActions'
import PackageDetail from '../components/package/PackageDetail'
import DeletePackageModal from '../components/package/DeletePackageModal'
import PackageForm from '../components/package/PackageForm'
import serviceProviders from '../helpers/serviceProviderHelpers'
import Loading from '../helpers/Loading.js'

class PackagesContainer extends Component {
   constructor(props) {
      super(props);
      this.state = {
         modalShow: false, 
         modalPackage: this.props.packages[0],
         deleteModalShow: false,
         deleteModalPackage: this.props.packages[0]
      }
   }
   
   setModalShow = (value, pkg) => {
      this.setState({
         modalShow: value,
         modalPackage: pkg
      })
   }

   deleteModalShow = (value, pkg) => {
      this.setState({
         deleteModalShow: value,
         deleteModalPackage: pkg
      })
   }

   componentDidMount() {
      this.props.fetchPackages()
   }

   render() {
      const { loadingPackages, deletingPackage, creatingPackage } = this.props
      return (
         <React.Fragment>
            <Switch>
               <Route exact path={this.props.match.url} render={() => {
                  
                  if (loadingPackages || deletingPackage || creatingPackage) {
                     return (
                        <Loading />
                     )
                  } else {
                     return (
                        <React.Fragment>
                           <br/>
                           <Packages 
                              packages={this.props.packages} 
                              createPackage={this.props.createPackage}
                              deleteModalShow={this.deleteModalShow}
                              setModalShow={this.setModalShow}
                              modalShow={this.state.modalShow}
                              history={this.props.history}
                           />
                        </React.Fragment>
                     )}}
                  }
               />
               <Route exact path={`${this.props.match.url}/new`} render={() => {
                  return (
                     <PackageForm 
                        createPackage={this.props.createPackage}
                        serviceProviders={serviceProviders}
                        history={this.props.history}
                     />
                  )}} 
               />
               <Route path={`${this.props.match.url}/:packageId`} render={routerProps => {
                  if (loadingPackages || deletingPackage || creatingPackage) {
                     return (
                        <Loading />
                     )
                  } else {
                     //grab just the specific package and pass it down to the packages prop... I suppose this logic could be passed down to the Packages component.  REFACTOR
                     const pkg = this.props.packages.filter(pack => pack.id === parseInt(routerProps.match.params.packageId))
                     return (
                        <React.Fragment>
                           <br/>
                           <Packages 
                              {...routerProps} 
                              createPackage={this.props.createPackage} 
                              packages={pkg}
                              deleteModalShow={this.deleteModalShow}
                              setModalShow={this.setModalShow}
                              modalshow={this.modalShow}
                              history={this.props.history}
                           />
                           <div className="text-center">
                              <Link
                                 to="/packages"
                                 className="btn btn-secondary"
                              >Back to All Packages
                              </Link>
                           </div>
                        </React.Fragment>
                     )}}
                  }
               />
            </Switch>
            <PackageDetail 
               package={this.state.modalPackage}
               show={this.state.modalShow}
               onHide={() => this.setModalShow(false)}
            />
            <DeletePackageModal 
               package={this.state.deleteModalPackage}
               show={this.state.deleteModalShow}
               onHide={() => this.deleteModalShow(false)}
               deletePackage={this.props.deletePackage}
               history={this.props.history}
            />
         </React.Fragment>
      )
   }
}

const mapStateToProps = store => {
   return {
      packages: store.packagesReducer.packages,
      loadingPackages: store.packagesReducer.loadingPackages,
      creatingPackage: store.packagesReducer.creatingPackage,
      deletingPackage: store.packagesReducer.deletingPackage
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