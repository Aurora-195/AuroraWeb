import {Link, useActionData, useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isError, setError] = useState(false); 

    const navigate = useNavigate();

    async function handleRegisterSubmit(ev) {
        ev.preventDefault(); // Prevent the default form submission
        setError(false);

        // Check if passwords match
        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            setError(true);
            return;
        }

        try {
            // Make the POST request to the API endpoint
            const response = await axios.post('https://auroratime.org/users/register', {
                login: email,
                password: password
            }, {
                withCredentials: true // Important for cookies, authorization headers
            });

            // If the response is successful, redirect to the login page or home page
            console.log(response.data);
            navigate('/main', { state: { user: response.data.user } });
        } catch (error) {
            // If there's an error in the request, log it or display it to the user
            console.error("Error registering the user:", error.response ? error.response.data : error.message);
            alert("Error registering.");
            setError(true);
        }
    }

    return (
        <div className="bg-gradient-to-r from-purple-600 to-emerald-300 flex justify-center h-full text-white">
            <div className="mt-24 w-fit h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl font-semibold text-center mb-6">Create account</h1>
                <form onSubmit={handleRegisterSubmit}>
                    <div className="relative my-6">
                        <input 
                        value={name}
                        onChange={ev => setName(ev.target.value)}
                        className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Name"
                        />
                    </div>
                    <div className="relative my-6">
                        <input 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        type ="email" 
                        className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Email"
                        />
                    </div>
                    <div className="relative my-6">
                        <input 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        type ="password" 
                        className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Password"
                        />
                    </div>
                    <div className="relative my-6">
                        <input 
                        value={confirmPassword}
                        onChange={ev => setConfirmPassword(ev.target.value)}
                        type ="password" 
                        className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Confirm password"
                        />
                    </div>
                    
                    <button className="w-full mb-4 text-[18px] mt-1 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300"type="submit">Register</button>
                    {
                        isError 
                        ?
                        <div className="text-red-300 font-bold flex justify-center">
                            *Error registering, please try again*
                        </div>
                        :
                        null
                    }
                    
                    <div className="flex justify-center">
                        <span className="m-4">Have an Account? <Link className="hover:text-purple-100 hover:underline" to='/login'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}
