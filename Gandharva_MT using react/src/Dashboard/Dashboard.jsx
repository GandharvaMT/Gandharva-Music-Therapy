import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';
import authService from '../appwrite/auth';
import service from '../appwrite/config';
import { NavLink} from 'react-router-dom'

function Dashboard() {

  const navigate = useNavigate()
  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [xerror, setxError] = useState(null);

  const handlelogout = () => {
    authService.logout();
    navigate('/Login')
  };

  const islogin = async () => {
    try {
      var z = await authService.getCurrentUser();
      setemail(z.email);
      setname(z.name);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    islogin();
  }, [])

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setxError(null);

      try {
        const response = await service.getalldocs();
        console.log(response.documents);

        setDocuments(response.documents);
      } catch (error) {
        console.error(error);
        setxError('An error occurred while fetching documents.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);


  return (
    <>
      <h1>Welcome, {name}</h1>
      <p> Email : {email}</p>
      <button
        onClick={handlelogout}
      >
        Logout
      </button>
      <br />
      {/* <img src={service.getFilePreview()} alt="Preview Image"  />  */}
      <div className="border-black bg-red-300 container mx-auto p-4">
        {isLoading ? (
          <div className="text-center">
            <p>Loading documents...</p>
          </div>
        ) : xerror ? (
          <div className="text-center text-red-500">
            <p>{xerror}</p>
          </div>
        ) : ( 
          <ul className='list-disc space-y-2 ml-2'>
            {documents.map((document) => (
              <li key={document.$id}>
                
                <NavLink
                 to={`/admin_page/${document.name}`}
                 
                 className={({isActive}) =>
                  `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                 }
                 >
                {document.name} ({document.email})
                </NavLink>
              </li>
            ))}
          </ul>
          // Navlink lgana hai yhape
        )
        
        }
      </div>
    </>
  )
}

export default Dashboard