import mongoose from "mongoose";
import "dotenv/config";

// mongoose connection settings
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

// Verify MongoDB connection
db.once("open", (err) => {
    if (err) {
        res.status(500).json({ error: "500:Connection to the server failed." });
    } else {
        console.log("Successful connection to MongoDB");
    }
});

// Schema definition with validation
const exerciseSchema = mongoose.Schema({
    name: {
        type: String,
        default: "Press",
        minLength: [1, "Name must be at least 1 letter."],
        required: true,
    },
    reps: {
        type: Number,
        default: 5,
        min: [1, "Reps required to be 1 or more."],
        required: true,
    },
    weight: {
        type: Number,
        default: "45",
        min: [0, "Weight must be non-negative."],
        max: [1000000, "1 million unit maximum."],
        required: true,
    },
    unit: {
        type: String,
        default: "lbs",
        enum: {
            values: ["kgs", "lbs", "miles"],
            message: 'Valid units are "kgs", "lbs", or "miles".',
        },
        required: true,
    },
    date: {
        type: String,
        default: Date.toISOString,
        required: true,
    },
});

// Model is generated from given schema
const Exercise = mongoose.model("Exercise", exerciseSchema);

// CREATE model *****************************************
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({
        name: name,
        reps: reps,
        weight: weight,
        unit: unit,
        date: date,
    });
    return exercise.save();
};

// RETRIEVE models *****************************************
// Retrieve all exercises based on a filter, defaults to None
const findExercises = async (filter = None) => {
    const query = Exercise.find(filter);
    return query.exec();
};

// Retrieve givien id's model if exists
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
};

// DELETE a given id's model if exists ***************************************
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id });
    return result.deletedCount;
};

// REPLACE a given id's model if exists **************************************
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne(
        { _id: _id },
        {
            name: name,
            reps: reps,
            weight: weight,
            unit: unit,
            date: date,
        },
        // Manually enable mongoose schema validation on update
        { runValidators: true }
    );
    return result.modifiedCount;
};

// Export our variables for use in the controller file.
export {
    createExercise,
    findExercises,
    findExerciseById,
    replaceExercise,
    deleteById,
};
