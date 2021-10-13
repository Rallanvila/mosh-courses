//Process to create documents
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

//Create a schema to set the properties each item needs
const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
	},
	category: {
		type: String,
		enum: ["web", "mobile", "network"], //Means will only accept these types
		lowercase: true,
		// uppercase: true,
		trim: true,
	},
	author: String,
	tags: {
		type: Array,
		//Below is a custom validator
		validate: {
			isAsync: true,
			validator: function (v, callback) {
				setTimeout(() => {
					//do some async work
					const result = v && v.length > 0;
					callback(result);
				}, 4000);
			},
			message: "A course should have at least one tag.",
		},
	},
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
	price: {
		type: Number,
		required: function () {
			return this.isPublished;
		},
		min: 10,
		max: 200,
		get: (v) => Math.round(v),
		set: (v) => Math.round(v),
	},
});

//Set the schema model to a Class
const Course = mongoose.model("Course", courseSchema);

//create async function to build the class
async function createCourse() {
	const course = new Course({
		name: "Angular Course",
		category: "Web",
		author: "Allan",
		tags: ["frontend"],
		isPublished: true,
		price: 15.8,
	});
	try {
		const result = await course.save();
		console.log(result);
	} catch (ex) {
		for (field in ex.errors) console.log(ex.errors[field].message);
	}
}

async function getCourses() {
	const pageNumber = 2;
	const pageSize = 10;

	const courses = await Course.find({ _id: "614e32b03487fb1766fc7276" })
		// .skip((pageNumber -1) * pageSize)
		// .limit(pageSize)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1, price: 1 });
	console.log(courses[0].price);
}

async function updateCourse(id) {
	const course = await Course.findById(id);
	if (!course) return;
	course.isPublished = true;
	course.author = "Another Author";
	const result = await course.save();
	console.log(result);
}

async function deleteCourse(id) {
	Course.deleteOne({ _id: id });
	const course = await Course.findByIdAndRemove(id);
	console.log(course);
}
// getCourses();

getCourses();
