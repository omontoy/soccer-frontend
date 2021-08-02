import React, { useState } from 'react';
import { soccerServer } from '../utils/apiaxios'
import { useHistory } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import swal from 'sweetalert';
import '../App.css';

export function Login() {

  const history = useHistory()

  const [ loginForm, setLoginForm ] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState(null)
  

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
      history.push('/teams')
      swal("Welcome!!",`${ email }`,"success")
    } 
    catch(err) {
      setError(err)
    } 
  }

  const { email, password } = loginForm

  return (
    <div className="login">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="4">
            <Form onSubmit={handleLogin}>
              <h1>Sign In</h1>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={email}
                  required
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={password}
                  required
                />
              </Form.Group>

              <button type="submit">
                Login
              </button>

              <br />
              <br />
              <hr></hr>

              <p>Don't you have an account ?</p>
              <LinkContainer to="/register" variant="info">
                <Button>Register</Button>
              </LinkContainer>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
