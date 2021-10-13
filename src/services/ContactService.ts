import axios from 'axios';
import { Contact } from '../dto/Contact';

export interface contactUpdate {
  contactId: string,
  email: string,
  name: string,
  phone: string,
  location: string,
  role: string,
  organisation: string,
  description: string,
  nickName: string,
  tags: string[],
  note: string[],
}

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

  static async getContact(userName: String, contactId: String): Promise<Contact> {
    return ((await axios.get(`/contact/getContact/${userName}/${contactId}`)).data as any).data;
  }

  static async updateContact(newDetail: contactUpdate): Promise<Contact> {
    console.log(newDetail);
    const response = await axios.post('https://spider55-api.herokuapp.com/contact/updateContact/', {
      contactId: `${(await newDetail).contactId}`,
      nickName: `${(await newDetail).nickName}`,
      givenName: `${(await newDetail).name.split(' ').length > 0 ? '' : (await newDetail).name.split(' ')[0]}`,
      middleName: `${(await newDetail).name.split(' ').length > 2 ? '' : (await newDetail).name.split(' ')[1]}`,
      familyName: `${(await newDetail).name.split(' ').length > 2 ? '' : (await newDetail).name.split(' ')[2]}`,
      tags: ['1', '2'],
      email: `${(await newDetail).email}`,
      phone: `${(await newDetail).phone}`,
      address: `${(await newDetail).location}`,
      description: `${(await newDetail).description}`,
      role: `${(await newDetail).role}`,
      organisation: `${(await newDetail).organisation}`,
      note: 'note',
    });
    return response.data;
    // if (response.status === 200) {

    // }
    // return {
    //   contactId: `${(await newDetail).contactId}`,
    //   nickName: `${(await newDetail).nickName}`,
    //   tags: ['1', '2'],
    //   givenName: `${(await newDetail).name.split(' ')[0]}`,
    //   middleName: `${(await newDetail).name.split(' ')[1]}`,
    //   familyName: `${(await newDetail).name.split(' ')[2]}`,
    //   email: `${(await newDetail).email}`,
    //   phone: `${(await newDetail).phone}`,
    //   address: `${(await newDetail).location}`,
    //   description: `${(await newDetail).description}`,
    //   note: 'note',
    // };
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
