import { combineReducers } from "redux"
import { coindetailReducer, coinsdescriptionReducer, cryptoReducer } from "./cryptoReducer"

const reducers = combineReducers({
    crypto: cryptoReducer,
    coinsdescription: coinsdescriptionReducer,
    coindetail: coindetailReducer
})

export default reducers