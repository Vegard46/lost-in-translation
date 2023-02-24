import './lt-widgets.css';

// General component for a single image-row widget
function LtImageRow(props) {
  return (
    <div className="lt-image-row shadow">
      {props.images.map((e, index) => {
        return  <span className='handsign-letter-container' key={index}>
                  {/* Letter of the handsign, which is conditionally displayed based on toggle value
                      received from parent component */}
                  <span className={'handsign-letter shadow ' + (!props.visible ? 'invisible' : '')}>
                    {e.letter.toUpperCase()}
                  </span>
                  <img src={e.image} alt={e.letter}/>
                </span>
      })}
    </div>
  );
}

export default LtImageRow;