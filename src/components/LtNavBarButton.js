import { Link } from 'react-router-dom';
import './lt-navbar.css';

function LtNavBarButton(props) {
  return (
    <div className={"lt-navbar-button"}>
      <Link className={"nav-link " + props.type + " " + props.class} to={props.url}>
        <i className={"fa " + props.icon} aria-hidden="true"></i>
      </Link>
    </div>
  );
}

export default LtNavBarButton;