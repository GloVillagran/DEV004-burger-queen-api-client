import logo from '../assets/img/2.png'
import { Link } from 'react-router-dom'


function Home() {
    return <div className='containerHome'>
      <img className='logoHome' src={logo} /> <br />

      <Link to="/login">
        <button>Admin</button>
      </Link><br />
      <Link to="/login">
        <button>Waiter</button>
      </Link><br />
      <Link to="/login">
        <button>Chef</button>
      </Link><br />

    </div>
    
  }

 export default Home 
