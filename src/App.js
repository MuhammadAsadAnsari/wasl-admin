import Router from "./routes";

import React, { useEffect } from 'react';
import Notification from './firebaseNotifications/Notification'
import { createRequire } from 'module';
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

const require = createRequire(import.meta.url);

function App() {



  return (
    <>
      <Notification />
    <Router/>
    </>
  );
}



export default App;
