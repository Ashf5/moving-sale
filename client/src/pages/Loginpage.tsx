import LoginForm from "../features/LoginForm/LoginForm";
import SellIcon from '@mui/icons-material/Sell';

import './loginpage.css';
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {

    return (
        <div className="main-div-login">
            <SellIcon sx={{padding:'10px',color:"#1173d4", backgroundColor: '#daecfeff', borderRadius: '5px'}}/>
            <h2>Sign In To Your Account</h2>
            <LoginForm />
            <p>Not a user? <Link to={'#'}>Sign Up</Link> </p>
        </div>
    )
}

export default LoginPage;