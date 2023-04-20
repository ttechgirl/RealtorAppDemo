import { BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import LogIn from "./pages/LogIn";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}> </Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}> </Route>
          <Route path="/login" element={<LogIn/>}> </Route>
          <Route path="/offers" element={<Offers/>}> </Route>
          <Route path="/profile" element={<Profile/>}> </Route>
          <Route path="/sign-up" element={<SignUp/>}> </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
