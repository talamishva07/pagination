
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './componet/Form/Form';
import Dashboard from './componet/Dashboard/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Dashboard /> } />
          <Route path='/form' element={ <Form /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
