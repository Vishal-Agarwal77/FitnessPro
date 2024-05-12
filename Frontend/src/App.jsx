import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Layout from './Components/Layout';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Verify from './Components/Signup/Verify';
import UserLayout from './Components/UserLayout';
import Planner from './Components/Planner/Planner';
import Overall from './Components/Overall/Overall'
import Profile from './Components/Profile/Profile';
import Current from './Components/Currrent Plan/Current';
import { Children, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import NotFound from './Components/NotFound/NotFound';

const PrivateRoute = ({ children }) => {
  const AccessToken = Cookies.get("AccessToken")
  const [LoggedIn, setLoggedIn] = useState(AccessToken ? true : false)
  return (
    LoggedIn
      ?
      (<>{children}</>)
      :
      (<Navigate
        replace={true}
        to='/Login' />)
  )
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route exact path="Signup" element={<Signup />} />
            <Route exact path="Signup/verify" element={<Verify />} />
            <Route path="Login" element={<Login />} />
          </Route>
          <Route exact path="/User" element={<PrivateRoute><UserLayout /></PrivateRoute>}>
            <Route exact path='/User/home' element={<Overall />} />
            <Route exact path='/User/currentPlan' element={<Current />} />
            <Route exact path='/User/planner' element={<Planner />} />
            <Route exact path='/User/profile' element={<Profile />} />
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
