import {Link, useActionData, useNavigate, useLocation} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
  
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

export default function editLogForm({data, activityNames, selectedAct, updateActivities}) {
    const location = useLocation();
    const userData = location.state?.user;
    const userId = userData?.id;
  
    const [activity, setActivity] = useState(selectedAct['name']);
    const [startTime, setStartTime] = useState(formatTimeFromMillisec(selectedAct['startTime']));
    const [endTime, setEndTime] = useState(formatTimeFromMillisec(selectedAct['endTime']));
    const [selected, setSelected] = useState(fixDate(selectedAct['date']));

    const [activities, setActivities] = useState(data);
    const [isButton, setIsButton] = useState(false);

    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p className="text-[#09eb81]">You picked {format(selected, 'PP')}.</p>;
    }

    function fixDate(dateStr) {
      var parts = dateStr.split('-');

      var date = new Date(parts[0], parts[1] - 1, parts[2]);
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate());
      return date;
    }

    // Want this
    //"name": meditation
    //"startTime": "2023-10-02T07:00:00Z",
    //"endTime": "2023-10-02T07:30:00Z",
    //"status": "completed"

    useEffect(() => {
      if(isChanged()) {
        setIsButton(true);
      }
      else
      {
        setIsButton(false);
      }
    }, [activity, startTime, endTime, selected]);

    useEffect(() => {
      setActivities(data);
    }, [data]);

    function isChanged() {
      if(selected == null){
        return false;
      }

      if(activity.localeCompare(selectedAct['name']) != 0) {
        return true;
      }

      // from HH:MM:SS to HH:MM
      if(startTime.length == 5 || endTime.length == 5) {
        return true;
      }

      if(JSON.stringify(selected).localeCompare(JSON.stringify(fixDate(selectedAct['date']))) != 0) {
        return true;
      }

      return false;
    }

    // ---------------------------------------------------------------
    // -----------  format data from timeline's data [OLD] -----------
    // ---------------------------------------------------------------
    function getFormattedOldLog(dateStr, startMillisec, endMillisec) {
      // Timeline format: 
      // YYYY-MM-DD (subset of ISO8601)
      // 50400000 (millisec)

      const log = {
        startTime:  getISO8601DateFromChart(dateStr, startMillisec),
        endTime:    getISO8601DateFromChart(dateStr, endMillisec),
        status:     "completed",
      };

      return log;
    }

    // get YYYY-MM-DDTHH:MM:SSZ from timeline's data format
    function getISO8601DateFromChart(dateStr, millisec) {
      let str = `${dateStr}T${formatTimeFromMillisec(millisec)}Z`;

      return str;
    }

    // get 00:00:00 from conversion of milliseconds
    function formatTimeFromMillisec(millisec) {
      let totalSec = millisec/1000;

      let hr = Math.floor(totalSec/3600)

      totalSec %= 3600;
      let min = Math.floor(totalSec/60);
      let sec = Math.floor(totalSec % 60);

      let formattedTime = `${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

      return formattedTime;
    }

    // -------------------------------------------------------
    // ----------- format data from form's data [NEW] --------
    // -------------------------------------------------------
    // Data that needs formatting: 
    //          Tue Feb 27 2024 00:00:00 GMT-0800 (Pacific Standard Time)   ||  06:43  ||  20:45
    function getFormattedNewLog(date, startTime, endTime) {
      const year = date.getFullYear(); 
      const month = String(date.getMonth() + 1).padStart(2, '0'); ;
      const day = String(date.getDate()).padStart(2, '0'); ; 

      const dateStr = `${year}-${month}-${day}`;

      const log = {
        startTime:  getISO8601DateFromForm(dateStr, startTime),
        endTime:    getISO8601DateFromForm(dateStr, endTime),
        status:     "completed",
      };

      return log;
    }

    // get YYYY-MM-DDTHH:MM:SSZ from form's data format
    function getISO8601DateFromForm(dateStr, timeStr) {
      const time = timeStr.split(':');
      const hours = time[0].padStart(2, '0'); 
      const minutes = time[1].padStart(2, '0');
      const seconds = '00'; 

      const str = `${dateStr}T${hours}:${minutes}:${seconds}Z`;

      return str;
    }

    /*
    console.log(selectedAct['name']);
    console.log(getFormattedOldLog(selectedAct['date'], selectedAct['startTime'], selectedAct['endTime']));
    console.log(activity);
    console.log(getFormattedNewLog(selected, startTime, endTime));
    */

    // --------------------------
    // -------- EDIT LOG --------
    // --------------------------
    async function handleEditLog(ev) {
      // ev.preventDefault() is required to prevent site from breaking when submitting form, always use for buttons in forms
      ev.preventDefault();
      
      // delete old log and add new log
      const oldAct = selectedAct['name'];
      const oldLog = getFormattedOldLog(selectedAct['date'], selectedAct['startTime'], selectedAct['endTime']);

      const newAct = activity;
      const newLog = getFormattedNewLog(selected, startTime, endTime);

      deleteLog(oldAct, oldLog);

      // if edit button is available, then add new log
      if(isButton) {addLog(newAct, newLog);}
    }

    // ----------------------------
    // ------ DELETE/ADD LOG ------
    // ----------------------------
    function deleteLog(actName, log) {
      const startTime = log.startTime;
      const endTime = log.endTime;

      try {
        console.log('Delete log');

        // find activity name, look for instance using attributes of log
        let indexAct = 0;
        activities.forEach((activity) => {
          if (activity.name === actName) {
            const updatedActivities = [...activities];
            let indexInst = 0;

            // instance: startTime, endTime, status
            updatedActivities[indexAct].instances.forEach((instance) => {
              if (instance.startTime.localeCompare(startTime) == 0 && instance.endTime.localeCompare(endTime) == 0) {
                console.log(updatedActivities[indexAct].instances[indexInst]);
                // remove element from instance and update activities
                updatedActivities[indexAct].instances.splice(indexInst, 1);
                updateActivities(updatedActivities);

                console.log("Found it! Deleting log.");
                return;
              }
              indexInst = indexInst + 1;
            });
          }
          else
          {
            indexAct = indexAct + 1;
          }
        });
      }
      catch(error){
        console.error("Error adding log for the user:", error.response ? error.response.data : error.message);
      }
    }

    function addLog(newName, newLog) {
      let indexAct = 0;
      activities.forEach((activity) => {
        if (activity.name === newName) {
          const updatedActivities = [...activities];
          updatedActivities[indexAct].instances.push(newLog);
          updateActivities(updatedActivities);

          console.log("Added log!");
          return;
        }
        else
        {
          indexAct = indexAct + 1;
        }
      });
    }
    
    return (
        <div className="mt-5 flex flex-col content-center w-full h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative text-white">
            <h1>Previous Activity</h1>
            <form onSubmit={handleEditLog} className="">
                <select 
                onChange={(ev) => setActivity(ev.target.value)}
                className="placeholder-gray block w-72 text-2xl font-bold text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                defaultValue={activity}>
                  <option value={activityNames[0]}>  {activityNames[0]}</option>
                  <option value={activityNames[1]}>  {activityNames[1]}</option>
                  <option value={activityNames[2]}>  {activityNames[2]}</option>
                  <option value={activityNames[3]}>  {activityNames[3]}</option>
                </select>
                <div className="flex justify-center items-center flex-col">
                  <div className="py-2">
                      <style>{css}</style>
                      <DayPicker
                          defaultMonth={selected}
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
                  <button className="w-8/12 text-[18px] mb-2 mt-5 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-1 transition-colors duration-300"type='submit'>Edit log</button>
                  :
                  <button disabled className="w-8/12 text-[18px] mb-2 mt-5 rounded-full bg-[#939393] text-white py-1"type='submit'>Edit log</button>
                  }
              </div>
              <div className="flex justify-end">
              {
                  !isButton
                  ?
                  <button className="px-4  text-[18px] rounded-full bg-white text-purple-500 hover:bg-red-500 hover:text-white py-1 transition-colors duration-300"type='submit'>Delete log</button>
                  :
                  <button disabled className="px-4  text-[18px] rounded-full bg-[#939393] text-white py-1"type='submit'>Delete log</button>
              }
              </div>
            </form>
        </div>
    )
}