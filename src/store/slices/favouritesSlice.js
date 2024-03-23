import _ from "lodash"

export const favourites = []

export const favouritesReducer = (state = favourites, { type, payload }) => {
    switch (type) {

        case "get-favourites-data":
            return _.union(state, payload)

        case "add-to-favourites":
            console.log("add f")

            return !state.includes(payload) ? [...state, payload] : state


        case "del-from-favourites":
            return (() => {
                let newState = state.filter(item => item !== payload)
                localStorage.setItem("favourites", JSON.stringify(newState))
                return [...newState]
            })()


        default:

            return state
    }
}

export const addTofavourites = (name) => {
    return dispatch => {
        dispatch({
            type: "add-to-favourites",
            payload: name
        })
    }
}
export const delFromfavourites = (name) => {
    return dispatch => {
        dispatch({
            type: "del-from-favourites",
            payload: name
        })
    }
}
export const getFavouriteData = () => {
    return dispatch => {
        dispatch({
            type: "get-favourites-data",
            payload: JSON.parse(localStorage.getItem('favourites')) || []
        })
    }
}
