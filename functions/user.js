'use strict';

const axios = require('axios')

module.exports.handler = async (event) => {
  const {
    GITHUB_API
  } = process.env
  const user = event.pathParameters.user

  try {
    const userInfo = await axios.get(`${GITHUB_API}/users/${user}`)

    const repositories = await axios.get(`${GITHUB_API}/usersa/${user}/repos`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        user: userInfo.data,
        repositories: repositories.data
      })
    }
  } catch (error) {

    console.error(error)

    if (error.isAxiosError) {
      return {
        statusCode: 404,
        body: JSON.stringify(error)
      }
    }
    return {
      statusCode: 500
    }
  }
}
