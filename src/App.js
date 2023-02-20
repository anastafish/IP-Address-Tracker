import './App.css';
import { MapContainer, TileLayer,useMap, Popup} from 'react-leaflet'
import { MarkerLayer, Marker } from "react-leaflet-marker";

import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react';
import arrow from './ip-address-tracker-master/images/icon-arrow.svg'
import location from './ip-address-tracker-master/images/icon-location.svg'



function App() { 

  const [ip, setIp] = useState('')

  function handleInput(e){
    setIp(e.target.value)
  }

  const RecenterAutomatically = ({lat,lng}) => {
    const map = useMap();
     useEffect(() => {
       map.setView([lat, lng]);
     }, [...position]);
     return null;
   }

  const [position, setPosition] = useState([0,0])
  const [info, setInfo] = useState({
    "ip": "8.8.8.8",
    "network": "8.8.8.0/24",
    "version": "IPv4",
    "city": "Mountain View",
    "region": "California",
    "region_code": "CA",
    "country": "US",
    "country_name": "United States",
    "country_code": "US",
    "country_code_iso3": "USA",
    "country_capital": "Washington",
    "country_tld": ".us",
    "continent_code": "NA",
    "in_eu": false,
    "postal": "94043",
    "latitude": 37.42301,
    "longitude": -122.083352,
    "timezone": "America/Los_Angeles",
    "utc_offset": "-0800",
    "country_calling_code": "+1",
    "currency": "USD",
    "currency_name": "Dollar",
    "languages": "en-US,es-US,haw,fr",
    "country_area": 9629091.0,
    "country_population": 327167434,
    "asn": "AS15169",
    "org": "GOOGLE"
})
  async function locateMe(){
    const data = await fetch('https://ipapi.co/json/')
    const json = await data.json()
    setPosition([json.latitude, json.longitude])
    setInfo(json)
  }

  async function locate(){    
    const data = await fetch(`https://ipapi.co/${ip}/json/`)
    const json = await data.json()
    if (json.error){    
     alert("Enter A Valid IP Address")
    }
    else{
    setPosition([json.latitude, json.longitude])
    setInfo(json)
    }
    }

  useEffect(() => {
    locateMe()
  },[])

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className='flex flex-col items-center justify-between
       bg-hero p-5 h-[50%] gap-4 relative'>
        <h1 className='font-rubik font-semibold text-white text-[35px]'>IP Address Tracker</h1>
        <div className='flex flex-row sm:w-[40%] w-[90%] items-center'>
          <input type="text"
           placeholder='Search for any IP address or domain'
           className='p-3 rounded-lg rounded-r-none w-full h-full'
           onChange={handleInput}
           onKeyDown={(e) => {if (e.key === 'Enter') locate()}}
           />
           <div 
           className='bg-black h-full w-[10%] flex items-center justify-center
            cursor-pointer rounded-l-none rounded-md hover:bg-green-400'     
           onClick={() => locate()}      
           >
            <img src={arrow} alt="" className='h-[30%] w-[30%]'/>
            </div>
        </div>
        <button
        className='h-full bg-gray text-white rounded-lg p-3 hover:bg-green-400'
        onClick={() => locateMe()}
        >Find My Ip</button>


        <div className='w-[80%] flex sm:flex-row flex-col items-center sm:justify-evenly
        justify-between bg-white p-5 rounded-md z-[9]'>
          <div className='flex flex-col items-center justify-center gap-1'>
        <p className='font-rubik font-thin text-[13px] sm:self-start self-center text-dark_gray'>IP ADDRESS</p>
            <h1 className='font-rubik font-medium sm:text-[25px]
             text-[15px] md:text-[17px] max-w-[300px]'>{info.ip}</h1>
          </div>
          <div className='flex flex-col items-center justify-center'>
             <p className='font-rubik font-thin text-[13px] sm:self-start self-center text-dark_gray'>LOCATION</p> 
             <h1 className='font-rubik font-medium sm:text-[25px] 
             text-[15px] md:text-[17px] max-w-[200px]'>{info.country}, {info.city}</h1>
          </div>

          <div className='flex flex-col items-center justify-center'>
              <p className='font-rubik font-thin text-[13px] sm:self-start self-center text-dark_gray'>TIME ZONE</p>
              <h1 className='font-rubik font-medium sm:text-[25px] 
              text-[15px] md:text-[17px] max-w-[200px]'>{info.timezone}</h1>
          </div>

          <div className='flex flex-col items-center justify-center'>
              <p className='font-rubik font-thin text-[13px] sm:self-start self-center text-dark_gray'>ISP</p>
              <h1 className='font-rubik font-medium sm:text-[25px] 
              text-[15px] md:text-[17px] max-w-[200px]'>{info.org}</h1>
          </div>
        </div>

      </div>
      <div id="map" className='h-full w-[100%] z-[0]'>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} opacity="1">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerLayer>
            <Marker
                position={position}
            >
                <img src={location} alt="" className='w-[40px] h-[40px]'/>
            </Marker>
        </MarkerLayer>
        <RecenterAutomatically lat={position[0]} lng={position[1]}/>
  </MapContainer>

        </div>        
    </div>
  );
}

export default App;
