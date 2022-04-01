import React from "react";
// import List from './ListComponent'
import Main from "./component/MainComponent";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social';
import { BrowserRouter } from "react-router-dom";
import "./App.css"

function App() {
    return (
<BrowserRouter>
        <div >
         <Main/> 
        {/* <List/> */}

        </div>
        </BrowserRouter>

    )
}

export default App;