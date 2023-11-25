import {Link, useActionData, useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

export default function newUserWidget() {
    
    //grab username
    const name = "Bob"

    const [activity1, setActivity1] = useState('');
    const [activity2, setActivity2] = useState('');
    const [activity3, setActivity3] = useState('');
    const [activity4, setActivity4] = useState('');

    async function handleActivityCreation(ev) {
        //create activities and go to dashboard page

        //give error if one of the variables are empty
    }

    return (
        <div className="flex-col w-96 h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative text-white flex justify-center">
            <h1 className="text-4xl font-semibold text-center mb-2">Hi {name}!</h1>
            <h3 className="font-semibold text-center mb-6">Input 4 activities that you want to track!</h3>
            <form onSubmit={handleActivityCreation} className="grid justify-items-center">
                <div className="relative mb-4 flex flex-row space-x-2">
                    <input 
                    value={activity1}
                    onChange={ev => setActivity1(ev.target.value)}
                    className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Activity 1"
                    />
                </div>
                <div className="relative my-4 flex flex-row space-x-2">
                    <input 
                    value={activity2}
                    onChange={ev => setActivity2(ev.target.value)}
                    className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Activity 2"
                    />
                </div>
                <div className="relative my-4 flex flex-row space-x-2">
                    <input 
                    value={activity3}
                    onChange={ev => setActivity3(ev.target.value)}
                    className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Activity 3"
                    />
                </div>
                <div className="relative my-4 flex flex-row space-x-2">
                    <input 
                    value={activity4}
                    onChange={ev => setActivity4(ev.target.value)}
                    className="placeholder-white block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" placeholder="Activity 4"
                    />
                </div>

                <button className="w-full mb-4 text-[18px] mt-4 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300"type="submit">Create activities</button>
                <div className="flex justify-center">
                    <span><Link className="hover:text-purple-100 hover:underline" to='/login'>Return to login</Link></span>
                </div>
            </form>
        </div>
    )
}