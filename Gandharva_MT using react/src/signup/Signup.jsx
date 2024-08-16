import React, {useState} from 'react'
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState(null)
    const [imgId, setImgId] = useState(null)
    const [userid , setuserid] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        register();
    };

    const register = async()=>{
      try {
        console.log("I am inside register");
        
        const res =  authService.createAccount({email : email , password : password , name : name})
        setuserid(res.$id)
        console.log(`user id is : ${res.$id}`);
        
        await service.createdoc( { UserId :  name , name : name , email : email ,  ImgId : imgId}) 
        await service.create_appointments({ UserId : name })
        navigate("/Login")
      } catch (error) {
        console.log(error);
      }
    }

    const Uploadpic = async(e)=>{
        e.preventDefault()
        try {
            const response = await service.uploadFile(pic)
            setImgId(response.$id);
        } catch (error) {
            console.log(error);           
        }
    }

    return (
        <div className="registration-container">
            <form className="registration-form" onSubmit={handleSubmit} >
                <h2>SignUp</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <input 
                    type='file' 
                    name='file' 
                    required 
                    onChange={(e) => { 
                        setPic(e.target.files[0]);
                        // console.log(e.target.files[0]); 
                    }} 
                />
                <button onClick={Uploadpic}>Upload</button>
                <br />
                <button type="submit" className="submit-button" >Register</button>
            </form>
        </div>
    );
}

export default Signup