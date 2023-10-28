import {Link, useActionData} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmit(ev) {
        //handle login submit
    }
    
    return (
        <div className="bg-gradient-to-r from-purple-600 to-emerald-300 flex justify-center h-full text-white">
            <div className="mt-10 w-fit h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
                <h1 className="text-4xl font-semibold text-center mb-6">Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div className="relative my-6">
                        <input 
                         value={email}
                         onChange={ev => setEmail(ev.target.value)}
                        type ="email" 
                        placeholder="Email" 
                        className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                        />
                    </div>
                    <div className="relative my-6">
                        <input 
                         value={password}
                         onChange={ev => setPassword(ev.target.value)}
                        type="password" 
                        placeholder="Password" 
                        className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <input type="checkbox"/>
                            <label>Remember Me</label>
                        </div>
                        <span className="hover:text-purple-100 hover:underline">Forgot Password?</span>
                    </div>
                    <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300"type="submit">Login</button>
                    <div className="flex justify-center">
                        <span className="m-4">New User? <Link className="hover:text-purple-100 hover:underline" to='/register'>Create New Account</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage