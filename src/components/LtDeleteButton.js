import './lt-widgets.css';

// General component for delete/negative-action button
function LtDeleteButton(props) {
  return (
    <div className="lt-delete-button">
      <button onClick={props.onClick}>
        {props.text + "  "}
        <i className="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default LtDeleteButton;