import React from "react";
import ExerciseList from "../components/ExerciseList";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import arm from "../images/Armweight.gif";
import comp_lift from "../images/weight_md_wht.gif";

function HomePage({ setExercise }) {
    // Use the history for updating
    const history = useHistory();

    // Use state to bring in the data
    const [exercises, setExercises] = useState([]);

    // RETRIEVE the list of exercises
    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const exercises = await response.json();
        setExercises(exercises);
    };

    // UPDATE a exercise
    const onEditExercise = async (exercise) => {
        setExercise(exercise);
        history.push("/edit-exercise");
    };

    // DELETE a exercise
    const onDeleteExercise = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
        if (response.status === 204) {
            const getResponse = await fetch("/exercises");
            const exercises = await getResponse.json();
            setExercises(exercises);
        } else {
            console.error(
                `Failed to delete exercise with _id = ${_id}, status code = ${response.status}`
            );
        }
    };

    // LOAD the exercises
    useEffect(() => {
        loadExercises();
    }, []);

    // DISPLAY the exercises
    return (
        <>
            <article>
                <div id="home_lander">
                    <img src={arm} alt="Disembodied arm curling dumbell"></img>
                    <h2>WORKOUT HISTORY</h2>
                    <img src={comp_lift} alt="Computer crunching numbers"></img>
                </div>
                <ExerciseList
                    exercises={exercises}
                    onEdit={onEditExercise}
                    onDelete={onDeleteExercise}
                />
            </article>
        </>
    );
}

export default HomePage;
