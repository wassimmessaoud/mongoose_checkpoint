const mongoose = require("mongoose");
const Person = require("./model/Person");
require("dotenv").config();

const connectionToDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DataBase..."))
    .catch((err) => console.error("Could not connect", err));
};
connectionToDB();
//Create and Save a Record of a Model

const person = new Person({
  name: "Yasmin",
  age: 12,
  favoriteFoods: ["Pizza", "Makloub"],
});
person
  .save()
  .then(() => {
    console.log("person saved");
  })
  .catch((err) => {
    console.error(err);
  });
//Create Many Records with model.create()
const arrayOfPeople = [
  {
    name: "Houda",
    age: 25,
    favoriteFoods: ["Pasta", "Sandwich", "Fish"],
  },
  {
    name: "Imed",
    age: 30,
    favoriteFoods: ["Salad", "Sea Food"],
  },
  {
    name: "Arij",
    age: 5,
    favoriteFoods: ["Ice Cream", "Candy", "Chips"],
  },
];

Person.create(arrayOfPeople)
  .then(() => console.log("persons added"))
  .catch((err) => {
    console.error(err);
  });
//Use model.find() to Search Your Database
Person.find()
  .then((doc) => console.log("all Persons", doc))
  .catch((err) => console.log(err));
//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ name: "Yasmin" })
  .then((doc) => console.log("findone", doc.favoriteFoods))
  .catch((err) => console.log(err));
//Use model.findById() to Search Your Database By _id
Person.findById({ _id: "60cf106bc87d382c186b0c88" })
  .then((doc) => console.log("byid", doc))
  .catch((err) => console.log(err));
// Perform Classic Updates by Running Find, Edit, then Save
/*{Person.findById({_id: "60cf106bc87d382c186b0c89"},(err,data)=>{
    if(err){
        console.log(err)
    } else {
        data.age=28;
        data.save((err,data)=>{
            err ? console.log(err):console.log("updateClassique",data)
        })
    }
})} */
// Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate(
  { _id: "60cf106bc87d382c186b0c88" },
  { $set: { age: 28 } }
)
  .then((doc) => console.log("update", doc))
  .catch((err) => console.log(err));
// Delete One Document Using model.findByIdAndRemove
Person.findByIdAndDelete({ _id: "60cf0fafbbaa170cdcb4c9b6" })
  .then((doc) => console.log("remove", doc))
  .catch((err) => console.log(err));
// Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: { $in: ["Salad"] } })
  .limit(2)
  .select("-age")
  .sort({ name: "asc" })
  .exec()
  .then((docs) => console.log(docs, "docs"))
  .catch((err) => console.log(err));
