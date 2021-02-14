
import '../App.css';
import React, { useState } from 'react';
import { soccerServer } from '../utils/apiaxios'
import { useHistory } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';


export function Login() {

  const history = useHistory()

  const [ loginForm, setLoginForm ] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    const { name, value } = e.target

    setLoginForm({
      ...loginForm,
      [name]: value
    })
  }

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const { email, password } = loginForm
      const { data: { token } } = await soccerServer({
        method: 'POST',
        url: '/users/login',
        data: { email, password }
      }) 

      sessionStorage.setItem('token', token)
      history.push('/')
    } 
    catch(err) {
      console.log(err.message)
    } 
  }

  const { email, password } = loginForm

  return (
    <div className="App">
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input 
          type="email"
          id="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />
        <br></br>
        <br></br>
        
        <label htmlFor="password">Password</label>
        <input 
          type="password"
          id="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />
        <br></br>
        <br></br>

        <button type="submit">
          Login
        </button>

        <br />
        <br />
        <LinkContainer to="/register" variant="dark">
          <Button>Register</Button>
        </LinkContainer>
      </form>
    </div>
  )
}
