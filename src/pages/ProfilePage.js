import './profile-page.css';
import LtDeleteButton from '../components/LtDeleteButton';
import { useEffect, useState } from 'react';

function ProfilePage() {

  const [translations, setTranslations] = useState([]);

  const apiUrl = "https://noroff-api-production-156b.up.railway.app";

  useEffect(() => {
    fetchTranslations();
  }, []);

  function fetchTranslations(){
    fetch(apiUrl + "/translations")
      .then(response => response.json())
      .then(result => {
        let transl = result[0].translations;
        transl.length = transl.length > 10 ? 10 : transl.length;
        setTranslations(transl)
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="profile-page">
      <h1 id='profile-title'>Recent <span>Translations</span> for Thomas</h1>
      <ul id='translations-list'>
        {translations.map((e, index) => {
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