import React from 'react';
import shipdIntroNew from '../../videos/shipd-intro-new.mp4'
import { Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// Functional component that shows the Shipd home page that contains a looping background video and two option cards. 
const Home = () => {
   return (
      <div>   
         <video 
            playsInline 
            muted 
            loop 
            autoPlay
            style={{
               position: "fixed",
               top: "50%",
               left: "50%",
               minWidth: "100%",
               minHeight: "100%",
               width: "auto",
               height: "auto",
               zIndex: -100,
               transform: "translateX(-50%) translateY(-50%)",
               backgroundSize: "cover" }}>
            <source src={shipdIntroNew} type="video/mp4" />
         </video>
         <Row style={{justifyContent: "space-between", margin: "8%"}}>
            <Col>
               <Card style={{background: "rgba(0,0,0,0.75)", color: "white", width: "auto", height: "auto"}}>
                  <Card.Body className="text-center">
                     <h3>Welcome to Shipd!</h3><br/>
                     <h4>To get started, choose one of the options below:</h4><br />
                     <Row style={{display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center"}}>
                        <Col>
                           <Card style={{flex: 1, background: "rgba(0,0,0,0.95)", marginBottom: "1rem"}}>
                              <Card.Body>
                                 If you don't have any packages created yet or you want to view your existing packages, pick me!<br/><br/>
                                 <Link 
                                    className="btn btn-secondary"
                                    to="/packages">
                                    Go To Packages
                                 </Link>
                              </Card.Body>
                           </Card>
                        </Col>
                        <Col>
                           <Card style={{flex: 1, background: "rgba(0,0,0,0.5)"}}>
                              <Card.Body>
                                 If you already have packages and want to view reports about them, pick me!<br/><br/>
                                 <Link 
                                    className="btn btn-secondary"
                                    to="/reports">
                                    Go To Reports
                                 </Link>
                              </Card.Body>
                           </Card>
                        </Col>
                     </Row>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
      </div>
   );
}

export default Home;
