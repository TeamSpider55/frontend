// backend uses different names for two attributes
export interface ContactApiResult extends Contact {
  jobTitle: string;
  organization: string;
}

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
  dateAdded: string;
}

export interface Note {
  time: string;
  content: string;
  contactId: string;
  relatedTo?: string;
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
