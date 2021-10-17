import { AddContactInput, Contact, UpdateContactInput } from '../dto/Contact';

let CONTACTS: Array<Contact> = [...Array(3)].map((_, i) => {
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
    role: `Developer ${idx}`,
    organisation: `Company ${idx}`,
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

  static async addContact({
    email,
    givenName,
    familyName,
  }: AddContactInput): Promise<Array<Contact>> {
    const ids = (await this.getContacts()).map((c) => c.contactId);
    const newId = ids[ids.length - 1] + 1;

    CONTACTS = [...CONTACTS,
      {
        contactId: newId,
        nickName: '',
        tags: [],
        givenName,
        middleName: '',
        familyName,
        email,
        phone: '',
        address: '',
        description: '',
        note: '',
        role: '',
        organisation: '',
      },
    ];

    return CONTACTS;
  }

  static async updateContact({
    contactId,
    nickName,
    tags,
    givenName,
    middleName,
    familyName,
    email,
    phone,
    address,
    description,
    note,
    role,
    organisation,
  }: UpdateContactInput): Promise<Array<Contact>> {
    const idx = CONTACTS.findIndex((c) => c.contactId === contactId);

    if (idx === -1) {
      return CONTACTS;
    }

    const oldContact = CONTACTS[idx];

    CONTACTS = CONTACTS.map((c) => {
      if (c.contactId === oldContact.contactId) {
        return {
          ...c,
          nickName: nickName !== undefined ? nickName : c.nickName,
          tags: tags !== undefined ? tags : c.tags,
          givenName: givenName !== undefined ? givenName : c.givenName,
          middleName: middleName !== undefined ? middleName : c.middleName,
          familyName: familyName !== undefined ? familyName : c.familyName,
          email: email !== undefined ? email : c.email,
          phone: phone !== undefined ? phone : c.phone,
          address: address !== undefined ? address : c.address,
          description: description !== undefined ? description : c.description,
          note: note !== undefined ? note : c.note,
          role: role !== undefined ? role : c.role,
          organisation: organisation !== undefined ? organisation : c.organisation,
        };
      }
      return c;
    });

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
        role: 'Software Engineer',
        organisation: 'Apple',
      };
    });
  }
}

export default ContactService;
