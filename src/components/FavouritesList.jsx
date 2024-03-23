import { useSelector } from "react-redux";
import FavouriteItem from "./FavouriteItem";

function FavouriteList() {
    const favourites = useSelector(store => store.favourites);

    return (
        <>
            {favourites.map((item, index) => (
                <FavouriteItem key={index} city={item} />
            ))}
        </>
    );
}

export default FavouriteList;
