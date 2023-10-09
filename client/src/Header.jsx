import {Link} from "react-router-dom";

export default function Header() {
    return(
        <div>
            <header className='p-4 flex items-center justify-between text-white bg-gradient-to-r from-purple-600 to-emerald-300'>
                <div className="flex flex-row items-center gap-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <h1 className="text-3xl font-bold">Aurora</h1>
                </div>
                <Link to={'/login'} className='items-center px-4'>
                    <h1 className="text-xl font-bold text-black">Login/Signup</h1>
                </Link>
            </header>
        </div>
    );
}