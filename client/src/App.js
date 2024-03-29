import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/User/Header'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Home from './pages/User/Home'
import HistoryBooking from './pages/User/HistoryBooking'
import CarList from './components/User/CarList'
import Booking from './pages/User/Booking'
import UserList from './pages/AdminPages/UserList'
import BookingList from './pages/AdminPages/BookingList'
import AddCar from './pages/AdminPages/AddCar'
import CarListAdmin from './pages/AdminPages/CarListAdmin'
import Footer from './components/User/Footer';
import { useSelector } from 'react-redux';
import { selectToken } from './Slice/userSlice';
import NotPageFound from './pages/User/NotPageFound';

function App() {

  const token = useSelector(selectToken)

  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/login' element={!token ? <Login /> : <Navigate to='/' />} />
        <Route path='/register' element={!token ? <Register /> : <Navigate to='/' />} />
        <Route path='/' element={token ? <Home /> : <Navigate to='/login' />} />
        <Route path='/booking/history' element={token ? <HistoryBooking /> : <Navigate to='/login' />} />
        <Route path='/allcars' element={token ? <CarList /> : <Navigate to='/login' />} />
        <Route path='/booking/:id' element={token ? <Booking /> : <Navigate to='/login' />} />
        <Route path='/userlist' element={token ? <UserList /> : <Navigate to='/login' />} />
        <Route path='/bookinglist' element={token ? <BookingList /> : <Navigate to='/login' />} />
        <Route path='/addcar' element={token ? <AddCar /> : <Navigate to='/login' />} />
        <Route path='/editcar/:id' element={token ? <AddCar /> : <Navigate to='/login' />} />
        <Route path='/carlist' element={token ? <CarListAdmin /> : <Navigate to='/login' />} />
        <Route path='*' element={ <NotPageFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
