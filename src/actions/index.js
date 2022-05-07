import ActionTypes from "../constants/action-types"

export const setGlobalStats = (globalstats) => {
    return ({
        type: ActionTypes.SET_GLOBAL_STATS,
        payload: globalstats
    })
}

export const setCryptoCoins = (cryptocoins) => {
    return ({
        type: ActionTypes.SET_CRYPTOCOINS,
        payload: cryptocoins
    })
}

export const setCryptoNews = (cryptonews) => {
    return ({
        type: ActionTypes.SET_CRYPTONEWS,
        payload: cryptonews
    })
}

export const setExchanges = (exchanges) => {
    return ({
        type: ActionTypes.SET_EXCAHNGES,
        payload: exchanges
    })
}

export const setCoinsDescription = (data) => {
    return ({
        type: ActionTypes.SET_COINS_DESCRIPTION,
        payload: data
    })
}

export const setCoinDetail = (data) => {
    return ({
        type: ActionTypes.SET_CRYPTOCOIN_DETAIL,
        payload: data
    })
}

export const removeCoinDetail = () => {
    return ({
        type: ActionTypes.REMOVE_CRYPTOCOIN_DETAIL
    })
}

export const setCoinPriceHistory = (data) => {
    return ({
        type: ActionTypes.SET_CRYPTOCOIN_PRICE_HISTORY,
        payload: data
    })
}

export const removeCoinPriceHistory = () => {
    return ({
        type: ActionTypes.REMOVE_CRYPTOCOIN_PRICE_HISTORY
    })
}