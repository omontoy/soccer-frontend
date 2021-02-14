import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Box, Button } from '@material-ui/core';

const Register = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.post('http://localhost:8000/users', user)

      sessionStorage.setItem('token', res.token)
      history.push('/')
    } catch(e) {
      console.log(e);
    }
  }

  const handleChage = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value }) 
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box 
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          name="email"
          onChange={handleChage}
          value={user.email}
          required
        />

        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          name="password"
          onChange={handleChage}
          value={user.password}
          required
        />

        <Button variant="contained" color="primary" type="submit">
          Primary
        </Button>
      </Box>
    </form>
  )
}

export default Register
