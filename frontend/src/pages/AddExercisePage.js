import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import liftman from "../images/Lifting_weights.gif";
import liftlady from "../images/lifting.gif";

export const AddExercisePage = () => {
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [unit, setUnit] = useState("");
    const [date, setDate] = useState("");

    const history = useHistory();

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date };
        const response = await fetch("/exercises", {
            method: "post",
            body: JSON.stringify(newExercise),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 201) {
            alert("Successfully logged exercise.");
        } else {
            const errMessage = await response.json();
            alert(
                `Failed to add exercise, status code = ${response.status}.\n${errMessage.message}`
            );
        }
        history.push("/");
    };

    return (
        <>
            <article>
                <div id="add_page_subhead">
                    <img src={liftman} alt="Frogman power squating"></img>
                    <h2>Log an Exercise</h2>
                    <img
                        src={liftlady}
                        alt="Bodybuilder performing dumbell bicep curl"
                    ></img>
                </div>
                <p>
                    If you want to be in the best shape of your life--like our
                    little green friend, above--logging your lifts is a crucial
                    first step.
                </p>
                <p>
                    The MUSCLE TRACKER 2000™ is the only workout tracker tool
                    you'll ever need. Start tracking your exercises now and
                    before you know it you'll be in the record books.
                </p>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <fieldset>
                        <legend>Exercise entry:</legend>
                        <label for="name">Exercise name</label>
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
                        <label for="weight">Weight lifted</label>
                        <input
                            type="number"
                            placeholder="weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            id="weight"
                        />
                        <br />
                        <label for="unit">Unit of weight</label>
                        <input
                            type="text"
                            placeholder="lbs, kgs, miles"
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
                        <label id="submit">
                            <button
                                type="submit"
                                onClick={addExercise}
                                id="submit"
                            >
                                Submit
                            </button>
                        </label>
                    </fieldset>
                </form>
            </article>
        </>
    );
};

export default AddExercisePage;
