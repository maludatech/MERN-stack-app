import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForms";

export const Home = () =>{
  const  {workouts, dispatch}= useWorkoutsContext(); //destructure the useWorkoutsontext in order to get workouts & dispatch.

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch("/api/workouts")
            const json = await response.json()

            if (response.ok){
                dispatch({type: "SET_WORKOUTS", payload: json});//dispatch an action
            }
        }
        fetchWorkouts()
    }, [dispatch]);

    return(
            <div className="home">
            <div className="workouts">
            {workouts && workouts.map((workOut)=>{
              return(<WorkoutDetails key={workOut._id} workout={workOut}/>);
            })}
            </div>
            <WorkoutForm/>
        </div>
    )
};