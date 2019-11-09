import React from 'react';
import typingVideo from '../../videos/typing.mp4'
import { Card, Row, Col } from 'react-bootstrap'

const Home = () => {
   //Need to see if I can loop thru a few videos or just simply drop all these videos into 1 file to make it easier. #shrug 
   // Also something is monkeyed up with Flexbox on the nexted Card / row structure... need to look over at PackageDetail to see what's going on
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
            <source src={typingVideo} type="video/mp4" />
         </video>
         <Row style={{alignContent: "center", justifyContent: "space-between", padding: "5rem"}}>
            <Col>
               <Card style={{background: "rgba(0,0,0,0.3)", color: "white", width: "auto", height: "20rem"}}>
                  <Card.Body className="text-center">
                     <h3>Welcome to Shipd!</h3>
                     <h4>To get started, choose one of the options below:</h4>
                     <Row style={{flexDirection: "row", alignContent: "center", justifyContent: "space-evenly"}}>
                        <Col>
                           <Card style={{flex: 1, background: "rgba(0,0,0,0.5)"}}>
                              <Card.Body>
                                 Option One Goes here!
                              </Card.Body>
                           </Card>
                        </Col>
                           <Card style={{flex: 1, background: "rgba(0,0,0,0.5)"}}>
                              <Card.Body>
                                 Option Two Goes here!
                              </Card.Body>
                           </Card>
                        <Col>
                        
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
