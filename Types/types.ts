export type DropdownOption = {
  key: string;
  label: string;
}

type Personal = {
  "first_name": string,
  "last_name": string,
  "current_address": string
}

type Guarantor = {
  name: string,
  address: string,
  relation?: RelationShipEnum
}

export type Employer = {
  name: string,
  "start_date": Date,
  "end_date"?: Date,
}

export type FormFields = {
  firstName: string,
  lastName: string,
  personalAddress: string,
  employer: Employer[],
  guarantorName: string,
  guarantorAddress: string,
  relationshipToGuarantor: RelationShipEnum | undefined,
}

export type ReferencesDataObject = {
  personal: Personal,
  employer: Employer[],
  guarantor: Guarantor,
}

export enum RelationShipEnum {
  parent = 'parent',
  sibling = 'sibling',
  employer = 'employer',
  other = 'other'
}

export enum DateModal {
  from = 'from',
  to = 'to'
}