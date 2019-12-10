import React from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import App from "./App.js"
import AppBack from "./AppBack.js"
import AppStatement from "./AppStatement.js";
import App404 from "./App404.js"
import AppEdit from "./AppEdit.js";
import AppRegisterToolsWrapper from "./AppRegisterTools.js";
import AppQrCode from "./AppQrCode.js";

class Routes extends React.Component {

  render(){
        return (
          <div>
             <Router>
                 <Switch>
                     <Route exact path="/" component={App} />
                     <Route  path="/back" component={AppBack} />
                     <Route  path="/home/statement" component={AppStatement} />
                     <Route  path="/home/edit" component={AppEdit} />
                     <Route  path="/home/register/tools" component={AppRegisterToolsWrapper} />
                     <Route  path="/home/qrcode" component={AppQrCode} />
                     <Route component={App404} />
                 </Switch>
             </Router>
          </div>
        )
  }

}

export default Routes;

