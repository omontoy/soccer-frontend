import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { soccerServer } from '../utils/apiaxios'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';


const Register = () => {
  const [user, setUser] = useState({ email: '', password: '' })
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const { data: { token} } = await soccerServer({
        method: 'POST',
        url: '/users',
        data: user
      })

      sessionStorage.setItem('token', token)
      history.push('/')
    } catch(e) {
      console.log(e);
    }
  }

  const handleChage = ({ target: { name, value } }) => {
    setUser({ 
      ...user, 
      [name]: value 
    }) 
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          name="email"
          onChange={handleChage}
          value={user.email}
          required
        />
        <br></br>
        <br></br>
        
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          name="password"
          onChange={handleChage}
          value={user.password}
          required
        />
        <br></br>
        <br></br>

        <button type="submit">
          Register
        </button>

        <br />
        <br />

        <LinkContainer to="/login" variant="info">
          <Button>Login</Button>
        </LinkContainer>
      </form>
    </div>
  )
}

export default Register