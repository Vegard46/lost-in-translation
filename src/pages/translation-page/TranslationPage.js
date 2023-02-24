import LtSubmitWidget from '../../components/LtSubmitWidget';
import LtImageRow from '../../components/LtImageRow';
import hands_images from '../../hands_images';
import './translation-page.css';
import '../../components/lt-widgets.css';
import { useContext, useEffect, useState } from 'react';
import { TranslationContext } from '../../context/TranslationProvider';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

function TranslationPage() {

  // Global context of the translation input provided by the user
  const [translation, setTranslation] = useContext(TranslationContext);

  // State that holds the image links and names extracted based on the translation
  const [images, setImages] = useState([]);

  // Boolean state that is used to control the toggle functionality
  const [visible, setVisible] = useState(false);

  // Hooks for page navigation and alert-box instantiation
  const navigate = useNavigate();
  const alert = useAlert();

  // RegEx that only allows english letter characters and spaces
  // Used to sanitize input
  const legalChars = /^[A-Za-z ]+$/;

  // The public APU URL of the Json server hosted on Railway
  const apiUrl = "https://noroff-api-production-156b.up.railway.app";
  const apiKey = "1XMN2BaYYgxgu1sRhzWU0DydzNroZmnXNbzGNifZjiCINlNYHTKCNXSMrzhIDHTj";

  // Effect called on every update that will redirect to the Login page
  // if no active login session is found. Since there is no real login session
  // functionality in the backend we just utilize the local storage
  useEffect(() => {
    if(!localStorage.getItem("user")){navigate('/')}
  })

  /**
   * Triggers when user wants to submit a phrase for translation
   * Either shows appropriate alerts on faulty input or displays translated images
   * and stores the phrase in the database
   * @returns Nothing
   */
  const handleTranslation = () => {

    // Return if empty input
    if(!translation){alert.error('Cannot be empty');return;}

    // Return if illegal character found
    if(!legalChars.test(translation)){alert.error('Only english letter characters allowed');return;}

    // Return if input-limit of 50 exceeded
    if(!(translation.length <= 50)){alert.error('Must be less than 50 characters'); return;}

    // Here we check if more than 1 space between words are found and
    // return if this is the case
    let words = translation.toLowerCase().trim().split(" ");
    let illegal = false;
    words.forEach(element => {
      if(element === ""){illegal = true;}
    });
    if(illegal){alert.error('Only 1 space between words allowed'); return;}

    // We fetch the "local" images
    fetchImages(words);

    // We then attempt to store the translation phrase in the database
    fetch(apiUrl + '/translations?username=' + localStorage.getItem("user"))
    .then(response => response.json())
    .then(user => {

      // Since PATCH does not actually add onto the existing translations
      // in the server but simply replaces it we need to ensure that the previous values
      // are retained by including them in the patch. We use "unshift" when adding the new
      // phrase to the array to ensure it ends up at the beginning of the array
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

  /**
   * The function is named "fetchImages" because one could imagine that in a real setting
   * the images for the translations would be fetched from the server and not stored locally.
   * Here we simply set the images based on the letters of the words
   * @param {*} words Array of string words to be translated
   */
  function fetchImages(words){
    let wordsImages = [];
    words.map(word => {
      word = word.split("");
      let wordImages = [];
      word.map(letter => {
        // We loop through each letter and push an object containing the image link and its letter name
        // We could have just added the letter and let the imageRow widget handle fetching the image
        // but that would make the ImageRow widget less general
        return wordImages.push({"image": hands_images[letter], "letter": letter});
      })
      return wordsImages.push(wordImages);
    })
    // We finally set the newly translated images which triggers the UI update
    setImages(wordsImages);
  }


  return (
      <div className="translation-page shadow">
        <LtSubmitWidget text='Translate a phrase...' onClick={handleTranslation} onChange={setTranslation} value={translation}/>
        <div className='translation-container'>
          <div className='checkbox-widget-container'>
            <div className='checkbox-container shadow'>
                <p>ABC</p>
                <label class="switch">
                  {/* The checkbox toggle sets the visibility value telling the ImageRow widgets to
                      either display or not display the letters for each image */}
                  <input type="checkbox" value={visible} onChange={() => setVisible(!visible)}/>
                  <span class="slider round"></span>
                </label>
            </div>
          </div>
            {/* We render ImageRows of images corresponding to an individual word.
                Conditionally we render a plus-symbol to symbolize the sentence structure
                if it is not a single or last word */}
            {images.map((e, index) => {
              return index < images.length-1 
              ? <div className='row-container' key={index}>
                  <LtImageRow images={e} visible={visible}/>
                  <i className="fa fa-plus image-add" aria-hidden="true"/>
                </div> 
              : <div className='row-container' key={index}>
                  <LtImageRow images={e} visible={visible}/>
                </div>
            })}
        </div>
      </div>
  );
}

export default TranslationPage;