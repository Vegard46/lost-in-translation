import './lt-widgets.css';

function LtImageRow(props) {
  return (
    <div className="lt-image-row shadow">
      {props.images.map((e, index) => {
        return  <span className='handsign-letter-container' key={index}>
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