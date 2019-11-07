import React from 'react';
import Reports from '../components/report/Reports'
import { connect } from 'react-redux'
import { Component } from 'react'
import { fetchPackages } from '../actions/PackageActions'

class ReportsContainer extends Component {
   componentDidMount () {
      this.props.fetchPackages()
   }
   
   render() {
      console.log("ReportsContainer Props", this.props)
      return (
         <div>
            <Reports reports={this.props.reports} />
         </div>
      )
   }
}

const mapStateToProps = storeState => {
   return {
      reports: storeState.packagesReducer.reports
   }
}

const mapDispatchToProps = dispatch => {
   return {
      fetchPackages: () => dispatch(fetchPackages())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsContainer)
// const ReportsContainer = () => {
//    return (
//       <div>
//          Welcome to reports container.  Here I'll need to connect to the store and grab some props to pass down to the Reports component
//       </div>
//    );
// }

// export default ReportsContainer;
