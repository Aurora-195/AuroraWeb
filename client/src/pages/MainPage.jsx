
import React, { useEffect, useContext, useState } from "react";
import {useLocation} from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Timeline from '../charts/TimelineChart';
import Pie from '../charts/PieGraph';
import Line from '../charts/LineGraph';
import CreateActivitiesForm from '../widgets/createActivitesForm';
import AddLogForm from '../widgets/addLogForm';
import EditLogForm from '../widgets/editLogForm';
import axios from "axios";

export default function MainPage() {
    const location = useLocation();
    const userData = location.state?.user; // The array is double nested for some reason, so we need to have .user.user to get the pure data.
    
    // contains data of activities, use this to get JSON for adding and editing logs
    const [activities, setActivities] = useState(userData?.activities || []);

    const [openAct, setOpenAct] = useState(false);
    const [openLog, setOpenLog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [selectedAct, setSelectedAct] = useState('');


    syncActivities(userData.id).then(r => console.log("Received Activities from the database"));

    async function syncActivities(id) {
        const response = await axios.get(`https://auroratime.org/users/${id}`);
        console.log(response.data.user.activities.stringify());
        return response.data.user.activities;
    }

    // function for timeline chart where it needs to send the data of the bar that the user clicked on to mainpage for edit form
    const handleSelectedAct = (data) => {
        setSelectedAct(data);
    };

    const contentStyle = {
        background: 'transparent',
        border: '0',
        closeOnEscape: 'false',
    };

    // mainly for new accounts that require selecting 4 activities 
    useEffect(() => {
        setActivities(userData?.activities || []);
        handleCloseAct();
        //console.log("Activity Names: ", activityNames);
    }, [userData]);

    // if the activities change, auto close log (assuming user just submitted form for adding/editing/deleting log)
    useEffect(() => {
        setOpenAct(false);
        setOpenLog(false);
        setOpenEdit(false);

        console.log(userData);
        console.log(JSON.stringify(userData, null, 2));
    }, [activities]);

    // if selectedAct is not empty (meaning user clicked on a bar in timeline), then open edit form
    useEffect(() => {
        let mapLength = Object.keys(selectedAct).length;
        if(mapLength == 0)  {setOpenEdit(false);}
        else                {setOpenEdit(true);}
    }, [selectedAct]);

    // open activity creation form only if activities is empty
    const handleCloseAct = () => {
        if (activities == undefined) {return}

        // Prevent closing if the condition is not met
        if (activities.length === 0) {
            setOpenAct(true);
        }
    };

    const handleCloseLog = () => {
        setOpenLog(false);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
      };

    // use this function in classes that require updating activities map
    const updateActivities = (newActivities) => {
        setActivities(newActivities);
    };


    function getActivityNames(activities) {
        if (activities == undefined) {return;}

        if (activities.length === 0) {return;}

        const map = new Map();

        activities.forEach((activity) => {
            map.set(activity.name, true);
        });

        const arr = Array.from(map.keys())

        return arr;
    }

    return (
        <div className="mx-12 gap-x-5 pt-5 px-5 h-full">
            <Popup 
			open={openAct} 
			contentStyle={contentStyle} 
			closeOnDocumentClick={!openAct} 
			onClose={handleCloseAct}>
                <CreateActivitiesForm updateActivities={updateActivities} />
            </Popup>

            <Popup 
            open={openLog} 
            contentStyle={contentStyle}
            onClose={handleCloseLog}
            closeOnDocumentClick
            >
                <div id="parent" className="relative w-96">
                    <button className="z-10 font-bold text-sm text-purple-500 bg-white rounded-full w-10 h-10 absolute right-1 m-1 hover:bg-purple-500 hover:text-white transition-colors duration-300" onClick={handleCloseLog}>
                        X
                    </button>
                    <AddLogForm className="z-0" data={activities} activityNames={getActivityNames(userData?.activities)} updateActivities={updateActivities}/>
                </div>
            </Popup>

            <Popup 
            open={openEdit} 
            contentStyle={contentStyle}
            onClose={handleCloseEdit}
            closeOnDocumentClick
            >
                <div id="parent" className="relative w-96">
                    <button className="z-10 font-bold text-sm text-purple-500 bg-white rounded-full w-10 h-10 absolute right-1 m-1 hover:bg-purple-500 hover:text-white transition-colors duration-300" onClick={handleCloseEdit}>
                        X
                    </button>
                    <EditLogForm className="z-0" data={activities} activityNames={getActivityNames(userData?.activities)} 
                    selectedAct={selectedAct} updateActivities={updateActivities}
                    />
                </div>
            </Popup>

            <div className="grid grid-cols-3 gap-2">
                {/*
                <div className="items-center gap-x-7 flex flex-row my-4 w-4/12 text-sm font-bold text-gray-500">
                    <h1 className="hover:underline">Day</h1>
                    <h1 className="hover:underline">Week</h1>
                    <h1 className="hover:underline">Month</h1>

                    <div className="ml-1">
                        <div className="flex flex-row items-center gap-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            <h1 className="font-normal">MM/DD/YY</h1>
                        </div>
                    </div>
                </div>
                */}
                <div className="col-span-3 flex flex-col border-2 rounded-md h-fill">
                    <div className="px-4 pt-4">
                        <button className="w-24 text-[14px] rounded-full bg-emerald-400 font-semibold text-white hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300" onClick={() => setOpenLog(true)}>
                            Add log
                        </button>
                    </div>
                    <Timeline data={activities} handleSelectedAct={handleSelectedAct}/>
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="border-2 rounded-md shadow-lg h-[300px]">
                            <Pie data={activities}/>
                        </div>
                        <div className="col-span-2 border-2 rounded-md shadow-lg h-[300px] px-2">
                            <Line data={activities}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
