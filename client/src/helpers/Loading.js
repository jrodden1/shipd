import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

//Functional component showing a loading spinner; used when doing API calls
const Loading = () => {
   return (
      <div style={{position: "fixed", top: "50%", left: "46%"}}>
         <div className="text-center"><Spinner style={{padding: "15px"}} variant="dark" animation="border"/> <br/><div style={{padding: "10px"}}>Loading</div></div>
      </div>
   );
}

export default Loading;
