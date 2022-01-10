class ContactViewModel{
    static convert = ( contact) => {
        const viewModel = Object.create( contact);
        const { __v, ...rest } = JSON.parse(JSON.stringify(viewModel));
        return rest;
    }
}

module.exports.ContactViewModel = ContactViewModel;