import { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TranslationContext } from '../context/TranslationProvider';
import './lt-navbar.css';
import LtNavBarButton from './LtNavBarButton';

function LtNavBar() {

  // Hook for accessing the current page location
  // We use this to be able to set the active-styling on the Navbar button
  // that corresponds to the current location on the page
  const currentLocation = useLocation();

  // Although we do not use the translation value, only the setTranslation function
  // it is required to get both from the context
  // We use the context here to reset the translation on logout
  const [translation, setTranslation] = useContext(TranslationContext);

  // Hook for page navigation
  const navigate = useNavigate();

  // Array of possible page locations
  const urls = ['translate', 'profile'];

  return (
    <div className="lt-navbar">
      <div id="nav">
        <div id='menu-buttons'>
          <LtNavBarButton class={currentLocation.pathname.split('/nav/')[1] === urls[0] ? 'active' : ''} type='regular left' icon='fa-comment' url={urls[0]}/>
          <LtNavBarButton class={currentLocation.pathname.split('/nav/')[1] === urls[1] ? 'active' : ''} type='regular right' icon='fa-user' url={urls[1]}/>
        </div>
        <div className='lt-navbar-button' id='logout-button'>
          <button className='cancel single nav-link' onClick={() => {localStorage.removeItem("user"); setTranslation(""); navigate('/');}}>
            <i className={"fa fa-arrow-right"} aria-hidden="true"></i>
            </button>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default LtNavBar;