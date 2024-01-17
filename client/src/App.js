// Importing React Router Dom 
import { BrowserRouter, Routes, Route } from "react-router-dom"


// Importing styles
import './App.css';

// Importing Components
import Login from './components/LoginComponent/Login'




function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/main" element={<h1>Dashboard Quiz Page</h1>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
