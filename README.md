



Usage of Modals: 


const { User, Profile } = require('./models');

async function createUserProfile() {
  const user = await User.create({
    username: 'johndoe',
    email: 'john.doe@example.com',
    password_hash: 'hashedpassword'
  });

  const profile = await Profile.create({
    user_id: user.user_id,
    first_name: 'John',
    last_name: 'Doe',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    country: 'USA',
    postal_code: '12345'
  });

  return { user, profile };
}