import {Link, useActionData, useNavigate, useLocation} from "react-router-dom";
import { useContext, useState } from "react";
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

export default function editLogForm() {
    const [activity, setActivity] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const [selected, setSelected] = useState(new Date());

    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, 'PP')}.</p>;
    }

    async function handleAddLog(ev) {
        ev.preventDefault();

        try {
          
        } catch (error) {

        }
    }
    
    return (
        <div className="mt-5 flex flex-col content-center w-full h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative text-white">
            <h1>Previous Activity</h1>
            <form onSubmit={handleAddLog} className="">
                <input value={activity}
                    onChange={(ev) => setActivity(ev.target.value)}
                    className="placeholder-gray block w-72 text-2xl font-bold text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer" 
                    placeholder="New Activity">
                </input>
                <div className="flex justify-center items-center flex-col">
                  <div className="py-2">
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
                <button className="w-8/12 mb-4 text-[18px] mt-5 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-1 transition-colors duration-300"type="submit">Edit log</button>
              </div>
            </form>
        </div>
    )
}