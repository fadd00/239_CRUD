const express = require('express');
let mysql = require('mysql');
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
    password: '',
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
