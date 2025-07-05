import {React} from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { SelfBuildingSquareSpinner } from 'react-epic-spinners'

import './index.css';
import {Spin} from 'antd';
var Spinner = require('react-spinkit');

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">

      <SelfBuildingSquareSpinner color="#ffa600" size="120"/>
      {/* <Spinner name="ball-zig-zag" color="purple"/> */}
        {/* <BounceLoader
        color="#e54e25"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      </div>
    </div>
  );
};

export default Loader;