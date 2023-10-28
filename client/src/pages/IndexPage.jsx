import mobilePic from "../assets/mobilePic.png"
import webPic from "../assets/webPic.png"

export default function IndexPage() {
    const timeDescription = "Time, an invaluable and finite resource, once spent, can never be reclaimed. With the deluge of distractions, time management becomes an indispensable skill. It's not just about maximizing productivity - it's about being able to build and maintain balance in life. Recognizing where one's hours go—whether it's work, leisure, or inadvertent scrolling—is pivotal. Only by understanding our current habits can we carve out moments for what truly matters and judiciously utilize every ticking second."
    
    const appDescription = "Aurora makes auditing time quick and easy with a friendly user interface, plenty of data collection options, and the incorporation of voice assistants for more effortless data recording. With Aurora, users will have a full look at how they spend their time in their day-to-day lives and be given a complete analysis of their data to help them see, understand, and manage their time more productively."

    return (
      <div className="flex flex-col space-y-10 h-full px-20 pt-12 text-white bg-gradient-to-r from-purple-600 to-emerald-300">
        <h1 className="text-6xl font-bold">
          About Aurora
        </h1>
        <div className="flex flex-row space-x-16">
          <div className="flex flex-col space-y-10 w-[500px]">
            <div>{timeDescription}</div>
            <div>{appDescription}</div>
          </div>
          <div className="flex flex-col items-center space-y-10 -mt-20">
            <div className="flex-1 w-96">
              <img src={webPic}></img>
            </div>
            <div className="w-32">
              <img src={mobilePic}></img>
            </div>
          </div>
        </div>
      </div>
    );
}