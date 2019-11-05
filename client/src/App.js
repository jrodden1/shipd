import React from 'react';
import { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home/Home'
import PackagesContainer from './containers/PackagesContainer'
import NavBar from './containers/NavbarContainer'
import ReportsContainer from './containers/ReportsContainer'

class App extends Component {

  render() {
    console.log("App Props", this.props)
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
  
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={shipdLogo} className="App-logo" alt="logo" />
  //         <p>
  //           <code>PUT CODE HERE!!</code>
  //         </p>
  //         <link
  //           rel="stylesheet"
  //           href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  //           integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  //           crossOrigin="anonymous"
  //         />
  
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );
  // }