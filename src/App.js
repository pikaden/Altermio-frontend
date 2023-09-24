import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import SignInSide from './components/SignInSide';
import ForgotPassword from './components/ForgotPassword';
import SuccessResetPassword from './components/SuccessResetPassword'

function App() {
  return (
    <div className="App">
      <div className="container">
        <SuccessResetPassword/>
      </div>
    </div>
  );
}

export default App;
