import React from 'react';
import './App.css';
import MainRoutes from "./utils/routes";
import {saveMainData} from "./store/mainSlice";
import mainDataJson from "./data/data.json";
import {useDispatch} from "react-redux";

function App() {
    const dispatch = useDispatch();
    dispatch(saveMainData(mainDataJson));
    return (
      <h1>
          <MainRoutes></MainRoutes>
      </h1>
  );
}

export default App;
