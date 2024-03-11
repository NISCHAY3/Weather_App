console.log("hello world");

const API_KEY = "c53b5f54f40e0e24ddd8c4bb947e1822"

async function showWeather() {
    // let latitude = 15.333;
    // let longitude = 74.0833;
    let city = "goa";
    const response = await fetch(`https://api.openweathermap.org/data/3.0/weather?q=${city}&appid=&{API_KEY}&units=metric`);

    const data = await response.json();

    console.log("weather data:-> ", data);

    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} C`
    document.body.appendChild(newPara);

}

