import './lt-widgets.css';

function LtSubmitWidget() {
  return (
    <div className="lt-submit-widget">
      <input id='submit-input' placeholder='What is your name?'></input>
      <button id='submit-button' type='submit'>
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default LtSubmitWidget;