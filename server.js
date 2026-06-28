import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({ limit: '20mb' })); // Support base64 uploads

const DB_FILE = path.join(process.cwd(), 'database.json');

// Initialize database.json if not present
if (!fs.existsSync(DB_FILE)) {
  const initialDb = {
    complaints: [],
    docRequests: [],
    fundsData: {
      Infrastructure: { allocated: 85, spent: 68 },
      WaterSupply: { allocated: 45, spent: 41 },
      Education: { allocated: 30, spent: 22 },
      SocialWelfare: { allocated: 25, spent: 18 },
      Agriculture: { allocated: 35, spent: 30 }
    },
    announcements: []
  };
  fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
}

const readDb = () => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    if (!data.profiles) data.profiles = {};
    return data;
  } catch (err) {
    console.error("Error reading database:", err);
    return { complaints: [], docRequests: [], fundsData: {}, announcements: [], profiles: {} };
  }
};

const writeDb = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing database:", err);
  }
};

// REST API routes
app.get('/api/data', (req, res) => {
  res.json(readDb());
});

app.get('/api/profiles/:username', (req, res) => {
  const { username } = req.params;
  const db = readDb();
  if (db.profiles && db.profiles[username]) {
    res.json(db.profiles[username]);
  } else {
    res.status(404).json({ error: 'Profile not found' });
  }
});

app.post('/api/profiles', (req, res) => {
  const { username, profile } = req.body;
  const db = readDb();
  if (!db.profiles) {
    db.profiles = {};
  }
  db.profiles[username] = profile;
  writeDb(db);
  res.json({ success: true, profile });
});

app.post('/api/complaints', (req, res) => {
  const db = readDb();
  const newComplaint = {
    id: db.complaints.length + 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  db.complaints.unshift(newComplaint);
  writeDb(db);
  res.status(201).json(newComplaint);
});

app.post('/api/complaints/resolve', (req, res) => {
  const { id } = req.body;
  const db = readDb();
  db.complaints = db.complaints.map(c => c.id === id ? { ...c, status: 'Resolved' } : c);
  writeDb(db);
  res.json({ success: true });
});

app.post('/api/doc-requests', (req, res) => {
  const db = readDb();
  const newRequest = {
    id: db.docRequests.length + 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  db.docRequests.unshift(newRequest);
  writeDb(db);
  res.status(201).json(newRequest);
});

app.post('/api/doc-requests/action', (req, res) => {
  const { id, status } = req.body;
  const db = readDb();
  db.docRequests = db.docRequests.map(r => r.id === id ? { ...r, status } : r);
  writeDb(db);
  res.json({ success: true });
});

app.post('/api/funds', (req, res) => {
  const { sector, allocated } = req.body;
  const db = readDb();
  if (db.fundsData[sector]) {
    db.fundsData[sector].allocated = allocated;
    writeDb(db);
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Sector not found' });
  }
});

app.get('/api/funds/releases', (req, res) => {
  const db = readDb();
  res.json(db.fundReleases || []);
});

app.post('/api/funds/release', (req, res) => {
  const db = readDb();
  if (!db.fundReleases) {
    db.fundReleases = [];
  }
  const newRelease = {
    id: db.fundReleases.length + 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  db.fundReleases.unshift(newRelease);

  const { sector, amount } = req.body;
  if (db.fundsData[sector]) {
    db.fundsData[sector].spent = (db.fundsData[sector].spent || 0) + parseFloat(amount);
  }
  writeDb(db);
  res.status(201).json(newRelease);
});


app.post('/api/announcements', (req, res) => {
  const db = readDb();
  const newAnn = {
    id: db.announcements.length + 1,
    ...req.body,
    date: new Date().toISOString().split('T')[0]
  };
  db.announcements.unshift(newAnn);
  writeDb(db);
  res.status(201).json(newAnn);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
