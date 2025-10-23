


const LoginForm:React.FC = () => {

    return (
        <form>
            <label htmlFor='email'>Email</label><br/>
            <input type="email" name="email" placeholder="you@example.com" required/><br/>
            <label htmlFor="Password">Password</label><br/>
            <input type="password" name="password" placeholder="Enter your password" required/><br/>
            <input type="submit" value='Sign In'/>
        </form>
    )
}

export default LoginForm;