import { UseContext } from 'react';

// Importing React Router Dom 
import { BrowserRouter, Routes, Route } from "react-router-dom"


// Importing styles
import './App.css';

// Importing Components
import Login from './components/LoginComponent/Login'
import Dashboard from './components/DashboardComponent/Dashboard';
import PrivateRoutes from './utils/Private.routes'

// Importing context providers 
import { UserContextProvider } from './context/UserContext'

function App() {
  return (
    <UserContextProvider>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path='/dashboard' element={<Dashboard />}  />
            </Route>
            
          </Routes>
        </BrowserRouter>
      </div>
    </UserContextProvider>
  );
}

export default App;
