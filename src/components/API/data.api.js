import axios from "axios";

async function fetchData(city) {
    try {
        const storedData = JSON.parse(localStorage.getItem("data")) || {};

        if (!storedData[city]) {
            const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=9855ed2a58a04c45830192636243101&q=${city}`);
            storedData[city] = response.data;
            localStorage.setItem("data", JSON.stringify(storedData));
        }

        return storedData[city];
    } catch (error) {
        console.error("Error fetching or storing data:", error);
        throw error;
    }
}

export default fetchData;
