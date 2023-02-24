import './login-page.css';
import LtSubmitWidget from '../../components/LtSubmitWidget';
import { useEffect, useState } from 'react';
import  { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert';

function LoginPage() {

  // State holding the name being inputted by the user
  const [name, setName] = useState("");

  // Hooks for page navigation and alert-box instatiation
  const navigate = useNavigate();
  const alert = useAlert();

  // Public API URL for the JSON server being hosted on Railway
  const apiUrl = "https://noroff-api-production-156b.up.railway.app";
  const apiKey = "1XMN2BaYYgxgu1sRhzWU0DydzNroZmnXNbzGNifZjiCINlNYHTKCNXSMrzhIDHTj";

  // Effect called on every update that will redirect to the Login page
  // if no active login session is found. Since there is no real login session
  // functionality in the backend we just utilize the local storage
  useEffect(() => {
    if(localStorage.getItem("user")){navigate('nav/translate')}
  });

  /**
   * Function for either logging in or creating a new user
   * if the name does not already exist in the database
   * @returns Nothing
   */
  const login = () => {

    // Returns if the input field is empty
    if(name === ""){alert.error('Name cannot be empty'); return;}
    
    // Returns if the name exceeds the character limit of 15
    if(name.length > 15){alert.error('Must be 15 characters or less'); return;}

    fetch(apiUrl + "/translations?username=" + name)
      .then(response => response.json())
      .then(result => {
        if(result[0] !== undefined){
          // We end up here if the user already exists at which point
          // we log the user in by storing it in local storage
          // and redirecting to the translation page
          localStorage.setItem("user", name);
          navigate('nav/translate');
          alert.success('Logged in');
        } else {
          // We end up here if the user does not already exist at which point
          // we send a POST request to create a new user in the database
          fetch(apiUrl + "/translations", {
            method: 'POST',
            headers: {
              'x-api-Key': apiKey,//process.env.REACT_APP_API_KEY,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: name, 
                translations: [] 
            })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Could not create new user')
            }
            return response.json()
          })
          .then(newUser => {
            // If user creation is successful, we log the user in and store it in local storage
            localStorage.setItem("user", name);
            navigate('nav/translate');
            alert.success('User registered with name: ' + newUser.username);
          })
          .catch(error => {
          })
          }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className="login-page">
      <div className='image-container'>
        <img src={require('./logotrans.png')} alt='lost_in_translation'/>
      </div>
      <div className='submit-container'>
        <LtSubmitWidget class='shadow' text='What is your name?' onClick={login} onChange={setName} value={name}/>
      </div>
    </div>
  );
}

export default LoginPage;