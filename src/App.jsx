import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./store/slices/dataSlice";
import fetchData from "./components/API/data.api";
import SearchForm from "./components/SearchForm";
import WeatherWidget from "./components/WeatherWidget";
import FavouriteList from "./components/FavouritesList";
import { getFavouriteData } from "./store/slices/favouritesSlice";
import partlyCloudyImage from "./assets/img/partly-cloudy.jpg";
import sunnySkyImage from "./assets/img/sunny-sky.jpg";
import cloudyImage from "./assets/img/cloudy.jpg";
import rainImage from "./assets/img/rain.jpg";

function App() {
    const dispatch = useDispatch();
    const city = useSelector(store => store.city);
    const data = useSelector(store => store.data);
    const favourites = useSelector(store => store.favourites);

    useEffect(() => {
        const fetchDataForCity = async () => {
            try {
                const data = await fetchData(city);
                dispatch(setData(data));
                updateBackground(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataForCity();
    }, [city, dispatch]);

    useEffect(() => {
        // console.log("fav", favourites);
        favourites.length !== 0
            ? localStorage.setItem("favourites", JSON.stringify(favourites))
            : null;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favourites]);

    useEffect(() => {
        dispatch(getFavouriteData());
    }, []);

    const updateBackground = weatherData => {
        if (
            weatherData &&
            weatherData.current &&
            weatherData.current.condition
        ) {
            const conditionText =
                weatherData.current.condition.text.toLowerCase();

            switch (conditionText) {
                case "clear":
                    return `url(${sunnySkyImage})`;

                case "partly cloudy":
                    return `url('${partlyCloudyImage}')`;

                case "cloudy":
                    return `url('${cloudyImage}')`;

                case "rain":
                    return `url('${rainImage}')`;

                default:
                    return `url('${sunnySkyImage}')`;
            }
        }

        return `url(${sunnySkyImage})`;
    };

    return (
        <div
            className="container-fluid d-flex p-2 mb-auto"
            style={{
                height: "100vh",
                background:
                    updateBackground(data) +
                    " center center/cover no-repeat local",
            }}>
            <div className="container">
                <SearchForm />
                <WeatherWidget />
            </div>
            <div>
                <FavouriteList favourites={favourites} />
            </div>
        </div>
    );
}

export default App;
