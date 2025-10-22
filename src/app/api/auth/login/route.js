import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    console.log('Login attempt for:', email)
    console.log('Entered password:', password)

    // 1️⃣ Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      password: process.env.DB_PASSWORD || ''
    })

    // 2️⃣ Query user by email
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email])
    await connection.end()

    if (rows.length === 0) {
      console.log('No user found for email:', email)
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    const user = rows[0]
    console.log('Hash from DB:', user.password)

    // 3️⃣ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password)
    console.log('Password match:', isMatch)

    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      )
    }

    // 4️⃣ Set cookie with user info
    const response = NextResponse.json({
      success: true,
      message: 'Connecté avec succès',
      user: {
        email: user.email,
        role_nom: user.role_nom,
        prenom: user.prenom,
        nom: user.nom
      }
    })

    response.cookies.set(
      'user',
      JSON.stringify({
        email: user.email,
        role_nom: user.role_nom,
        prenom: user.prenom,
        nom: user.nom
      }),
      { path: '/' }
    )

    console.log('Login successful for:', email)
    return response
  } catch (err) {
    console.error('Server error during login:', err)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
