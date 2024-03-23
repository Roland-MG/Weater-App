import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { delFromfavourites } from "../store/slices/favouritesSlice";
import { Button, Card, Image } from "react-bootstrap";
import { useEffect } from "react";
import fetchData from "./API/data.api";
import { useState } from "react";

function FavouriteItem({ city }) {
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const delFavourit = useCallback(() => {
        dispatch(delFromfavourites(city));
    }, []);

    useEffect(() => {
        const fetchDataForCity = async () => {
            try {
                const data = await fetchData(city);
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataForCity();
    }, [city, dispatch]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <Card style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title className="d-flex flex-row justify-content-between align-content-center">
                    {" "}
                    <Image src={data.current?.condition?.icon} roundedCircle />
                    <span className="align-items-center fs-1">
                        {data.current?.temp_c}
                        <sup>o</sup>
                    </span>
                    <Button
                        variant="outline-secondary"
                        className="fs-1"
                        onClick={delFavourit}>
                        ♥️
                    </Button>
                </Card.Title>
                <Card.Subtitle>{data.current?.condition?.text}</Card.Subtitle>
                <br />
                <Card.Subtitle className="mb-2 text-muted">
                    {data.location?.region}, {data.location?.country}
                </Card.Subtitle>

                <Card.Text>🌊 Wind: {data.current?.wind_kph}kph</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default FavouriteItem;
