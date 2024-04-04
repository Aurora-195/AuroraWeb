import {Outlet} from "react-router-dom";
import {Link, useLocation} from "react-router-dom";
import React, { useEffect, useContext, useState } from 'react';

export default function Layout() {
    const [isExpanded, setExpanded] = useState(true)

    const location = useLocation();
    const userData = location.state?.user;
    const isLoggedIn = userData?.id;

    const email = userData?.login
    const name = email?.split("@")[0]

    return (
        <div className="h-screen">
            <header className="z-20 w-full sticky top-0 px-4 py-4 flex justify-between items-center bg-[#13092c]">
                <div className="flex flex-row space-x-4">
                    <button 
                    onClick={() => setExpanded((curr) => !curr)}
                    className="hover:bg-purple-500 rounded-full p-2 stroke-white stroke-2"
                    >
                        {isExpanded ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) }
                    </button>
                    <h1 className="text-4xl font-bold text-white">Aurora</h1>
                </div>
                {isLoggedIn ?
                    <h1 className="text-2xl font-bold text-white">Hello {name}!</h1>
                    :
                    <h1 className="text-2xl font-bold text-white"></h1>
                }
            </header>
            <div className="flex flex-row">
                <div className={`transition-all h-screen ${isExpanded ? "w-0" : "w-56"} flex flex-col bg-[#13092c] text-white font-bold`}>
                </div>
                <nav className={`z-30 -mt-[76px] fixed transition-all h-screen w-56 ${isExpanded ? "-left-56" : "left-0"} flex flex-col bg-[#13092c] text-white font-bold`}>
                    
                    <button 
                    onClick={() => setExpanded((curr) => !curr)}
                    className={`text-left hover:bg-purple-500 px-4 py-5`}>
                        <div className="flex flex-row space-x-2 items-center strokeWhite stroke-2">                                
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-7 h-7">
                                {isExpanded ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                )}
                            </svg>
                            <div className="font-bold text-3xl">Aurora</div>
                        </div>
                    </button>
                    
                    {
                        isLoggedIn
                        ?
                        <Link to={'/main'}>
                            <button className={`w-56 text-left hover:bg-purple-500 px-4 py-5`}>
                                <div className="flex flex-row space-x-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                    <div>Dashboard</div>
                                </div>
                            </button>
                        </Link>
                        :
                        null
                    }

                    
                    <Link to={'/'}>
                        <button className={`w-56 text-left hover:bg-purple-500 px-4 py-5`}>
                            <div className="flex flex-row space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <div>About</div>
                            </div>
                        </button>
                    </Link>

                    <Link to={'/login'}>
                        <button className={`w-56 text-left hover:bg-purple-500 px-4 py-5`}>
                            <div className="flex flex-row space-x-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {
                                    isLoggedIn ? 
                                    <div>Logout</div> 
                                    : 
                                    <div>Login / Register</div> 
                                }
                            </div>
                        </button>
                    </Link>
                </nav>
                <div className="z-10 flex-1"> <Outlet /> </div>
            </div>
        </div>
    );
}