import mobilePic from "../assets/mobilePic.png"
import mobilePic1 from "../assets/mobilePic1.png"
import webPic from "../assets/webPic.png"
import webPic1 from "../assets/webPic1.png"
import auroraBg from "../assets/freepikAurora2.jpg"

export default function IndexPage() {
    const timeDescription = "Time, an invaluable and finite resource, once spent, can never be reclaimed. With the deluge of distractions, time management becomes an indispensable skill. It's not just about maximizing productivity - it's about being able to build and maintain balance in life. Recognizing where one's hours go—whether it's work, leisure, or inadvertent scrolling—is pivotal. Only by understanding our current habits can we carve out moments for what truly matters and judiciously utilize every ticking second."
    
    const appDescription = "Aurora makes auditing time quick and easy with a friendly user interface, plenty of data collection options, and the incorporation of voice assistants for more effortless data recording. With Aurora, users will have a full look at how they spend their time in their day-to-day lives and be given a complete analysis of their data to help them see, understand, and manage their time more productively."

    return (
      <div className="bg-gradient-to-br from-[#1B1927] to-[#102C1D]">
        <header className="flex items-center justify-center bg-fixed bg-parallax bg-cover h-screen">
          <div className="flex flex-col font-extrabold text-white h-96 -mt-10">
            <h1 className="text-8xl">Aurora</h1>
            <h1 className="text-4xl">a time management ecosystem</h1>
          </div>
        </header>
        <div className="flex items-center justify-center mt-12">
          <img src={webPic1} className="absolute w-[800px]"></img>
        </div>
        <div className="text-white px-20 py-32 mt-36 flex flex-row space-x-40">
          <div className="flex-1 w-8/12">
            <h1 className="text-4xl font-semibold mb-5">Track your time with the help of a virtual assistant.</h1>
            <p>{appDescription}</p>
          </div>
          <div className="flex w-72 h-72">
            <img src={mobilePic1} className="object-cover object-[50%] rounded-full drop-shadow-[0_25px_25px_rgba(0,255,0,0.25)]"></img>
          </div>
        </div>

        <div className="text-white px-20 py-32 flex flex-row space-x-40 bg-gradient-to-br from-[#1B1B27] to-[#453653]">
          <div className="w-128">
            <h1 className="flex-initial text-4xl font-semibold mb-5">See your data in real time.</h1>
            <p>{appDescription}</p>
          </div>
          <div className="justify-end">
          <img src={webPic} className="object-cover object-[50%] drop-shadow-[0_25px_25px_rgba(0,255,255,0.25)]"></img>
          </div>
        </div>
      </div>
    );
}