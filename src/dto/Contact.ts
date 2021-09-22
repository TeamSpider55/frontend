// TODO: add organisation, role, date added, imageURL, once backend
// accomodates

export interface Contact {
  contactId: string;
  nickName: string;
  tags: string[];
  givenName: string;
  middleName: string;
  familyName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  note: string;
}
