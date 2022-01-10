const dbHandler = require('../db-handler');
const contactService = require('../../../src/services/contact-service');


beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

/**
 * Contact test suite.
 */
describe('Contact', () => {

  // create and search contact test
  it('can be created and searched successfully', async () => {
    const contactId = await contactService.save(contactComplete);
    expect(contactId).toBeDefined();

    const contacts = await contactService.search({ searchText: 'shakil' });
    expect(contacts.length).toBe(1);
    expect(contacts[0].name).toBe('shakil');
  });

  // update contact test
  it('can be updated successfully', async () => {
    const contactId = await contactService.save(contactComplete);
    expect(contactId).toBeDefined();

    const contact = await contactService.getById(contactId);
    expect(contact.name).toBe('shakil');

    contact.name = 'shakil';
    await contactService.update(contact);

    const updatedContact = await contactService.getById(contactId);
    expect(updatedContact.name).toBe('shakil');
  });

  /**
   * Complete contact example.
   */
  const contactComplete = {
    "name":"shakil",
    "number":"+8801981998640"
  };
});