import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import { Login } from './pages/Login'
import Register from './pages/Register'
import { Teams } from './pages/Teams'
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = props => {
  const token = sessionStorage.getItem('token')
  if(!token) return <Redirect to='/login'/>
  return <Route {...props} />
}


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/teams" component={Teams} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
