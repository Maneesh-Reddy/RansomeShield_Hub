import express from 'express';
import { Database } from 'sqlite3';
import { open } from 'sqlite';

const app = express();
app.use(express.json());

let db: Database;

async function initDb() {
  db = await open({
    filename: ':memory:',
    driver: Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS checklist (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS alerts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      severity TEXT NOT NULL,
      timestamp INTEGER NOT NULL
    );
  `);
}

// Checklist endpoints
app.get('/api/checklist', async (req, res) => {
  const items = await db.all('SELECT * FROM checklist');
  res.json(items);
});

app.post('/api/checklist', async (req, res) => {
  const { title } = req.body;
  const id = Date.now().toString();
  await db.run('INSERT INTO checklist (id, title) VALUES (?, ?)', [id, title]);
  const item = await db.get('SELECT * FROM checklist WHERE id = ?', id);
  res.json(item);
});

app.patch('/api/checklist/:id/toggle', async (req, res) => {
  const { id } = req.params;
  await db.run(
    'UPDATE checklist SET completed = NOT completed WHERE id = ?',
    id
  );
  const item = await db.get('SELECT * FROM checklist WHERE id = ?', id);
  res.json(item);
});

// Alerts endpoints
app.get('/api/alerts', async (req, res) => {
  const alerts = await db.all('SELECT * FROM alerts ORDER BY timestamp DESC');
  res.json(alerts);
});

app.post('/api/alerts', async (req, res) => {
  const { title, severity } = req.body;
  const id = Date.now().toString();
  const timestamp = Date.now();
  await db.run(
    'INSERT INTO alerts (id, title, severity, timestamp) VALUES (?, ?, ?, ?)',
    [id, title, severity, timestamp]
  );
  const alert = await db.get('SELECT * FROM alerts WHERE id = ?', id);
  res.json(alert);
});

app.delete('/api/alerts', async (req, res) => {
  await db.run('DELETE FROM alerts');
  res.json({ success: true });
});

initDb().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});