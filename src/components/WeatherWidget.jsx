import { Button, Card, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addTofavourites } from "../store/slices/favouritesSlice";
import { useCallback } from "react";

function WeatherWidget() {
    const data = useSelector(store => store.data);
    const dispatch = useDispatch();

    const addFavourit = useCallback(() => {
        dispatch(addTofavourites(data.location.region));
    }, [data]);

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
                        onClick={addFavourit}>
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

export default WeatherWidget;
