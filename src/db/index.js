import { SQLocal } from 'sqlocal';

const { sql } = new SQLocal('managerbills.sqlite3');

export const initDb = async () => {
  await sql`PRAGMA foreign_keys = ON;`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Admin'
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS preferences (
      user_id INTEGER PRIMARY KEY,
      theme TEXT NOT NULL DEFAULT 'dark',
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
};

export const getUsers = async () => {
  return await sql`SELECT * FROM users;`;
};

export const createUser = async (name, role = 'Admin') => {
  const existing = await sql`SELECT id FROM users WHERE name = ${name};`;
  if (existing.length > 0) {
    throw new Error('El nombre de usuario ya existe');
  }
  const result = await sql`
    INSERT INTO users (name, role) VALUES (${name}, ${role}) RETURNING *;
  `;
  const user = result[0];
  if (user) {
    await sql`
      INSERT INTO preferences (user_id, theme) VALUES (${user.id}, 'dark');
    `;
  }
  return user;
};

export const deleteUser = async (id) => {
  await sql`DELETE FROM users WHERE id = ${id};`;
};

export const getUserTheme = async (userId) => {
  const result = await sql`SELECT theme FROM preferences WHERE user_id = ${userId};`;
  return result[0]?.theme || 'dark';
};

export const updateUserTheme = async (userId, theme) => {
  await sql`
    UPDATE preferences SET theme = ${theme} WHERE user_id = ${userId};
  `;
};
