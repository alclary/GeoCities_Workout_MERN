import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export const EditExercisePage = ({ exercise }) => {
    const [name, setName] = useState(exercise.name);
    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);
    const [unit, setUnit] = useState(exercise.unit);
    const [date, setDate] = useState(exercise.date);

    const history = useHistory();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exercise._id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: name,
                reps: reps,
                weight: weight,
                unit: unit,
                date: date.toString(),
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(
                `Failed to update document. Status ${response.status}.\n${errMessage.message}`
            );
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <h2>Need to add another rep?</h2>
                <p>
                    Each exercise must contain the following details for entry:
                </p>
                <ul>
                    <li>Name of exercise (1 or more characters).</li>
                    <li>Number of reps (1 or more).</li>
                    <li>Weight lifted / units completed (1 to 1200).</li>
                    <li>Units (lbs, kgs, or miles).</li>
                    <li>Date completed (date format).</li>
                </ul>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <fieldset>
                        <legend>Max that weight</legend>
                        <label for="title">Exercise title</label>
                        <input
                            type="text"
                            placeholder="Name of exercise"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                        />
                        <br />
                        <label for="reps">Number of reps complete</label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="reps"
                            onChange={(e) => setReps(e.target.value)}
                            id="reps"
                        />
                        <br />
                        <label for="weight">
                            Weight lifted / Units Completed
                        </label>
                        <input
                            type="number"
                            placeholder="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                        />
                        <br />
                        <label for="unit">Units</label>
                        <input
                            type="text"
                            placeholder="lbs"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            id="unit"
                        />
                        <br />
                        <label for="date">Date</label>
                        <input
                            type="date"
                            placeholder="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            id="date"
                        />
                        <br />
                        <label for="submit">
                            <button onClick={editExercise} id="submit">
                                Save
                            </button>
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
};
export default EditExercisePage;
