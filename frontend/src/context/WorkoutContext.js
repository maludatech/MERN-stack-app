import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action)=>{
    switch (action.type){
        case "SET_WORKOUTS": 
        return {
            workouts: action.payload
        }
        case "CREATE_WORKOUT":
        return{
            workouts: [action.payload, ...state.workouts]
        }
        case "DELETE_WORKOUT":
        return{
            workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
        }
        default:
        return state
    }
}
//action is the object we passed into the dispatch function
export const WorkoutContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(workoutReducer , {
        workouts: null //initial value for this state //workoutReducer is the reducer function
    });

    //if we wanna update the state object, we'll first of all call the dispatch function

    //EXAMPLE: dispatch({type: "SET_WORKOUTS", payload:[{}, {}]})
    // 1st property - pass an object that's an argument which have a type property that's usually a string which describes inwardlythe state change that we wanna make.
    //2nd property - which represents any data we need to make this change, in this situaton - array of workout objects
    return (
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutContext.Provider>
    )
}