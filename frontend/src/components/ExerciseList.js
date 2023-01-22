import React from "react";
import Exercise from "./Exercise";

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table id="exercises">
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th class="right">Reps</th>
                    <th class="right">Weight/Distance</th>
                    <th class="center">Unit</th>
                    <th class="right">Date</th>
                    <th class="center">Delete</th>
                    <th class="center">Edit</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => (
                    <Exercise
                        exercise={exercise}
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ExerciseList;
