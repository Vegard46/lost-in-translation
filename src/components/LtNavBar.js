import { Outlet } from 'react-router-dom';
import './lt-navbar.css';

function LtNavBar() {
  return (
    <div className="lt-navbar">
      LtNavBar
      <Outlet/>
    </div>
  );
}

export default LtNavBar;