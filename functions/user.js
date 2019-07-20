const users = require('../models/user')

module.exports.handler = async (event) => {
  const user = JSON.parse(event.body)
  try {
    await users.save(user)

    return {
      statusCode: 201,
      body: JSON.stringify({
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
