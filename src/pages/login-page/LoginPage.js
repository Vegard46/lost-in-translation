import './login-page.css';
import LtSubmitWidget from '../../components/LtSubmitWidget';
import { useEffect, useState } from 'react';
import  { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert';

function LoginPage() {

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const alert = useAlert();

  const apiUrl = "https://noroff-api-production-156b.up.railway.app";
  const apiKey = "1XMN2BaYYgxgu1sRhzWU0DydzNroZmnXNbzGNifZjiCINlNYHTKCNXSMrzhIDHTj";

  useEffect(() => {
    if(localStorage.getItem("user")){navigate('nav/translate')}
  });

  const login = () => {

    if(name === ""){alert.error('Name cannot be empty'); return;}
    if(name.length > 15){alert.error('Must be 15 characters or less'); return;}

    fetch(apiUrl + "/translations?username=" + name)
      .then(response => response.json())
      .then(result => {
        if(result[0] !== undefined){
          localStorage.setItem("user", name);
          navigate('nav/translate');
          alert.success('Logged in');
        } else {
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