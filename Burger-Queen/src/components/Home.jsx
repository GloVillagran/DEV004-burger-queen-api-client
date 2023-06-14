import logo from '../assets/img/2.png'
import { Link } from 'react-router-dom'


function Home() {
    return <div className='containerHome'>
      <div className='logoHome'>
      <img className='logoHome' src={logo} /> <br />
      </div>
      <div className='buttonHome'>
      <Link to="/login">
        <button className='buttonAdmin'>ADMIN</button>
      </Link><br />
      <Link to="/login">
        <button className='buttonAdmin'>WAITER</button>
      </Link><br />
      <Link to="/login">
        <button className='buttonAdmin'>CHEF</button>
      </Link><br />
      </div>
    </div>
    
  }

 export default Home 
