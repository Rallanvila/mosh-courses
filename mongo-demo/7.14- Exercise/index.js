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

async function getCourses() {
	const courses = await Course.find({ id: "5a68fde3f09ad7646ddec17e" });
	console.log(courses);
}

async function updateCourse(id) {
	//Approach: Query first and findById()
	const result = await Course.update(
		{ _id: id },
		{
			$set: {
				author: "Mosh",
				isPublished: false,
			},
		});
	console.log(result);
}
updateCourse("5a68fde3f09ad7646ddec17e");
// getCourses();
