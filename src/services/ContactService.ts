import { Contact } from '../dto/Contact';

class ContactService {
  static async getContacts(): Promise<Array<Contact>> {
    return [...Array(24)].map((_, i) => {
      const idx = i.toString();
      return {
        contactId: String(idx),
        nickName: `nick${idx}`,
        tags: ['1', '2'],
        givenName: `given${idx}`,
        middleName: 'middle',
        familyName: 'family',
        email: 'john.doe@gmail.com',
        phone: '+6123456789',
        address: '1 Apple Street',
        description: 'lorem ipsum',
        note: 'note',
      };
    });
  }
}

export default ContactService;
