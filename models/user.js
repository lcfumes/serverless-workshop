const mariadb = require('mariadb')

module.exports.save = async user => {
  let connection
  let mariadbPool

  try {
    mariadbPool = mariadb.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'slsworkshop',
      connectionLimit: 5
    })
    connection = await mariadbPool.getConnection()
    const query = `
      INSERT INTO users 
        (name, email, phone)
      VALUES
        ('${user.name}', '${user.email}', '${user.phone}')`
    return await connection.query(query)
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    if (mariadbPool) {
      await mariadbPool.end()
    }
    if (connection) {
      await connection.end()
    }
  }
}