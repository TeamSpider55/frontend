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
  role: string;
  organisation: string;
}

export interface AddContactInput {
  email: string,
  givenName: string,
  familyName: string,
}

export interface UpdateContactInput {
  contactId: string;
  nickName?: string;
  tags?: string[];
  givenName?: string;
  middleName?: string;
  familyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
  note?: string;
  role?: string;
  organisation?: string;
}
