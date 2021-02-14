
import '../App.css';
import { useHistory } from "react-router-dom";


function Home() {
  const history = useHistory()

  const handleLogout = () => {
    sessionStorage.clear()
    history.push('/login')
  }

  return (
    <div className="App">
      <h1>Home</h1>
      <button
        onClick={handleLogout}
      > Logout
      </button>
    </div>
  )
}

export default Home