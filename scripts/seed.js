const PocketBase = require('pocketbase/cjs');
const { faker } = require('@faker-js/faker');
const dotenv = require('dotenv');
require('cross-fetch/polyfill');

// load environment variables from .env file
dotenv.config();

const pb = new PocketBase(process.env.POCKET_BASE_URL);

const adminEmail = process.env.POCKET_BASE_ADMIN_EMAIL;
const adminPassword = process.env.POCKET_BASE_ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  console.error('Error: Admin email and password must be set in .env file');
  process.exit(1);
}

pb.autoCancellation(false);

pb.admins
  .authWithPassword(adminEmail, adminPassword)
  .catch((err) => {
    console.error(`Error authenticating admin user: ${err.message}`);
    process.exit(1);
  })
  .then(() => {
    pb.collections.getList(1).then((collection) => {
      if (!collection.items.find((coll) => coll.name === 'usrm_users')) {
        console.log('Creating a new collection!');
        pb.collections
          .create({
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
          })
          .catch((err) => {
            console.error(`Error creating table: ${err.message}`);
            process.exit(1);
          });
      }
    });
  })
  .catch((err) => {
    console.error(`Error creating usrm_users table: ${err.message}`);
    process.exit(1);
  })
  .then(() => {
    console.log('Seeding users!');
    for (let i = 0; i < 10; i++) {
      pb.collection('usrm_users').create({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        email: faker.internet.email(),
        position: faker.name.jobTitle(),
        location: faker.address.city(),
      });
    }
    console.log('Seeded usrm_users table with fake data');
  })
  .catch((err) => {
    console.error(`Error seeding users: ${err.message}`);
    process.exit(1);
  });
