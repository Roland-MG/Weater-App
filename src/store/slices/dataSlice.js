export const data = {}


export const dataReducer = (state = data, { type, payload }) => {
    switch (type) {

        case "set-data":
            return { ...payload }
        // ...data.filter((dta) => payload.indexOf(dta) < 0)
        default:
            return state
    }
}



export const setData = (data) => {
    return dispatch =>
        dispatch({
            type: "set-data",
            payload: data
        })
}
