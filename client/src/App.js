import { UseContext } from 'react';

// Importing React Router Dom 
import { BrowserRouter, Routes, Route } from "react-router-dom"


// Importing styles
import './App.css';

// Importing Components
import Login from './components/LoginComponent/Login'
import MainPage from './components/MainPageComponent/MainPage';
import PrivateRoutes from './utils/Private.routes'

// Importing context providers 
import { UserContextProvider } from './context/UserContext'

function App() {
  return (
    <UserContextProvider>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* For development have made every route unprotected */}
            <Route path='/mainpage' element={<MainPage />}  />
            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              {/* <Route path='/mainpage' element={<MainPage />}  /> */}
            </Route>
            
          </Routes>
        </BrowserRouter>
      </div>
    </UserContextProvider>
  );
}

export default App;
