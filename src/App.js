import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { useEffect } from 'react';

// pages
import Login from './pages/Login/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import { ProtectedRoute } from './components/protectedRoutes/ProtectedRoutes.jsx';
import Navbar from "./components/navbar/Navbar.jsx";
import Expenses from './pages/expenses/Expenses.jsx';
import Tasks from './pages/tasks/Tasks.jsx';
import Savings from './pages/savings/Savings.jsx';

function App() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem('user');

  useEffect(() => {
    if (user) {
      navigate('/expenses');
    }
  }, [user]);

  return (

    <>
      <Navbar user={!!user} className='bottom-nav' /><Routes>
        <Route index element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute user={user} />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/savings" element={<Savings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
