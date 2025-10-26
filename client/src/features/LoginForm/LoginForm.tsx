import { useAuth } from "../../context/authContext";

import { BASE_API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";


const LoginForm:React.FC = () => {
    const {login} = useAuth();
    const nav = useNavigate()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        const response = await fetch(BASE_API_URL + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, 
                password
            })
        });

        if (response.status === 200) {
            const data = await response.json();
            login(data.accessToken);
            nav('/');
        }
        else {
            alert('Error signing in')
        }


    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label><br/>
            <input type="email" name="email" placeholder="you@example.com" required/><br/>
            <label htmlFor="Password">Password</label><br/>
            <input type="password" name="password" placeholder="Enter your password" required/><br/>
            <input type="submit" value='Sign In'/>
        </form>
    )
}

export default LoginForm;