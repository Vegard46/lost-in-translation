import LtSubmitWidget from '../components/LtSubmitWidget';
import LtImageRow from '../components/LtImageRow';
import hands_images from '../hands_images';
import './translation-page.css';
import { useContext, useEffect, useState } from 'react';
import { TranslationContext } from '../context/TranslationProvider';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

function TranslationPage() {

  const [translation, setTranslation] = useContext(TranslationContext);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const alert = useAlert();

  const legalChars = /^[A-Za-z ]+$/;

  const apiUrl = "https://noroff-api-production-156b.up.railway.app";
  const apiKey = "1XMN2BaYYgxgu1sRhzWU0DydzNroZmnXNbzGNifZjiCINlNYHTKCNXSMrzhIDHTj";

  useEffect(() => {
    if(!localStorage.getItem("user")){navigate('/')}
  })

  const processTranslation = () => {
    if(!translation){alert.error('Cannot be empty');return;}
    if(!legalChars.test(translation)){alert.error('Only english letter characters allowed');return;}
    if(!(translation.length <= 50)){alert.error('Must be less than 50 characters'); return;}

    let words = translation.toLowerCase().trim().split(" ");
    let illegal = false;
    words.forEach(element => {
      if(element === ""){illegal = true;}
    });
    if(illegal){alert.error('Only 1 space between words allowed'); return;}
    fetchImages(words);

    fetch(apiUrl + '/translations?username=' + localStorage.getItem("user"))
    .then(response => response.json())
    .then(user => {

      let transl = user[0].translations;
      transl.unshift(translation)

      fetch(apiUrl + '/translations/' + user[0].id, {
        method: 'PATCH',
        headers: {
          'x-api-key': apiKey, //process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          translations: transl
        })
      })
      .then(response => response.json())
      .then()
      .catch(error => console.error(error));
    })
  }

  function fetchImages(words){
    let wordsImages = [];
    words.map(word => {
      word = word.split("");
      let wordImages = [];
      word.map(letter => {
        return wordImages.push(hands_images[letter]);
      })
      return wordsImages.push(wordImages);
    })
    setImages(wordsImages);
  }


  return (
      <div className="translation-page shadow">
        <LtSubmitWidget text='Translate a phrase...' onClick={processTranslation} onChange={setTranslation} value={translation}/>
        <div className='translation-container'>
            {images.map((e, index) => {
              return index < images.length-1 
              ? <div className='row-container'>
                  <LtImageRow images={e}/>
                  <i className="fa fa-plus image-add" aria-hidden="true"/>
                </div> 
              : <div className='row-container'>
                  <LtImageRow images={e}/>
                </div>
            })}
        </div>
      </div>
  );
}

export default TranslationPage;