import './profile-page.css';
import LtDeleteButton from '../../components/LtDeleteButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function ProfilePage() {

  // State holding the history of translations to display
  const [translations, setTranslations] = useState([]);

  // Hooks used for page navigation and alert-box instantiation
  const navigate = useNavigate();
  const alert = useAlert();

  // The public API URL for the JSON server hosted on Railway
  const apiUrl = "https://noroff-api-production-156b.up.railway.app";
  const apiKey = "1XMN2BaYYgxgu1sRhzWU0DydzNroZmnXNbzGNifZjiCINlNYHTKCNXSMrzhIDHTj";

  // Effect that initiates fetching of translation history for the given user
  // the empty [] dependency ensures this only happens on initial component mount
  useEffect(() => {
    fetchTranslations();
  }, []);

  // Effect called on every update that will redirect to the Login page
  // if no active login session is found. Since there is no real login session
  // functionality in the backend we just utilize the local storage
  useEffect(() => {
    if(!localStorage.getItem("user")){navigate('/')}
  })

  /**
   * Method that fetches the translation history of a given user
   * and limits the list to latest 10 to display
   */
  function fetchTranslations(){
    fetch(apiUrl + "/translations?username=" + localStorage.getItem("user"))
    .then(response => response.json())
    .then(user => {
      fetch(apiUrl + "/translations/" + user[0].id)
      .then(response => response.json())
      .then(result => {
        let transl = result.translations;
        // Limits the history to latest 10 entries
        transl.length = transl.length > 10 ? 10 : transl.length;
        setTranslations(transl)
      })
      .catch(error => console.error(error));
    })
  }

  /**
   * Handles what happens when the user clicks the "clear" button.
   * Attempts top clear history from the database if a history exists.
   * Before it is cleared, user is presented with a confirmation prompt to ensure they
   * are making the right decision
   * @returns nothing
   */
  const handleClearTranslations = () => {
    
    // Returns if no history exists for the given user
    if(translations.length === 0){alert.show("No recent translations exist");return;}

    // Instantiates a confirm prompt, user clicks yes initiates clearing the history,
    // user clicks no aborts the action with appropriate message
    confirmAlert({
      title: 'Confirm Clear History',
      message: 'Are you sure?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => clearTranslations()
        },
        {
          label: 'No',
          onClick: () => alert.error("cancelled")
        }
      ]
    });
  }

  /**
   * Attempts to clear the translation history for the given user
   * It clears it by simply PATCHING the user in the database by setting their
   * recorded translations array to be empty []
   */
  function clearTranslations() {
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
      .then(result => {
        // We also set the local translations to empty[] on success to rerender the UI
        setTranslations([]);
        alert.success("History cleared");
      })
      .catch(error => console.error(error));
    })
  }

  return (
    <div className="profile-page">
      <h1 id='profile-title'>Recent translations for <span>{localStorage.getItem("user")}</span></h1>
      <ul id='translations-list'>
        {/* Although some accessibility points are deducted because of this,
            I thought it was a bit cool to gradually decrease the opacity a bit
            on each list item to symbolize that the higher the opacity
            the more recent the translation in the list was made */}
        {translations.map((e, index) => {
          return index !== 0 
            ? <li key={index} style={{opacity: (100-index*6)/100}}>{e}</li>
            : <li id='first-list-item' key={index} style={{opacity: (100-index*6)/100}}>{e}</li>
        })}
      </ul>
      <LtDeleteButton text='Clear' onClick={handleClearTranslations}/>
    </div>
  );
}

export default ProfilePage;