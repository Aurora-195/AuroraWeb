import {Link, useActionData, useNavigate, useLocation} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useAuth } from "../useAuth";

const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid;
    color: #09eb81;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: grey;
    color: grey;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: #09eb81;
  }
  
  .rdp-button_reset:focus-visible {
    /* Make sure to reset outline only when :focus-visible is supported */
    outline: none;
  }
  .rdp-button {
    border: 2px solid transparent;
  }
  .rdp-button[disabled]:not(.rdp-day_selected) {
    opacity: 0.25;
  }
  .rdp-button:not([disabled]) {
    cursor: pointer;
  }
  .rdp-button:focus-visible:not([disabled]) {
    color: black;
    background-color: black;
    border: 1px solid;
  }
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #09eb81;
    color: white;
    border-color: white;
  }
`;

export default function addLogForm({data, activityNames, updateActivities, setOpenLog}) {
    // Stuff for userId for the POST request
    const { user } = useAuth();
    //

    const [activityName, setActivityName] = useState(activityNames ? activityNames[0] : 'Activity Name');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [selected, setSelected] = useState(new Date());

    const [activities, setActivities] = useState(data);

    const [isButton, setIsButton] = useState(false);

    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p className="text-[#09eb81]">You picked {format(selected, 'PP')}.</p>;
    }

    useEffect(() => {
      if(activityName == null || startTime === '' || endTime ==='' || selected == null) {
        setIsButton(false);
      }
      else
      {
        setIsButton(true);
      }
    }, [activityName, startTime, endTime, selected]);

    useEffect(() => {
      setActivities(data);
    }, [data]);

    // -----------------------------
    // ------ DATA FORMATTING ------
    // -----------------------------
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear(); 
      const month = String(date.getMonth() + 1).padStart(2, '0'); ;
      const day = String(date.getDate()).padStart(2, '0'); ; 

      const str = `${year}-${month}-${day}`;
      return str;
    }

    function formatDateTime(dateStr, timeStr) {
      const time = timeStr.split(':');
      const hours = time[0].padStart(2, '0'); 
      const minutes = time[1].padStart(2, '0');
      const seconds = '00'; 

      return `${dateStr}T${hours}:${minutes}:${seconds}Z`;
    }

    // -----------------------------
    // ---- CHECK OVERLAP LOGS -----
    // -----------------------------
    function checkLogOverlap(newLog) {
      for (const activity of activities) {
        for (const instance of activity.instances) {
          const existingStartTime = new Date(instance.startTime).getTime();
          const existingEndTime = new Date(instance.endTime).getTime();
          const newStartTime = new Date(newLog.startTime).getTime();
          const newEndTime = new Date(newLog.endTime).getTime();
    
          if ((newStartTime >= existingStartTime && newStartTime < existingEndTime) || 
              (newEndTime > existingStartTime && newEndTime <= existingEndTime) ||
              (newStartTime <= existingStartTime && newEndTime >= existingEndTime)) {
            return true;
          }
        }
      }
      return false;
    }

    // ---------------------
    // ------ ADD LOG ------
    // ---------------------
    // insert new instance inside activity data
    async function handleAddLog(ev) {
        ev.preventDefault();
        
        //console.log("Data: ", activtitiesJson);
        //console.log("New log: ", activity," || ", selected, "  || ", startTime, " || ", endTime);

        // data from form submission: 
        //           procrastination  ||  Tue Feb 27 2024 00:00:00 GMT-0800 (Pacific Standard Time)   ||  06:43  ||  20:45
        // format needs to be this to add to activities data: "2023-10-05T16:00:00Z" (startTime and endTime), completed
        const dateFormatted       = formatDate(selected);
        const startTimeFormatted  = formatDateTime(dateFormatted, startTime);
        const endTimeFormatted    = formatDateTime(dateFormatted, endTime);

        console.log(`New log: ${activityName} || ${startTimeFormatted} || ${endTimeFormatted}`);

        const newLog = {
          startTime: startTimeFormatted,
          endTime: endTimeFormatted,
          status: "completed",
        }

        // check for overlap logs
        const isOverlapping = checkLogOverlap(newLog);
        if (isOverlapping) {
          alert("Error: The new log overlaps with an exisitng log.");
        }
        else {
          // try to find activity's instance map through activity name and add new instance/log there
          try {
            let index = 0;
            activities.forEach((activity) => {
              if (activity.name === activityName) {
                const updatedActivities = [...activities];
                updatedActivities[index].instances.push(newLog);
                updateActivities(updatedActivities);
              }
              else
              {
                index = index + 1;
              }
            });

            console.log(`Sending log for activity: ${newLog} with data:`, newLog);

            const response = await axios.post(`https://auroratime.org/users/${user.userId}`, {
                activityInstance: newLog,
                name: activityName,
            });
            

            console.log(`New JSON: ${JSON.stringify(activities, null, 2)}`);

            setOpenLog(false);
        } catch (error) {
            console.error("Error adding log for the user:", error.response ? error.response.data : error.message);
            alert("Error adding log for the user.");
        }
      }
    }
    
    return (
        <div className="flex flex-col content-center w-full h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative text-white">
            <form onSubmit={handleAddLog} className="">
                {
                <select 
                value={activityName} 
                onChange={(ev) => setActivityName(ev.target.value)}
                className="placeholder-gray block w-72 text-2xl font-bold text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                  <option className="text-black" value={activityNames[0]}>  {activityNames[0]}</option>
                  <option className="text-black" value={activityNames[1]}>  {activityNames[1]}</option>
                  <option className="text-black" value={activityNames[2]}>  {activityNames[2]}</option>
                  <option className="text-black" value={activityNames[3]}>  {activityNames[3]}</option>
                </select>
                }
                <div className="flex justify-center items-center flex-col">
                  <div className="py-5">
                      <style>{css}</style>
                      <DayPicker
                          mode="single"
                          selected={selected}
                          onSelect={setSelected}
                          footer={footer}
                          styles={{
                              caption: { color: '#09eb81' },
                              head: { color: '#09eb81' },
                          }}
                          modifiersClassNames={{
                              selected: 'my-selected',
                              today: 'my-today',
                          }}
                      />
                  </div>
                  <div className="flex flex-row text-sm font-bold text-white space-x-2">
                      <input value={startTime}
                          type="time"
                          onChange={(ev) => setStartTime(ev.target.value)}
                          className="text-center placeholder-gray w-28 block py-2.3 bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                          >
                      </input>
                      <div>to</div>
                      <input value={endTime}
                          type="time"
                          onChange={(ev) => setEndTime(ev.target.value)}
                          className="text-center placeholder-gray w-28 block py-2.3 bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                          >
                      </input>
                  </div>
                </div>

              <div className="flex justify-end">
                {
                  isButton
                  ?
                  <button className="w-8/12 mb-4 text-[18px] mt-5 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-1 transition-colors duration-300"type="submit">Add log</button>
                  :
                  <button disabled className="w-8/12 mb-4 text-[18px] mt-5 rounded-full bg-[#939393] text-white py-1"type="submit">Add log</button>
                }
              </div>
            </form>
        </div>
    )
}