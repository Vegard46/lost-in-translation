import './lt-widgets.css';

function LtSubmitWidget(props) {
  return (
    <div className="lt-submit-widget">
      <input id='submit-input' placeholder={props.text}></input>
      <button id='submit-button' type='submit'>
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default LtSubmitWidget;