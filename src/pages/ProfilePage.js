import './profile-page.css';
import LtDeleteButton from '../components/LtDeleteButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {

  const [translations, setTranslations] = useState([]);
  const navigate = useNavigate();

  const apiUrl = "https://noroff-api-production-156b.up.railway.app";
  const apiKey = "1XMN2BaYYgxgu1sRhzWU0DydzNroZmnXNbzGNifZjiCINlNYHTKCNXSMrzhIDHTj";

  useEffect(() => {
    fetchTranslations();
  }, []);

  useEffect(() => {
    if(!localStorage.getItem("user")){navigate('/')}
  })

  function fetchTranslations(){
    fetch(apiUrl + "/translations?username=" + localStorage.getItem("user"))
    .then(response => response.json())
    .then(user => {
      fetch(apiUrl + "/translations/" + user[0].id)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        let transl = result.translations;
        transl.length = transl.length > 10 ? 10 : transl.length;
        setTranslations(transl)
      })
      .catch(error => console.error(error));
    })
  }

  const clearTranslations = () => {
    if(!translations){return;}
    fetch(apiUrl + '/translations?username=' + localStorage.getItem("user"))
    .then(response => response.json())
    .then(user => {
      fetch(apiUrl + '/translations/' + user[0].id, {
        method: 'PATCH',
        headers: {
          'x-api-key': apiKey, //process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          translations: []
        })
      })
      .then(response => response.json())
      .then(result => setTranslations([]))
      .catch(error => console.error(error));
    })
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
      <LtDeleteButton text='Clear' onClick={clearTranslations}/>
    </div>
  );
}

export default ProfilePage;