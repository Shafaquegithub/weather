import react, {useEffect, useState} from "react";
import { WiCloudy, WiSunrise,WiSunset, WiHumidity, WiStrongWind, WiDust, WiDayCloudyHigh, WiRain, WiCloud } from "react-icons/wi";
import HumidityDiv from './HumidityDiv';
import './MainComponent.css';


let Mian =()=>{

let date= new Date().toLocaleString()

let [enteredCity, setEnteredCity]=useState("Jamshedpur");
let [finalData, setFinalData]=useState({});
let [mainIcon, setMainIcon]=useState(<WiCloudy/>)

let getWeatherData= async ()=>{
    try{
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&units=metric&appid=09b5f74ce2ce92cac40acda2f90da99a`
        let res = await fetch(url);
        let data = await res.json()

        let {temp, humidity}=data.main
        let {name}=data
        let {speed}=data.wind
        let {country, sunrise, sunset}=data.sys
        let {main:weathermood}=data.weather[0]

        let sunrise1 = new Date(new Date(sunrise * 1000)).toUTCString()
        let finalSunrise = `${new Date(sunrise1).getHours()} : ${new Date(sunrise1).getMinutes()}`;
        let sunset1 = new Date(new Date(sunset * 1000)).toUTCString();
        let finalSunset = `${new Date(sunset1).getHours()} : ${new Date(sunset1).getMinutes()}`

        
        setFinalData({temp, humidity, name, speed, country, finalSunrise, finalSunset, weathermood})
         
        if(weathermood == "Mist"){
            setMainIcon(<WiDust/>)
        }else if(weathermood == "Clouds"){
            setMainIcon(<WiDayCloudyHigh/>)
        }else if(weathermood == "Rain"){
            setMainIcon(<WiRain/>)
        }else if(weathermood == "Clear"){
            setMainIcon(<WiCloud/>)
        }
    }
    catch(error){
        console.log(error)
    }
}

let submitHandler=()=>{
    getWeatherData()
}

useEffect(()=>{
    submitHandler()
}, [])


    return(
        <>
            <div className="body">
            <div className="main-div">
                <div className="input-div">
                    <input type="search" placeholder="Enter City" onChange={(e)=>setEnteredCity(e.target.value)} />
                    <button type="button" onClick={submitHandler} >Search</button>
                </div>
                <div className="main-icon-div">
                    {mainIcon}
                </div>
                <div className="temp-date-div">
                    <div className="temp-div">
                        <h1>{finalData.temp}<sup>o</sup>C</h1>
                        <p>{finalData.weathermood} <br/><span>{finalData.name}, {finalData.country}</span></p>
                    </div>
                    <div className="date-div">
                            <h1>{date}</h1>
                    </div>
                </div>
                <div className="last-div">
                    <HumidityDiv icon={<WiSunrise/>} value={finalData.finalSunrise} text={"Sunrise"} />
                    <HumidityDiv icon={<WiSunset/>} value={finalData.finalSunset} text={"Sunset"} />
                    <HumidityDiv icon={<WiHumidity/>} value={finalData.humidity} text={"Humidity"} />
                    <HumidityDiv icon={<WiStrongWind/>} value={finalData.speed} text={"Speed"} />
                </div>
            </div>
            </div>
            
        </>
    )
}

export default Mian;