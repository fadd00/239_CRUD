const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hallo mo');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Andhika258',
    database: 'mahasigma',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('>:C Error connecting to the database:', err);
        return;
    }
    console.log('you are in >////<');
});

app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('>:C Error fetching mahasiswa data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).json({ error: 'fill it all'});
    }
    db.query('INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)', [nama, nim, kelas, prodi], (err, result) => {
        if (err) {
            console.error('>:C Error inserting mahasiswa data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Data added successfully', id: result.insertId });
    });
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nama, nim, kelas, prodi } = req.body;
    db.query('UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?', [nama, nim, kelas, prodi, id], (err, result) => {
        if (err) {
            console.error('>:C Error updating mahasiswa data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data updated successfully' });
    });
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('>:C Error deleting mahasiswa data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ message: 'Data deleted successfully' });
    });
});