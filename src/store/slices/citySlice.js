export const cityName = "Yerevan";


export const cityReducer = (state = cityName, { type, payload }) => {
    switch (type) {
        case "set-city":
            return payload;
        default:
            return state;
    }
};

export const setCity = (data) => {
    return dispatch => {
        dispatch({
            type: "set-city",
            payload: data
        })
    }
}


