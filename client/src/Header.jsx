import {Link} from "react-router-dom";

export default function Header() {
    return(
        <div>
            <header className='p-4 flex justify-between bg-blue-500 text-white'>
                <h1>Aurora</h1>
                <Link to={'/login'} className='items-center px-4'>
                    <h1>Login</h1>
                </Link>
            </header>
        </div>
    );
}