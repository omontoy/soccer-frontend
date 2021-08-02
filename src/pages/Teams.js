
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { apiFootball } from '../utils/apiaxios'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';


export function Teams() {

  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  const history = useHistory()

  const handleLogout = () => {
    sessionStorage.clear()
    history.push('/login')
  }

  const fetchTeams = async() => {
    try {
      const res = await apiFootball({
        method: 'GET',
        url: `/teams/search/argentina`
      }) 
      const response = res.data.api.teams

      setTeams(response.slice(1,30))

    } catch(err) {
      setError(err)
    }
  }
  
  useEffect(() => {
    fetchTeams()
  }, [])

  return (
    <div>
      <Navbar className="d-flex justify-content-end">
        <button
          onClick={handleLogout}
        > Logout
        </button>
      </Navbar>
      <Container className="cardsAlign">
        <Row>
          { !!teams &&
              teams.length > 0 &&
              teams.map( team => {
                const { team_id, name, country, logo } = team
                return (
                  <Col sm="4" key={team_id}>
                    <Card className='teamsCards'>
                      <Card.Img 
                        variant="top" 
                        className="cardImage"
                        src={logo} 
                        style={
                          { borderRadius: "25px", 
                            borderBottomLeftRadius: "0px", 
                            borderBottomRightRadius:"0px" 
                          }}
                        />
                      <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Text>
                          {country}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                )
              })}
        </Row>
      </Container>
    </div> 
  )
}
