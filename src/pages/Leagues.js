
import { useState, useEffect } from 'react'
import { apiFootball } from '../utils/apiaxios'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


export function Leagues() {

  const [leagues, setLeagues] = useState([])


  useEffect(() => {
    fetchLeagues()
  }, [])

  const fetchLeagues = async() => {
    try {
      const res = await apiFootball({
        method: 'GET',
        url: '/leagues'
      }) 
      const response = res.data.api.leagues
      setLeagues(response.slice(0, 99))

    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <Container>
      <Row>
        { !!leagues &&
            leagues.length > 0 &&
            leagues.map( league => {
              const { league_id, name, country, logo } = league
              return (
                <Col sm="3">
                  <Card style={{ width: '18rem' }} key={league_id}>
                    <Card.Img 
                      variant="top" 
                      src={logo} 
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
  )
}

//https://api-football-v1.p.rapidapi.com/v2/leagues/country/argentina