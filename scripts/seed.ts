import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
import { createRequire } from 'node:module';
import PocketBase from 'pocketbase';

const clsRequire = createRequire(import.meta.url);
clsRequire('cross-fetch/polyfill');

dotenv.config();

const pb = new PocketBase(process.env.POCKET_BASE_URL);

const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  console.error('Error: Admin email and password must be set in .env file');
  process.exit(1);
}

pb.autoCancellation(false);

const checkCollection = async (): Promise<void> => {
  try {
    const collectionList = await pb.collections.getList(1);
    const collectionExists = collectionList.items.find(
      (coll) => coll.name === 'usrm_users'
    );
    if (!collectionExists) {
      console.log('Creating a new collection!');
      await pb.collections.create({
        name: 'usrm_users',
        type: 'base',
        schema: [
          { name: 'name', type: 'text' },
          { name: 'surname', type: 'text' },
          { name: 'email', type: 'text', unique: true, required: true },
          { name: 'position', type: 'text' },
          { name: 'location', type: 'text' },
        ],
        listRule: '',
      });
    }
  } catch (err) {
    console.error(`Error creating table: ${err.message}`);
    process.exit(1);
  }
};

pb.admins
  .authWithPassword(adminEmail, adminPassword)
  .catch((err) => {
    console.error(`Error authenticating admin user: ${err.message}`);
    process.exit(1);
  })
  .then(checkCollection)
  .then(() => {
    console.log('Seeding users!');
    const userPromises = [];
    for (let i = 0; i < 10; i++) {
      userPromises.push(
        pb.collection('usrm_users').create({
          name: faker.name.firstName(),
          surname: faker.name.lastName(),
          email: faker.internet.email(),
          position: faker.name.jobTitle(),
          location: faker.address.city(),
        })
      );
    }
    return Promise.all(userPromises);
  })
  .then(() => {
    console.log('Seeded usrm_users table with fake data');
  })
  .catch((err) => {
    console.error(`Error seeding users: ${err.message}`);
    process.exit(1);
  });
