import Router from "./routes";

import React, { useEffect } from 'react';
import Notification from './firebaseNotifications/Notification'



function App() {



  return (
    <>
      <Notification />
    <Router/>
    </>
  );
}



export default App;
