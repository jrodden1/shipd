import React from 'react';
import { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home'
import PackagesContainer from './containers/PackagesContainer'
import NavBar from './containers/NavbarContainer'
import ReportsContainer from './containers/ReportsContainer'

//Class Component that contains the app.  This also renders the Navbar and initial routes.  
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/packages" render={routerProps => <PackagesContainer {...routerProps} /> } />
          <Route path="/reports" component={ReportsContainer} />
        </div>
      </Router>
    )
  }
}

export default App;
