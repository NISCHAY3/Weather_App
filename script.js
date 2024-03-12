async function FetchWeatherDetails() {

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
        let cel = tempIncelcius(temp).toFixed(2);
        newPara.textContent = `${cel} °C`
        document.body.appendChild(newPara);
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

function tempIncelcius(temp) {
    let cel = 5 / 9 * (temp - 32);
    return cel
}

