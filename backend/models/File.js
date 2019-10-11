const Database = require('mongoose');

const fileSchema = new Database.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    owner: { type: Database.Schema.Types.ObjectId, ref: 'User', required: true },
    shared: [{ type: Database.Schema.Types.ObjectId, ref: 'User' }],
    download: { type: String, required: true },
    size: { type: String, required: true }
})

module.exports = Database.model('File', fileSchema);