import './profile-page.css';
import LtDeleteButton from '../components/LtDeleteButton';

function ProfilePage() {

  const listItems = [
    "Hello World",
    "Example translation",
    "How are you doing",
    "1 large coffee, please",
    "Where is that?",
    "Grandmother",
    "Telephone number",
    "I don't understand",
    "Map",
    "Public transport"
  ]

  return (
    <div className="profile-page">
      <h1 id='profile-title'>Recent <span>Translations</span> for Thomas</h1>
      <ul id='translations-list'>
        {listItems.map((e, index) => {
          return index !== 0 
            ? <li key={index} style={{opacity: (100-index*6)/100}}>{e}</li>
            : <li id='first-list-item' key={index} style={{opacity: (100-index*6)/100}}>{e}</li>
        })}
      </ul>
      <LtDeleteButton text='Clear'/>
    </div>
  );
}

export default ProfilePage;