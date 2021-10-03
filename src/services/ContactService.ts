import axios from 'axios';
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

  static async getContact(userName: String, contactId: String): Promise<Contact> {
    // console.log(axios.get(`/contact/getContact/${userName}/${contactId}`));
    // return axios.get(`/contact/getContact/${userName}/${contactId}`);
    return {
      contactId: `${contactId}`,
      nickName: 'nick',
      tags: ['1', '2'],
      givenName: 'given',
      middleName: 'middle',
      familyName: 'family',
      email: 'john.doe@gmail.com',
      phone: '+6123456789',
      address: '1 Apple Street',
      description: 'lorem ipsum',
      note: 'note',
    };
  }

  static async updateContact(newDetail: Promise<any>): Promise<Contact> {
    // console.log(axios.post('/contact/updateContact', newDetail));
    // const response = await axios.post('/contact/updateContact', {
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
    // });
    // if (response.status === 200) {

    // }
    return {
      contactId: `${(await newDetail).contactId}`,
      nickName: `${(await newDetail).nickName}`,
      tags: ['1', '2'],
      givenName: `${(await newDetail).name.split(' ')[0]}`,
      middleName: `${(await newDetail).name.split(' ')[1]}`,
      familyName: `${(await newDetail).name.split(' ')[2]}`,
      email: `${(await newDetail).email}`,
      phone: `${(await newDetail).phone}`,
      address: `${(await newDetail).location}`,
      description: `${(await newDetail).description}`,
      note: 'note',
    };
  }
}

export default ContactService;
