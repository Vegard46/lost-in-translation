import './lt-widgets.css';

function LtImageRow(props) {
  return (
    <div className="lt-image-row shadow">
      {props.images.map(e => {
        return <span className='handsign-letter-container'><span className='handsign-letter'></span><img src={e} alt={e}/></span>
      })}
    </div>
  );
}

export default LtImageRow;