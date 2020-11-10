const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.js');
const DB_NAME = 'express-celebrity';

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrity = [
    {
        name: "Ian Somerhalder",
        occupation: "actor",
        catchPhrase: "Lorem ipsum dolor sit amet"
    }, 
    {
        name: "Johnny depp",
        occupation: "actor",
        catchPhrase: "Lorem ipsum dolor sit amet"
    },
    {
        name: "Mila Kunis",
        occupation: "actress",
        catchPhrase: "Lorem ipsum dolor sit amet"
    }
]


Celebrity.create(celebrity)
.then(celebsFromDB => {
    console.log(`Created ${celebsFromDB.length} celebrities`);
    mongoose.connection.close();
})
.catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));