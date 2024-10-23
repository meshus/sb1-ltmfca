import express from 'express';
import cors from 'cors';
import { Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(cors());
app.use(express.json());

let db: Database;

async function initializeDatabase() {
  db = await open({
    filename: ':memory:',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      avatar TEXT,
      bio TEXT,
      settings TEXT
    );

    CREATE TABLE posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      authorId INTEGER,
      content TEXT,
      wavelength REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      mood TEXT,
      FOREIGN KEY (authorId) REFERENCES users (id)
    );

    CREATE TABLE likes (
      userId INTEGER,
      postId INTEGER,
      FOREIGN KEY (userId) REFERENCES users (id),
      FOREIGN KEY (postId) REFERENCES posts (id),
      PRIMARY KEY (userId, postId)
    );

    CREATE TABLE comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      postId INTEGER,
      authorId INTEGER,
      content TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (postId) REFERENCES posts (id),
      FOREIGN KEY (authorId) REFERENCES users (id)
    );
  `);

  // Add some initial data
  await db.run(`
    INSERT INTO users (username, avatar, settings) VALUES 
    ('Alex Rivers', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100&h=100',
     '{"darkMode":false,"notifications":true,"privacy":"public"}')
  `);
}

// Routes
app.get('/api/posts', async (req, res) => {
  const posts = await db.all(`
    SELECT 
      p.*,
      u.username as author,
      u.avatar,
      COUNT(DISTINCT l.userId) as likes,
      COUNT(DISTINCT c.id) as comments
    FROM posts p
    JOIN users u ON p.authorId = u.id
    LEFT JOIN likes l ON p.id = l.postId
    LEFT JOIN comments c ON p.id = c.postId
    GROUP BY p.id
    ORDER BY p.timestamp DESC
  `);
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { authorId, content, wavelength, mood } = req.body;
  const result = await db.run(
    'INSERT INTO posts (authorId, content, wavelength, mood) VALUES (?, ?, ?, ?)',
    [authorId, content, wavelength, mood]
  );
  res.json({ id: result.lastID });
});

app.post('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  await db.run('INSERT OR IGNORE INTO likes (userId, postId) VALUES (?, ?)', [userId, postId]);
  res.json({ success: true });
});

app.delete('/api/posts/:postId/like', async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  await db.run('DELETE FROM likes WHERE userId = ? AND postId = ?', [userId, postId]);
  res.json({ success: true });
});

app.post('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { authorId, content } = req.body;
  const result = await db.run(
    'INSERT INTO comments (postId, authorId, content) VALUES (?, ?, ?)',
    [postId, authorId, content]
  );
  res.json({ id: result.lastID });
});

app.get('/api/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const comments = await db.all(`
    SELECT c.*, u.username as author, u.avatar
    FROM comments c
    JOIN users u ON c.authorId = u.id
    WHERE c.postId = ?
    ORDER BY c.timestamp DESC
  `, [postId]);
  res.json(comments);
});

initializeDatabase().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});