import React from "react";
import Login from "./Components/Forms/Login/Login";
import Register from "./Components/Forms/Register/Register";
import Appbar from "./Components/Appbar/Topbar";
import SubjectCard from "./Components/Subjects/SubjectCard";
import SbujectContainer from "./Components/Subjects/SubjectsContainer";
import AddSubject from "./Components/Subjects/AddSubject";

function App() {
  return (
    <div>
      <Appbar/>
      <SbujectContainer />
    </div>
  );
}

export default App;
