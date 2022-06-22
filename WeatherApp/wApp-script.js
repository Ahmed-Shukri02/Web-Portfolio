dataDiv = document.getElementById("data");
myButton = document.getElementById("button1");
myForm = document.getElementById("settingForm");
formText = document.getElementById("city-select");
// cache all div elements that will be changed
var c_city = document.getElementById("city");
var temp = document.getElementById("current-temp");
var wImage = document.getElementById("weather-image");
var wind = document.getElementById("wind");
var windDir = document.getElementById("wind-dir");
var weatherBg = document.querySelector(".weather-bg");

var city = "Paris";
var current_code = 0;
var current_isDay = 0;
timeoutID = updateWeather(updated = false);

// sun/light clouds from 1000-1049
// fog from 1050-1149
// rain from 1150-1201, 1240-1246
// snow from 1204-1237, 1249-1264
// storm from 1273-1276
// snow storm from 1279-1282

// make function that returns src for background image when given a code
function ReturnSrc(weatherCode, isDay){
    console.log(isDay);

    if(weatherCode >= 1000 && weatherCode <= 1049 && isDay == 1){ return "sunnyGif.gif"; }
    else if(weatherCode >= 1000 && weatherCode <= 1049 && isDay == 0){ return "nightGif.gif"; }
    else if(weatherCode >= 1050 && weatherCode <= 1149){ return "fogGif.gif"; }
    else if(weatherCode >= 1150 && weatherCode <= 1201 || weatherCode >= 1240 && weatherCode <= 1246){ return "rainyGif.gif"; }
    else if(weatherCode >= 1204 && weatherCode <= 1237 || weatherCode >= 1249 && weatherCode <= 1264){ return "snowGif.gif"; }
    else if(weatherCode >= 1273 && weatherCode <= 1276){ return "stormGif.gif"; }
    else if(weatherCode >= 1279 && weatherCode <= 1282){ return "blizzardGif.gif"; }
    
    else return null;
}



myForm.addEventListener("submit", function(e){
    // stop form from submitting
    e.preventDefault();

    city = formText.value;

    updateWeather(updated = true);

})

function updateWeather(updated = false){
    console.log("updating weather...");
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.weatherapi.com/v1/current.json?q="+city+"&key=0c531e6b4837446096391931222106", true);

    xhr.onload = function(){
        if(this.status == 200){
            data = JSON.parse(this.responseText);
            wCode = data.current.condition.code;
            isDay = data.current.is_day;

            console.log(data);
            c_city.textContent = data.location.name;
            temp.textContent = data.current.temp_c + '°C';
            wImage.src = 'https:' + data.current.condition.icon;
            wind.textContent = 'Wind Speed: '+data.current.wind_kph+'kph';
            windDir.textContent = 'Wind direction: '+function(){
                switch(data.current.wind_dir){
                    case "E": return "East";
                    case "W": return "West";
                    case "N": return "North";
                    case "S": return "South";
                    default: return data.current.wind_dir;
                }}();
            
            if(wCode != current_code || current_isDay != isDay){
                current_code = wCode;
                // find source for background image and apply to background
                weatherBg.src = ReturnSrc(wCode, isDay);

            }
        }
    }
    
    xhr.send();

    if(!updated){
        timeoutID = setTimeout(updateWeather, 10000);
    }   
}