import Bar from '../charts/BarGraph';
import Pie from '../charts/PieGraph';
import Line from '../charts/LineGraph';
import {useLocation} from "react-router-dom";

export default function MainPage() {
    const location = useLocation();
    const userData = location.state?.user.user; // The array is double nested for some reason, so we need to have .user.user to get the pure data.
    console.log(userData);
    console.log(JSON.stringify(userData, null, 2));


    const filler = userData?.login +" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolordolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    return (
        <div className="flex flex-row mx-12 gap-x-5 pt-5 px-5">
            <div className="flex-initial w-8/12">
                <div className="flex-1 h-full">
                    <div className="items-center gap-x-7 flex flex-row my-4 w-4/12 text-sm font-bold text-gray-500">
                        <h1 className="flex-1 hover:underline">Day</h1>
                        <h1 className="flex-1 hover:underline">Week</h1>
                        <h1 className="flex-1 hover:underline">Month</h1>
                        <div className="ml-1 flex-1">
                            <div className="flex flex-row items-center gap-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                <h1 className="font-normal">MM/DD/YY</h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex-initial border-2 rounded-md shadow-lg h-[300px]">
                            <Bar/>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-row gap-x-2">
                                <div className="flex-initial border-2 rounded-md shadow-lg w-4/12 h-[300px]">
                                    <Pie/>
                                </div>
                                <div className="flex-initial border-2 rounded-md shadow-lg w-8/12 h-[300px]">
                                    <Line/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full text-white items-center justify-center">
                <div className="ml-4 mt-[3.3em] w-full h-[600px] p-6 overflow-y-auto rounded-lg bg-gradient-to-br from-purple-600 to-emerald-700">
                    <h2 className="text-xl font-bold">Analysis</h2>
                    <div className="text-sm mt-2">
                        {filler}
                    </div>
                    <h2 className="text-xl font-bold mt-4">Suggestions</h2>
                    <div className="text-sm mt-2">
                        {filler}
                    </div>
                </div>
            </div>
        </div>
    );
}