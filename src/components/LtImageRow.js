import './lt-widgets.css';

function LtImageRow(props) {
  return (
    <div className="lt-image-row">
      {props.images.map(e => {
        return <img src={e} alt={e}/>
      })}
    </div>
  );
}

export default LtImageRow;