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

export const USER_EXAMPLE: PocketBaseUser = {
  id: 'my-id',
  collectionId: 'my-collection-id',
  collectionName: 'my-collection',
  created: new Date().toLocaleDateString(),
  updated: new Date().toLocaleDateString(),
  name: 'John',
  surname: 'Doe',
  email: 'test@test.com',
  position: 'Testing Manager',
  location: 'remote',
};
