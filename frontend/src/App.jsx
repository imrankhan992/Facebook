import Login from "./pages/login";
import "./App.css"
import {Routes,Route} from "react-router-dom";

function App() {
 return <div>
    <Routes>
      <Route path="/login" element={<Login />} exact />
      
    </Routes>
 </div>
}

export default App;
