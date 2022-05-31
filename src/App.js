import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import HomePage from "./HomePage";
import Pizza from "./Pizza"


const App = () => {
  return (
    <div>
     
        <Link to="/">Home</Link>
     

      <Switch>
      
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route path="/pizza">
          <Pizza /> 
        </Route>
      
      </Switch>
    
    </div>
  );
};
export default App;
