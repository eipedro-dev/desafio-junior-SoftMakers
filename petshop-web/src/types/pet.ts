export type PetType = 'cat' | 'dog';

export interface Owner {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  zipCode: string;
  street: string;
  number: string;
  city: string;
  state: string;
}

export interface Pet {
  id: string;
  name: string;
  age: number;
  type: PetType;
  breed: string;
  owner: Owner;
}

export type PetInput = Omit<Pet, 'id' | 'owner'> & {
  owner: Omit<Owner, 'id'>;
};