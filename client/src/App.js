import { useContext } from 'react';

// Importing React Router Dom 
import { BrowserRouter, Routes, Route } from "react-router-dom"


// Importing styles
import './App.css';

// Importing Components
import Login from './components/LoginComponent/Login'

// Importing context providers 
import { userContextProvider } from './context/userContext'

function App() {
  return (
    <userContextProvider>
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<h1>Dashboard Quiz Page</h1>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </userContextProvider>
  );
}

export default App;
