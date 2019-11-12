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

/*
The switchboard so to speak of my app.
Packages Container connects to the redux store and manages overall for its children components (except for PackageForm), 
The Delete confirmation Modal and Package Detail modal live here, also a multitude of callbacks.
Packages Container also locally manages the state of the modals opening and closing.  I didn't see the need to store that in redux.
*/
class PackagesContainer extends Component {
   constructor(props) {
      super(props);
      //sets the initial state so neither of the modals are showing, and feeds them a package to make them happy
      this.state = {
         modalShow: false, 
         modalPackage: this.props.packages[0],
         deleteModalShow: false,
         deleteModalPackage: this.props.packages[0]
      }
   }
   
   //used by Package to toggle a modal on and off. 
   setModalShow = (value, pkg) => {
      this.setState({
         modalShow: value,
         modalPackage: pkg
      })
   }

   //used by Package to toggle the delete confirmation on and off. 
   deleteModalShow = (value, pkg) => {
      this.setState({
         deleteModalShow: value,
         deleteModalPackage: pkg
      })
   }

   //Loads all packages after initial mounting of component
   componentDidMount() {
      this.props.fetchPackages()
   }

   render() {
      // Does further routing to 3 urls - /packages, /packages/new/, & /packages/:id

      /* 
      first Route 
         /packages - render Loading if doing API work (i.e. loadingPackages, deletingPackages, or creatingPackages is set to true)
         otherwise, render out a Packages component
      second Route
         /packages/new - render the PackageForm for creating a new package
      third Route
         /packages/id - render Loading if doing API work (i.e. loadingPackages, deletingPackages, or creatingPackages is set to true)
         otherwise, first find the specific package from the packages array, 
         then only pass down that specific package as the packages prop to Packages component, thus only rendering the 1 package
         This is a package's "show" page, but is only used after the creation of a new package to show the new one. 
         otherwise, the PackageDetails modal acts as a show page for a package. 

      After the routes comes the two modal components (that are hidden initially)
      */
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
                     //grab just the specific package and pass it down to the packages prop... I suppose this logic could be passed down to the Packages component eventually instead of having it here.  REFACTOR
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

//Connecting to the redux store to grab the state of the following:
const mapStateToProps = store => {
   return {
      packages: store.packagesReducer.packages,
      loadingPackages: store.packagesReducer.loadingPackages,
      creatingPackage: store.packagesReducer.creatingPackage,
      deletingPackage: store.packagesReducer.deletingPackage
   }
}

// PackageActions are added used inside of functions (named after the actions) 
// to dispatch changes to state and hit up the API
const mapDispatchToProps = dispatch => {
   return {
      fetchPackages: () => dispatch(fetchPackages()),
      createPackage: (newPackage, history) => dispatch(createPackage(newPackage, history)),
      deletePackage: (pkgId, history) => dispatch(deletePackage(pkgId, history))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackagesContainer)