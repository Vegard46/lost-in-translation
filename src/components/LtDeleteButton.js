import './lt-widgets.css';

function LtDeleteButton(props) {
  return (
    <div className="lt-delete-button">
      <button>
        {props.text + "  "}
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default LtDeleteButton;