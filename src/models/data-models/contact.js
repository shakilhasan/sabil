const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	name: { type: String, required: true },
	number: { type: String, required: true },
});

const Contact = new mongoose.model("Contact", contactSchema);

Contact.createNew = async (contact) => {
	contact._id = new mongoose.Types.ObjectId();
	const model = new Contact(contact);
	return model;
}

module.exports = Contact;