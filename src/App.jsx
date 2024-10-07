import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";  
import EditUser from "./users/EditUser";  
import ViewUser from "./users/ViewUser";  

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adduser" element={<AddUser />} />  // Update path
          <Route exact path="/edituser/:id" element={<EditUser />} />  // Update path
          <Route exact path="/viewuser/:id" element={<ViewUser />} />  // Update path
        </Routes>
      </Router>
    </div>
  );
}

export default App;
