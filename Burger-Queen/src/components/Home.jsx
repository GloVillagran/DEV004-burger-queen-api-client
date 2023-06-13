import logo from '../assets/img/burgerQueen.png'
import { Link } from 'react-router-dom'


function Home() {
    return <div className='containerHome'>
      <img className='logoHome' src={logo} /> <br />

      <Link to="/login">
        <button>ADMIN</button>
      </Link><br />
      <Link to="/login">
        <button>WAITER</button>
      </Link><br />
      <Link to="/login">
        <button>CHEF</button>
      </Link><br />

    </div>
    
  }

 export default Home 
