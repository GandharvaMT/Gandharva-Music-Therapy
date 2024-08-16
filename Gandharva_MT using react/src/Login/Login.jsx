import React , {useState} from 'react'
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name , setName] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      login();
  };

  const login = async()=>{
    try {
      var y = await authService.login({email,password});
      console.log(y);
      
     if(Name=== "Sonali" && email=== "sonaliargal9@gmail.com") {
      navigate('/Dashboard')
     }else{
      navigate('/User_Dashboard')
     }
    } catch (error) {
      console.log(error);
    }
  }

  return (
  <>
    <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Name:</label>
                    <input
                        type="text"
                        placeholder='Enter your name'      
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Enter your Email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder='Enter Password' 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
            </form>
        </div>
  </>
  )
}

export default Login