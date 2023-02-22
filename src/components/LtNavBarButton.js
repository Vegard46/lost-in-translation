import './lt-navbar.css';

function LtNavBarButton(props) {
  return (
    <div className={"lt-navbar-button"}>
      <button className={props.type}>
        <i className={"fa " + props.icon} aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default LtNavBarButton;