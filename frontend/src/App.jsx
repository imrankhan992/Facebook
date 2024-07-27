import Login from "./pages/login";
import "./App.css"
import {Routes,Route} from "react-router-dom";
import Index from './components/Header/Index';


function App() {
 return <div>
    <Routes>
      <Route path="/login" element={<Login />} exact />
      <Route path="/" element={<Index />} exact />
      
      
    </Routes>
 </div>
}

export default App;
