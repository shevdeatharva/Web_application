import React from "react";
// import List from './ListComponent'
import Main from "./component/MainComponent";
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social';
import "./App.css"
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import {Provider} from 'react-redux'
import {configureStore} from '../src/redux/configureStore'
const store= configureStore();
function App() {

    return (
        <Provider store={store}>
<BrowserRouter>
        <div >
          <Main/>  
         {/* <List/>  */}
    </div>
    </BrowserRouter>
    </Provider>
    )
}

export default App;