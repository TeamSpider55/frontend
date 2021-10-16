import { Contact } from '../dto/Contact';

let CONTACTS = [...Array(3)].map((_, i) => {
  const idx = i.toString();
  return {
    contactId: String(idx),
    nickName: `nick${idx}`,
    tags: ['1', '2'],
    givenName: `given${idx}`,
    middleName: `middle${idx}`,
    familyName: `family${idx}`,
    email: `john.doe${idx}@gmail.com`,
    phone: `+61234567${idx}`,
    address: `${idx} Apple Street`,
    description: `${idx}lorem ipsum`,
    note: 'note',
  };
});

class ContactService {
  static async getContacts(): Promise<Array<Contact>> {
    return CONTACTS;
  }

  static async deleteContact(id: string): Promise<Array<Contact>> {
    CONTACTS = CONTACTS.filter((contact) => contact.contactId !== id);
    return CONTACTS;
  }

  static async deleteContacts(ids: string[]): Promise<Array<Contact>> {
    CONTACTS = CONTACTS.filter((c) => !ids.includes(c.contactId));
    return CONTACTS;
  }

  static getDummyContacts(n: number = 24): Array<Contact> {
    return [...Array(n)].map((_, i) => {
      const idx = i.toString();
      return {
        contactId: String(idx),
        nickName: `nick${idx}`,
        tags: ['1', '2'],
        givenName: `given${idx}`,
        middleName: `middle${idx}`,
        familyName: `family${idx}`,
        email: `john.doe${idx}@gmail.com`,
        phone: `+61234567${idx}`,
        address: `${idx} Apple Street`,
        description: `${idx}lorem ipsum`,
        note: 'note',
      };
    });
  }
}

export default ContactService;
