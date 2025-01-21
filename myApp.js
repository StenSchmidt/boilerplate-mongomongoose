require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://schmidtsten1324:0nBbwoOEwYAZlwog@cluster0.s02gr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });

let Person;
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});
Person = mongoose.model("Person", personSchema);




const createAndSavePerson = (done) => {
  let StenSchmidt = new Person({name: "Sten Schmidt", age: 21, favoriteFoods: ["pizza", "coleslaw"]});
  StenSchmidt.save(function(err,data) {
    if (err) { return console.error(err);}
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,people) {
    if (err) {return console.log(err);}
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, person) {
    if (err) {return console.log(err);}
    done(null, person);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, food) {
    if (err) {return console.log(err);}
    done(null, food);
  });
};


const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,location) {
    if (err) {return console.log(err);}
    done(null, location);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,individual) => {
    if (err) {return console.log(err);}
    individual.favoriteFoods.push(foodToAdd);
    individual.save((err, newIndividual) => {
      if (err) {return console.log(err);}
      done(null, newIndividual);

    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, age) => {
    if (err) {return console.log(err);}
    done(null, age);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, deleteThisFile) => {
      if (err) {return console.log(err);}
      done(null, deleteThisFile);
    }
  );
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, dataAfterTermination) => {
    if (err) {return console.log(err);}
    done(null, dataAfterTermination);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age: 0}).exec(function(err, users) {
    if (err) {return console.log(err);}
    done(null, users);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
