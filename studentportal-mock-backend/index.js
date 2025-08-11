const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 7070;

// In-memory users for demo
const users = [
  { userCode: 'admin', userPassword: 'admin123', name: 'Admin User', id: 1 },
  { userCode: 'test', userPassword: '1234', name: 'Test User', id: 2 }
];

// In-memory student list
let students = [
  { id: 1, name: 'Alice', roll: 'S001' },
  { id: 2, name: 'Bob', roll: 'S002' }
];
let nextStudentId = 3;

app.post('/login', (req, res) => {
  const { userCode, userPassword } = req.body || {};
  const found = users.find(u => u.userCode === userCode && u.userPassword === userPassword);
  if (found) {
    return res.json({
      status: 200,
      responseInfo: {
        userCode: found.userCode,
        name: found.name,
        id: found.id
      }
    });
  } else {
    return res.json({
      status: '404',
      message: 'User code or password not match'
    });
  }
});

app.get('/studentList', (req, res) => {
  res.json({ status: 200, responseInfo: students });
});

app.post('/saveStudent', (req, res) => {
  const s = req.body;
  if (!s || !s.name) {
    return res.status(400).json({ status: '400', message: 'Invalid student data' });
  }
  s.id = nextStudentId++;
  students.push(s);
  res.json({ status: 200, responseInfo: s });
});

app.get('/delete', (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) return res.status(400).json({ status: '400', message: 'Missing id' });
  const idx = students.findIndex(st => st.id === id);
  if (idx === -1) return res.json({ status: '404', message: 'Not found' });
  const removed = students.splice(idx,1)[0];
  res.json({ status: 200, responseInfo: removed });
});

app.listen(PORT, () => {
  console.log(`Mock backend listening on http://localhost:${PORT}`);
});
