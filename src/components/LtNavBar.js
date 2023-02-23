import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './lt-navbar.css';
import LtNavBarButton from './LtNavBarButton';

function LtNavBar() {

  const currentLocation = useLocation();
  const navigate = useNavigate();

  const urls = ['translate', 'profile'];

  return (
    <div className="lt-navbar">
      <div id="nav">
        <div id='menu-buttons'>
          <LtNavBarButton class={currentLocation.pathname.split('/nav/')[1] === urls[0] ? 'active' : ''} type='regular left' icon='fa-language' url={urls[0]}/>
          <LtNavBarButton class={currentLocation.pathname.split('/nav/')[1] === urls[1] ? 'active' : ''} type='regular right' icon='fa-user' url={urls[1]}/>
        </div>
        <div className='lt-navbar-button' id='logout-button'>
          <button className='cancel single nav-link' onClick={() => {localStorage.removeItem("user"); navigate('/');}}>
            <i className={"fa fa-arrow-right"} aria-hidden="true"></i>
            </button>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default LtNavBar;