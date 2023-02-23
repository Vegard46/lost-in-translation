import './lt-widgets.css';

function LtSubmitWidget(props) {

  return (
    <div className={"lt-submit-widget " + props.class} >
      <input id='submit-input' placeholder={props.text} value={props.value} onChange={e => props.onChange(e.target.value)}></input>
      <button id='submit-button' type='submit' onClick={props.onClick}>
        <i className="fa fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default LtSubmitWidget;