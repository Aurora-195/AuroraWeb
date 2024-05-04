
import React, { useEffect, useContext, useState } from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import Timeline from '../charts/TimelineChart';
import Pie from '../charts/PieGraph';
import Line from '../charts/LineGraph';
import CreateActivitiesForm from '../widgets/createActivitesForm';
import AddLogForm from '../widgets/addLogForm';
import EditLogForm from '../widgets/editLogForm';
import axios from "axios";
import { useAuth } from "../useAuth";

export default function MainPage() {
    const { user } = useAuth();

    // contains data of activities, use this to get JSON for adding and editing logs
    // array type so use .length to check its length
    const [activities, setActivities] = useState(axios.get(`https://auroratime.org/users/${user.userId}`).data);
    //const [activityNames, setActivityNames] = useState(activities ? getActivityNames(activities) : ['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4' ]);
    const [activityNames, setActivityNames] = useState(getActivityNames(activities));

    //const [activities, setActivities] = useState([]);

    const [openAct, setOpenAct] = useState(false);
    const [openLog, setOpenLog] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const [selectedAct, setSelectedAct] = useState('');

    async function syncActivities(id) {
        const response = await axios.get(`https://auroratime.org/users/${id}`);
        setActivities(response.data);
        setActivityNames(getActivityNames(response.data));
        console.log(JSON.stringify(activities, null, 2));
        console.log(activityNames);
        return response.data;
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
        syncActivities(user.userId).then(
            r => {
                console.log("Received latest activity data from the database")
            }).catch(error => {
                console.error('Error fetching activities:', error);
        });
    }, [user]);

    useEffect(() => {
        handleCloseAct();
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

        //console.log("ACTIVITIES");
        //console.log(activities.length);

        // Prevent closing if the condition is not met
        if (activities.length === 0) {
            setOpenAct(true);
        }
        else {
            setOpenAct(false);
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
        console.log("Updated activities on client side.");
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

        //console.log(arr);

        return arr;
    }

    return (
        <div className="mx-12 gap-x-5 pt-5 px-5 h-full">
            <Popup 
			open={openAct} 
			contentStyle={contentStyle} 
			closeOnDocumentClick={!openAct} 
			onClose={handleCloseAct}>
                <CreateActivitiesForm updateActivities={updateActivities} setOpenAct={setOpenAct}/>
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
                    <AddLogForm className="z-0" data={activities} activityNames={activityNames} updateActivities={updateActivities} setOpenLog={setOpenLog}/>
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
                    <EditLogForm className="z-0" data={activities} activityNames={activityNames} 
                    selectedAct={selectedAct} updateActivities={updateActivities} setOpenEdit={setOpenEdit}
                    />
                </div>
            </Popup>

            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-3 flex flex-col border-2 rounded-md h-[450px] p-2">
                    <div className="px-4 pt-4">
                        {
                            activityNames
                            ?
                            <button className="w-24 text-[14px] rounded-full bg-emerald-400 font-semibold text-white hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300" onClick={() => setOpenLog(true)}>Add log</button>
                            :
                            <button disabled className="w-24 text-[14px] rounded-full bg-[#939393] font-semibold text-white py-2" onClick={() => setOpenLog(true)}>Add log</button>
                        }
                    </div>
                    <div>
                        <Timeline data={activities} handleSelectedAct={handleSelectedAct}/>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-4 gap-2">
                        <div className="border-2 rounded-md shadow-lg h-[450px] p-2">
                            <Pie data={activities}/>
                        </div>
                        <div className="col-span-3 border-2 rounded-md shadow-lg h-[450px] p-2">
                        <Line data={activities}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
