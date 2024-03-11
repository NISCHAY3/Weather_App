// console.log("hello world");

// const API_KEY = "dbfd4312418e1ea3cfa865c2616f2ab2";

// async function showWeather() {
//     // let latitude = 15.333;
//     // let longitude = 74.0833;
//     let city = "goa";
//     const response = await fetch(`https://api.openweathermap.org/data/3.0/weather?q=${city}&appid=&{API_KEY}&units=metric`);

//     const data = await response.json();

//     console.log("weather data:-> ", data);

//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} C`
//     document.body.appendChild(newPara);

// }

// // showWeather()


async function showWeather() {

    let city = "delhi";

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

        let newPara = document.createElement('p');
        let temp = result?.main?.temp.toFixed(2);
        let cel = Math.floor(tempIncelcius(temp))
        console.log(cel)
        newPara.textContent = `${cel} C`
        document.body.appendChild(newPara);

        console.log(result);
    } catch (error) {
        console.error(error);
    }


}

function tempIncelcius(temp) {

    let cel = 5 / 9 * (temp - 32);
    return cel

}

showWeather()

