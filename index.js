const redux = require('redux');
const createStore = redux.createStore
const combineReducers= redux.combineReducers
const CAKE_ORDERD= "CAKE_ORDERD";//action type
const CAKE_RESTOCK="CAKE_RESTOCK";
const ICECREAM_ORDERD= "ICECREAM_ORDERD";
const ICECREAM_RESTOCK="ICECREAM_RESTOCK";

//action creater
function orderCake(){
return{
    type:CAKE_ORDERD,
    quantity:1,
}
}

function restockCake(qty=1){
    return{
        type:CAKE_RESTOCK,
        quantity:qty,
    }
}

function orderIceCream(qty=1){
    return{
        type:ICECREAM_ORDERD,
        payload:qty,
    }
}

function restockIceCream(qty=1){
    return{
        type:ICECREAM_RESTOCK,
        payload:qty,
    }
}
//state
const cakeState={
    numofCakes:10,
   
}
const icecreamState={
    numofIcecream:15,
    
}
//Reducer
const cakeReducer =(state=cakeState,action)=>{
        switch(action.type){
            case CAKE_ORDERD:
                return {
                    ...state,
                    numofCakes:state.numofCakes-1,
                }

            case CAKE_RESTOCK:
                return {
                    ...state,
                    numofCakes:state.numofCakes+action.quantity
                }
                
            default:
                return state
        }
}

const iceCreamReducer =(state=icecreamState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERD:
            return {
                ...state,
                numofIcecream:state.numofIcecream-1,
            }

        case ICECREAM_RESTOCK:
            return {
                ...state,
                numofIcecream:state.numofIcecream+action.payload
            }
            
        default:
            return state
    }
}

//combineReducers
const rootReducer =combineReducers({
    
    cake:cakeReducer,
    iceCream:iceCreamReducer

})

//store
const store = createStore(rootReducer)
console.log("Intial State", store.getState())
const unsubscribe= store.subscribe(()=> console.log("Update State", store.getState()))

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3))
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(restockIceCream(2))

unsubscribe();