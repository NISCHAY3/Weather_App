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
        const result = await response.text();
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



}










