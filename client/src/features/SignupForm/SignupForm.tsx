import type React from "react";
import { BASE_API_URL } from "../../constants";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";



const SignupForm:React.FC = () => {
    const {login} = useAuth();
    const nav = useNavigate();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        const response = await fetch(BASE_API_URL + '/users', {
            method: 'POST', 
            body: formData
        });

        if (response.status === 201) {
            const data = await response.json();
            if (!data.accessToken) {
                alert('an error occured')
                return 
            }
            // if login was successful navigate to home
            login(data.accessToken);
            nav('/')

        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='firstname'>First Name</label><br/>
            <input type="text" name="firstname" placeholder="First Name" required/><br/>

            <label htmlFor="lastname">Last Name</label><br/>
            <input type="text" name="lastname" placeholder="Last Name" required/><br/>

            <label htmlFor='email'>Email</label><br/>
            <input type="email" name="email" placeholder="you@example.com" required/><br/>

            <label htmlFor="Password">Password</label><br/>
            <input type="password" name="password" placeholder="Enter your password" required/><br/>

            <label htmlFor='address'>Address</label><br/>
            <input type="text" name="address" placeholder="Your Address"/><br/>

            <label htmlFor="phone">Password</label><br/>
            <input type="phone" name="phone" placeholder="Phone Number"/><br/>

            <label htmlFor="profile">Profile Picture</label><br/>
            <input type="file" name='profile' accept="image/*" /><br/>

            <input type="submit" value='Sign In'/>
        </form>
    )
}

export default SignupForm;