// async function FetchWeatherDetails() {

//     let city = "delhi";

//     const url = `https://open-weather13.p.rapidapi.com/city/${city}`;
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'f90cae834emsh2cdacd862c0d8a6p1cb217jsn1b79bb49d3f4',
//             'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const result = await response.json();
//         let newPara = document.createElement('p');
//         let temp = result?.main?.temp.toFixed(2);
//         let cel = tempIncelcius(temp).toFixed(2);
//         newPara.textContent = `${cel} °C`
//         document.body.appendChild(newPara);
//         console.log(result);
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

// function tempIncelcius(temp) {
//     let cel = 5 / 9 * (temp - 32);
//     return cel
// }

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;

oldTab.classList.add("current-tab");

function switchTab(newTab) {
    if (newTab != oldTab) {

        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!searchForm.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");

        }

        else {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSesssionStorage();
        }



    }
}

userTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    //pass clicked tab as input paramter
    switchTab(searchTab);
});

function getfromSesssionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {

    const { lat, lon } = coordinates;

    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    const url = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f90cae834emsh2cdacd862c0d8a6p1cb217jsn1b79bb49d3f4',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeartherInfo(result);
    }
    catch (error) {
        console.error(error);
        loadingScreen.classList.remove("active");
    }
}


function renderWeartherInfo(weatherInfo) {

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");

    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("data-windspeed");

    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    //fetch values
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144/108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        //show an alert for no geo location
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getlocation);


const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);


})


async function fetchSearchWeatherInfo(city) {


    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("actvie");
    const url = `https://open-weather13.p.rapidapi.com/city/${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f90cae834emsh2cdacd862c0d8a6p1cb217jsn1b79bb49d3f4',
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        loadingScreen.classList.remove("active");

        userInfoContainer.classList.add("active");

        renderWeartherInfo(result);


    }
    catch (err) {


    }

}











