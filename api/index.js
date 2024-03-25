const express = require('express');
const { sql } = require('@vercel/postgres')

const app = express();
app.use(express.json({ extended: true }))

sql.connect().then(() => {
  app.listen(3000, () => { })
})

app.get('/', (req, res) => res.send('Vercel Express Postgres CRUD example'))

app.get('/users', async (req, res) => {

  const page = req.params.page ?? 1
  const size = req.params.size ?? 10
  const offset = (page - 1) * size

  const result = await sql`SELECT * FROM users ORDER BY id desc OFFSET ${offset} LIMIT ${size}`

  res.json({
    success: true,
    data: result.rows,
  })
})

app.get('/user/:userId', async (req, res) => {

  const result = await sql`SELECT * FROM users WHERE id = ${req.params.userId} LIMIT 1`

  res.json({
    success: true,
    data: result.rows[0],
  })
})

app.post('/user', async (req, res) => {
  const result = await sql`INSERT INTO users(name, email) VALUES(${req.body.name}, ${req.body.email}) RETURNING *`

  res.json({
    success: true,
    data: result.rows[0],
  })
})

app.patch('/user/:userId', async (req, res) => {

  const selectResult = await sql`SELECT * FROM users WHERE id = ${req.params.userId} LIMIT 1`
  const user = selectResult.rows[0]

  const name = user.name === req.body.name ? req.body.name : req.body.name
  const email = user.email === req.body.email ? req.body.email : req.body.email 

  const updateResult = await sql`UPDATE users SET name = ${name}, email = ${email} WHERE id = ${req.params.userId} RETURNING *`

  res.json({
    success: true,
    data: updateResult.rows[0]
  })
})

app.delete('/user/:userId', async (req, res) => {

  await sql`DELETE FROM users WHERE id = ${req.params.userId}`

  res.json({
    success: true,
  })
})

module.exports = app