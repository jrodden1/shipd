import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Packages from '../components/package/Packages'

class PackagesContainer extends Component {
   render() {
      return (
         <div>
            <Route exact path={this.props.match.url} render={() => <h3>welcome to packages Container</h3>}/>
            <Route path={`${this.props.match.url}/:packageId`} render={routerProps => <Packages {...routerProps} packages={this.props.packages} />} />         
         </div>
      )
   }
}

const mapStateToProps = storeState => {
   return {
      packages: storeState.packages
   }
}


export default connect(mapStateToProps)(PackagesContainer)