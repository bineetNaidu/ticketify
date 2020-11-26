import express from 'express';

const app = express();

app.use(express.json());

app.get('/api/users/currentuser', (req, res) => res.send('Hello World'));

app.listen(3000, () =>
  console.log('>>>> Auth Service Started | PORT: 3000 <<<<'),
);
