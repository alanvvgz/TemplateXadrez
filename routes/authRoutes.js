const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send({ error: 'Dados insuficientes' });
  }

  try {
    if (await User.findOne({ username })) {
      return res.status(400).send({ error: 'Usuário já registrado' });
    }

    const user = await User.create({ username, password });
    user.password = undefined;

    return res.send({ user, token: generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(400).send({ error: 'Falha no registro' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select('+password');

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).send({ error: 'Usuário ou senha inválidos' });
  }

  user.password = undefined;

  res.send({ user, token: generateToken({ id: user.id }) });
});

function generateToken(params = {}) {
  return jwt.sign(params, 'secret', {
    expiresIn: 86400,
  });
}

module.exports = router;
