const Database = require('mongoose');

const userSchema = new Database.Schema({
    email: { type: String, min: 6, max: 200, required: true},
    password: { type: String, min: 6, max: 1000, required: true }
})

module.exports = Database.model('User', userSchema);