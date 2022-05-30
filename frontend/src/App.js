import logo from './logo.svg';
import './App.css';
import Homepage from './js/Homepage' 
import Login from './js/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DegreeAudit from './js/DegreeAudit';
import Users from './js/Users';
import Profile from './js/Profile';
import Courses from './js/Courses';
import Classes from './js/Classes';
import MasterSchedule from './js/MasterSchedule'
import {useSelector, useDispatch} from 'react-redux'
import { logoutDrawer, loginDrawer, authDrawer, selectAuth } from './redux/AuthSlice'
import Holds from './js/Holds';
import UserPage from './js/UserPage';
import RegisterForCourse from './js/RegisterForCourse';
import StudentSearch from './js/StudentSearch';
import StudentInfo from './js/StudentInfo';
import MasterSchedule2 from './js/MasterSchedule2';
import DropEnrollment from './js/DropEnrollment';
import StudentSchedule from './js/StudentSchedule';
import Faculty from './js/Faculty';
import FacultyInfo from './js/FacultyInfo';
import EditClass from './js/EditClass';
import FacultySchedule from './js/FacultySchedule';
import SeeClass from './js/SeeClass';
import AdminAddEnrollments from './js/AdminAddEnrollments';
import UpdateGrade from './js/UpdateGrade'
import AllAdvisors from './js/AllAdvisors'
import UpdateAttendance from './js/UpdateAttendance'
function App() {
  const selectAuth = useSelector((state)=>state.auth.isAuthorized)
 
  return (
    <div className=  'App'>
      <BrowserRouter>
      <Routes>
      <Route path = '/' element ={  <Homepage/>}/>
      <Route path = '/Profile' element ={<Profile authorized={selectAuth}/>}/>
      <Route path = '/courses' element = {<Courses/>}/>
      <Route path = '/login' element = {<Login/>}/>
      <Route path = '/master-schedule' element = {<MasterSchedule/>}/>
      <Route path = '/degree-audit' element = {<DegreeAudit/>}/>
      <Route path = '/classes' element = {<Classes/>}/>
      <Route path = '/users' element = {<Users/>}/>
      <Route path = '/users/:UserID' element = {<UserPage/>}/>
      <Route path = '/holds' element = {<Holds/>}/>
      <Route path = '/register' element = {<RegisterForCourse/>}/>
      <Route path = '/search-student' element = {<StudentSearch/>}/>
      <Route path = '/student-info/:UserID' element = {<StudentInfo/>}/>
      <Route path = '/enrollment/:UserID' element = {<DropEnrollment/>}/>
      <Route path = '/student-schedule' element = {<StudentSchedule/>}/>
      <Route path = '/faculty' element = {<Faculty/>}/>
      <Route path = '/faculty-info/:UserID' element = {<FacultyInfo/>}/>
      <Route path = '/faculty-class' element = {<EditClass/>}/>
      <Route path = '/faculty-schedule' element = {<FacultySchedule/>}/>
      <Route path = '/faculty-class/faculty-schedule' element = {<SeeClass/>}/>
      <Route path = '/enroll-student/:UserID' element = {<AdminAddEnrollments/>}/>
      <Route path = '/update-grade' element = {<UpdateGrade/>}/>
      <Route path = '/advisor' element = {<AllAdvisors/>}/>
      <Route path = '/update-attendance' element = {<UpdateAttendance/>}/>
      
      </Routes>
      
      </BrowserRouter>

     
    </div>
  );
}

export default App;
