import ActionTypes from "../constants/action-types"

const initialState = {
    globalstats: {},
    cryptocoins: [],
    cryptonews: [],
    exchanges: []
}

export const cryptoReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_GLOBAL_STATS:
            return {...state, globalstats: payload}
        case ActionTypes.SET_CRYPTOCOINS:
            {
                console.log('//////////////////////////////////')
                const data = state.cryptocoins
                payload.map((value) => {
                    !data.find(({rank}) => rank === value.rank) && data.push(value)
                })
                return {...state, cryptocoins: data}
            }
        case ActionTypes.SET_CRYPTONEWS:
            {
                console.log('1.../////////////////////////')
                const data = state.cryptonews
                payload.map((value) => {
                    !data.find(({name}) => name === value.name) && data.push(value)
                })
                return {...state, cryptonews: data}
            }
        case ActionTypes.SET_EXCAHNGES:
            {
                console.log('2.../////////////////////////')
                const data = state.exchanges
                payload.map((value) => {
                    !data.find(({rank}) => rank === value.rank) && data.push(value)
                })
                return {...state, exchanges: data}
            }
        default:
            return state
    }
}

export const coinsdescriptionReducer = (state = { data: {} }, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_COINS_DESCRIPTION:
            console.log('&^@$#%&&^#@^'+state)
            const uuid = payload.uuid
            const data = state.data
            // data.push(payload)
            data[`${uuid}`] = payload
            return {...state, data: data}
        default:
            return state
    }
}

export const coindetailReducer = (state = {data:{}, priceHistory:{}}, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_CRYPTOCOIN_DETAIL:
            console.log('crypto coin detail')
            return {...state, data: payload}    
        case ActionTypes.REMOVE_CRYPTOCOIN_DETAIL:
            return {}
        case ActionTypes.SET_CRYPTOCOIN_PRICE_HISTORY:
            console.log('sadsfsdf')
            return {...state, priceHistory: payload}
        // case ActionTypes.REMOVE_CRYPTOCOIN_PRICE_HISTORY:
        //     return {}            ////// No Need to write this as calling REMOVE_CRYPTOCOIN_DETAIL will empty whole state...
        default:
            return state
    }
}