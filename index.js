const weatherform=document.querySelector(".weatherform");
const cityinput=document.querySelector(".cityinput");
const card=document.querySelector(".card");
const apikey="77d6f656b9d7a8b41a0dbead74d82b09";
weatherform.addEventListener("submit",async event=>{
    event.preventDefault();
    const city=cityinput.value;
    if(city)
    {
       try {
        const weatherdata=await getweatherdata(city);
        displayweatherinfo(weatherdata);
       } catch (error) {
          console.log(error);
          displayerror(error);
       }
    }
    else
    {
       displayerror("please enter a city");
    }
})

async function getweatherdata(city)
{
   const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
   const response =await fetch(apiurl);
   console.log(response);
   if(!response.ok)
   {
    throw new Error("please enter a valid city");
   }
   return await response.json();
}

function displayweatherinfo(data)
{
   const {name:city, 
           main:{temp,humidity}, 
           weather: [{description,id}]}=data;
   card.textContent="";
   card.style.display="flex";
   const citydisplay=document.createElement("h1");
   const tempdisplay=document.createElement("p");
   const humiditydisplay=document.createElement("p");
   const descdisplay=document.createElement("p");
   const weatheremoji=document.createElement("p");
   citydisplay.textContent=city;
   tempdisplay.textContent=`${(temp-273.15).toFixed(2)}°C`;
    humiditydisplay.textContent=`Humidity: ${humidity}%`;
    descdisplay.textContent=description;
    weatheremoji.textContent=getweatheremoji(id);


   citydisplay.classList.add("citydisplay");
   tempdisplay.classList.add("tempdisplay");
   humiditydisplay.classList.add("humiditydisplay");
   descdisplay.classList.add("descdisplay");
   weatheremoji.classList.add("weatheremoji");



   card.appendChild(citydisplay);
   card.appendChild(tempdisplay);
   card.appendChild(humiditydisplay);
   card.appendChild(weatheremoji);


}

function getweatheremoji(weatherid)
{
    switch(true)
    {
        case (weatherid>=200 && weatherid<300):
            return "⛈️";
        case (weatherid>=300 && weatherid<400):
            return "🌧️";
        case (weatherid>=500 &&        weatherid<600):
            return "🌦️"; 
        case (weatherid>=600 &&        weatherid<700):
            return "❄️";
        case (weatherid>=700 &&        weatherid<800):
                return "🌫️"; 
        case (weatherid===800):
            return  "☀️";
        case (weatherid>=801 && weatherid<810):
            return  "☁️";
        default:
            return "?";  
    }
}

function displayerror(message)
{
   const errordisplay=document.createElement("p")
   errordisplay.textContent=message;
   errordisplay.classList.add("errordisplay");
   card.textContent="";
   card.style.display="flex";
   card.appendChild(errordisplay);

}