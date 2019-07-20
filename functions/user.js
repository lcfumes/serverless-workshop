const users = require('../models/user')

module.exports.handler = async (event) => {
  const user = JSON.parse(event.body)
  try {
    const insert = await users.save(user)

    return {
      statusCode: 201,
      body: JSON.stringify({
        id: insert.insertId,
        ...user
      })
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500
    }
  }
}
