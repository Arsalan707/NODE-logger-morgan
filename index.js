const express = require('express');
const PORT = process.env.PORT || '5555';
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

morgan.token('host', function (req, res) {
  return req.hostname;
});

app.use(
  morgan(
    ':method :host :status :param[id] :res[content-length] - :response-time ms'
  )
);

morgan.token('param', function (req, res, param) {
  return req.params[param];
});

app.get('/', (req, res) => {
  res.json({ method: req.method, message: 'Hello World', ...req.body });
});

app.get('/404', (req, res) => {
  res.sendStatus(404);
});

app.get('/user', (req, res, next) => {
  try {
    throw new Error('Invalid user');
  } catch (error) {
    res.status(500).send('Error!');
  }
});

app.listen(parseInt(PORT, 10), () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
