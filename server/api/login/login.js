const login = (username, password) => {
  if(username === 'fail@fail.com') {
    throw new Error('Invalid username')
  } else {
    return {
      access_token: 'sadfgkjhebn',
      expires_in: 6500,
    }
  }
}

export default login
