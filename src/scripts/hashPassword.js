const bcrypt = require('bcrypt')

async function hashPasswords() {
  const passwords = [
    { email: 'manager@restaurant.com', password: 'manager123' },
    { email: 'client@restaurant.com', password: 'client123' },
    { email: 'marketing@restaurant.com', password: 'marketing123' },
    { email: 'franchise@restaurant.com', password: 'franchise123' }
  ]

  for (const user of passwords) {
    const hash = await bcrypt.hash(user.password, 10)
    console.log(`\n${user.email}`)
    console.log(`Mot de passe: ${user.password}`)
    console.log(`Hash: ${hash}`)
  }
}

hashPasswords()