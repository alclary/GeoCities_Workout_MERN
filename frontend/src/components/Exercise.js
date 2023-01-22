import React from "react";
import saveGif from "../images/spinningfloppyan.gif";
import deleteGif from "../images/trash.gif";

function Exercise({ exercise, onEdit, onDelete }) {
    return (
        <tr>
            <td>{exercise.name}</td>
            <td class="right">{exercise.reps}</td>
            <td class="right">{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td class="right">{exercise.date}</td>
            <td class="center">
                <img
                    src={deleteGif}
                    alt="Delete exercise"
                    onClick={() => onDelete(exercise._id)}
                ></img>
            </td>
            <td class="center">
                <img
                    src={saveGif}
                    alt="Edit exercise"
                    onClick={() => onEdit(exercise)}
                ></img>
            </td>
        </tr>
    );
}

export default Exercise;
