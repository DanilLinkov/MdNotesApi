import React from "react";
import Login from "./Components/Forms/Login/Login";
import Register from "./Components/Forms/Register/Register";
import Appbar from "./Components/Appbar/Topbar";
import SubjectCard from "./Components/Subjects/SubjectCard";
import SbujectContainer from "./Components/Subjects/SubjectsContainer";
import AddSubject from "./Components/Subjects/AddSubject";

import {
  Switch,
  Route,
} from "react-router-dom";
import SubjecsContainer from "./Components/Subjects/SubjectsContainer";

function App() {
  return (
    <div>
      <Switch>
      <Route path="/register" exact>
          <Register/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/addsubject">
          <Appbar/>
          <AddSubject/>
        </Route>
        <Route path="/">
          <Appbar/>
          <SubjecsContainer/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
