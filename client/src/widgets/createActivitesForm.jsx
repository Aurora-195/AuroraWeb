
import {Link, useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ColorPicker from './colorPicker';


// returns activity input widget that uses change functions from createActivitesForm() to update const variables (activity name and color)
function ActivityInput({ activity, color, onActivityChange, onColorChange, setOpenAct}) {  
    return (
      <div className="relative my-6 flex flex-row space-x-4">
        <input
          value={activity}
          onChange={(ev) => onActivityChange(ev.target.value)}
          style={{ color: `rgb(${color.r},${color.g},${color.b})` }}
          className="placeholder-gray block w-72 py-2.3 px-0 text-sm font-bold text-white bg-transparent border-0 border-b-2 border-grey-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
          placeholder="Activity"
        />
        <ColorPicker color={color} onColorChange={(color) => onColorChange(color)} />
      </div>
    );
}

  
export default function createActivitesForm({ updateActivities }) {
    
    const location = useLocation();
    const userData = location.state?.user;
    const userId = userData?.id;


    // grab username
    const email = userData?.login
    const name = email?.split("@")[0]

    // create preset array of maps for 4 activities
    const [activities, setActivities] = useState([
        { name: '', color: { r: 255, g: 255, b: 255, a: 1 } },
        { name: '', color: { r: 255, g: 255, b: 255, a: 1 } },
        { name: '', color: { r: 255, g: 255, b: 255, a: 1 } },
        { name: '', color: { r: 255, g: 255, b: 255, a: 1 } },
    ]);

    // grab current array of activities and update following activity name of the index[int] with new name
    const handleActivityChange = (index, newName) => {
      //console.log("Input: ", newName)
      setActivities((prevActivities) =>
        prevActivities.map((activity, i) =>
          i === index ? { ...activity, name: newName } : activity
        )
      );
    };
    
    // grab current array of activities and update following activity color of the index[int] with new color
    const handleColorChange = (index, newColor) => {
      //console.log(Index, ": ", `rgb(${newColor.rgb})`)
      setActivities((prevActivities) =>
        prevActivities.map((activity, i) =>
          i === index ? { ...activity, color: newColor.rgb } : activity
        )
      );
    };
    

    // Create activities and go to dashboard page
    async function handleActivityCreation(ev) {
        
        ev.preventDefault(); 
        console.log(activities);

        try {
            const response = await axios.post(`https://auroratime.org/users/${userId}/createActivities`, {
                activities: activities.map(({ name, color }) => ({ name, color })),
            });

            //console.log(response.data);

            // if success, call method from MainPage.jsx to update activities and close the popup
            if (response.status === 201) {
              updateActivities(response.data.activities);
            }

            setOpenAct(false);
        } catch (error) {
            console.error("Error creating activities for the user:", error.response ? error.response.data : error.message);
            alert("Error creating activities for the user.");
        }
    }

    return (
        <div className="flex-col w-96 h-fit bg-slate-800 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 relative text-white flex justify-center">
            <h1 className="text-4xl font-semibold text-center mb-2">Hi {name}!</h1>
            <h3 className="font-semibold text-center mb-6">Input 4 activities that you want to track!</h3>
            <form onSubmit={handleActivityCreation}>
              {/* Create n activity input fields where n is the length of activities array */}
              {activities.map((activity, index) => (
                  <ActivityInput
                      key={index}
                      activity={activity.name}
                      color={activity.color}
                      onActivityChange={(newName) => handleActivityChange(index, newName)}
                      onColorChange={(newColor) => handleColorChange(index, newColor)}
                  />
              ))}

              <button className="w-full mb-4 text-[18px] mt-4 rounded-full bg-white text-purple-500 hover:bg-purple-500 hover:text-white py-2 transition-colors duration-300"type="submit">Create activities</button>
              <div className="flex justify-center">
                  <span><Link className="hover:text-purple-100 hover:underline" to='/login'>Return to login</Link></span>
              </div>
            </form>
        </div>
    )
}
