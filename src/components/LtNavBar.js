import { Outlet } from 'react-router-dom';
import './lt-navbar.css';
import LtNavBarButton from './LtNavBarButton';

function LtNavBar() {
  return (
    <div className="lt-navbar">
      <div id="nav">
        <div id='menu-buttons'>
          <LtNavBarButton type='regular left' icon='fa-language'/>
          <LtNavBarButton type='regular right' icon='fa-user'/>
        </div>
        <div id='logout-button'>
          <LtNavBarButton type='cancel single' icon='fa-arrow-right'/>
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

export default LtNavBar;