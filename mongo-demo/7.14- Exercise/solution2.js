const mongoose = require("mongoose");

//Connect to DB
mongoose
	.connect("mongodb://localhost/mongo-exercises")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
	tags: [String],
	date: { type: Date, default: Date.now },
	name: String,
	author: String,
	isPublished: Boolean,
	price: Number,
});

const Course = mongoose.model("Course", courseSchema);

//! Exercise #2 Solution
async function getCourses() {
	return await Course.find({
		isPublished: true,
		tags: { $in: ["backend", "frontend"] },
	})
		.sort("-price")
		.select("name author price");
}

async function run() {
	const courses = await getCourses();
	console.log(courses);
}

run();
