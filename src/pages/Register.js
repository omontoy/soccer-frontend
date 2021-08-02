import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { soccerServer } from '../utils/apiaxios'
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import swal from 'sweetalert';
import '../App.css';

const Register = () => {
  const [user, setUser] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: ''
  })

  const [error, setError] = useState(null)

  const history = useHistory()

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if(token) {
      history.push('/teams')
      swal("Welcome!!", `${email}`, "success")
    }
  },[])

  const handleRegister = async e => {
    e.preventDefault()

    const { password, confirmPassword } = user
    if( password === confirmPassword ) {
      try {
        const { data: { token} } = await soccerServer({
          method: 'POST',
          url: '/users',
          data: user
        })

        sessionStorage.setItem('token', token)
        history.push('/teams')
      } catch(e) {
          setError(e)
      }
    } else {
      swal("Sorry!!", "Password and Confirm Password fields must be equal", "error")
    }
  }

  const handleChange = ({ target: { name, value } }) => {
    setUser({ 
      ...user, 
      [name]: value 
    }) 
  }

  const { email, password, confirmPassword } = user
  return (
    <div className="register">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="4">
            <Form onSubmit={handleRegister}>
              <h1>Sign Up</h1>
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

              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={confirmPassword}
                  required
                />
              </Form.Group>     

              <button type="submit">
                Register
              </button>

              <br />
              <br />
              <hr />

              <p>Already have an account ?</p>
              <LinkContainer to="/login" variant="info">
                <Button>Login</Button>
              </LinkContainer>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
