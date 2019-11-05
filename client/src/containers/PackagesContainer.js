import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Packages from '../components/package/Packages'

class PackagesContainer extends Component {
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


export default connect(mapStateToProps)(PackagesContainer)