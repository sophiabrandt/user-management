export interface User {
  name: string;
  surname: string;
  email: string;
  position: string;
  location: string;
}

export type PocketBaseUser = User & {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

export const USER_EXAMPLE: User = {
  name: 'John',
  surname: 'Doe',
  email: 'test@test.com',
  position: 'Testing Manager',
  location: 'remote',
};
