import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import { Link } from 'react-router-dom';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import EmployeeList from "./components/Employee_List"
import Edit from './components/Edit';
import Delete from './components/Delete';


function App() {

    

  return (
    <Router>
    <div className="App">
     <div className='border border-3 bg-warning'>
      <h1>Employee Management System</h1>
       <Link to="/register"><button className='btn btn primary' >Register</button></Link>
      <Link to="/login"><button className='btn btn success mxs-3' >Login</button></Link> 
      </div> 
      <div>
        <section>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}>
            
            <Route path='/profile/employeeList' element={<EmployeeList/>}/>
            </Route>
            <Route path="/edit/:id" element={<Edit/>}/>
            <Route path="/delete/:id" element={<Delete/>}/>
            
          </Routes>
          
        </section>
      </div>
    </div>
    </Router>
  );
}

export default App;
