const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

const users = [
  { email: 'manager@restaurant.com', password: 'manager123' },
  { email: 'client@restaurant.com', password: 'client123' },
  { email: 'marketing@restaurant.com', password: 'marketing123' },
  { email: 'franchise@restaurant.com', password: 'franchise123' },
];

async function updatePasswords() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'restaurant_analytics',
  });

  for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    await connection.execute(
      'UPDATE users SET password = ? WHERE email = ?',
      [hash, user.email]
    );
    console.log(`Updated password for ${user.email}`);
  }

  await connection.end();
  console.log('All passwords updated!');
}

updatePasswords().catch(console.error);
