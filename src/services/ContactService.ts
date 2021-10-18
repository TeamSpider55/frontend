import { AddContactInput, Contact, UpdateContactInput } from '../dto/Contact';

let CONTACTS: Array<Contact> = [
  {
    contactId: '1',
    nickName: 'Steve',
    tags: ['1', '2'],
    givenName: 'Steven',
    middleName: 'Stevanovich',
    familyName: 'Stevenson',
    email: 'sss@gmail.com',
    phone: '+612345671',
    address: '1 Stephen Street',
    description: 'A very cool guy',
    note: 'note',
    role: 'Student',
    organisation: 'University of Adelaide',
  },
  {
    contactId: '2',
    nickName: 'Jay',
    tags: ['1', '2'],
    givenName: 'Jake',
    middleName: '',
    familyName: 'Lay',
    email: 'jlay@gmail.com',
    phone: '+612345672',
    address: '1 Lake Street',
    description: 'People call him Jay',
    note: 'note',
    role: 'Developer',
    organisation: 'Jaybird',
  },
  {
    contactId: '3',
    nickName: '',
    tags: ['1', '2'],
    givenName: 'Madeleine',
    middleName: '',
    familyName: '',
    email: 'maddd@gmail.com',
    phone: '+612345673',
    address: '1 High Street',
    description: 'All business, no nickname...',
    note: 'note',
    role: 'Ex-CEO',
    organisation: 'Button Pushers Inc.',
  },
  ...[...Array(10)].map((_, index) => {
    const i = index + 3;
    const idx = i.toString();
    return {
      contactId: String(idx),
      nickName: `nick${idx}`,
      tags: ['1', '2'],
      givenName: `Jane${idx}`,
      middleName: '',
      familyName: `Doe${idx}`,
      email: `jane.doe${idx}@gmail.com`,
      phone: `+61234567${idx}`,
      address: `${idx} Apple Street`,
      description: `${idx}lorem ipsum`,
      note: 'note',
      role: 'Product Manager',
      organisation: 'Microsoft',
    };
  }),
  ...[...Array(10)].map((_, index) => {
    const i = index + 3;
    const idx = i.toString();
    return {
      contactId: String(idx),
      nickName: `nick${idx}`,
      tags: ['1', '2'],
      givenName: `John${idx}`,
      middleName: '',
      familyName: `Doe${idx}`,
      email: `john.doe${idx}@gmail.com`,
      phone: `+61234567${idx}`,
      address: `${idx} Apple Street`,
      description: `${idx}lorem ipsum`,
      note: 'note',
      role: 'Software Engineer',
      organisation: 'Apple',
    };
  }),
];

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
  }: AddContactInput): Promise<{ id: string, contacts: Array<Contact>}> {
    const ids = (await this.getContacts()).map((c) => c.contactId);
    const newId = String(Number(ids[ids.length - 1]) + 1);

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

    return {
      id: newId,
      contacts: CONTACTS,
    };
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
