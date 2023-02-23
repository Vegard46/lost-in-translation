import LtSubmitWidget from '../components/LtSubmitWidget';
import LtImageRow from '../components/LtImageRow';
import hands_images from '../hands_images';
import './translation-page.css';
import { useContext, useEffect, useState } from 'react';
import { TranslationContext } from '../context/TranslationProvider';
import { useNavigate } from 'react-router-dom';

function TranslationPage() {

  const [translation, setTranslation] = useContext(TranslationContext);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const apiUrl = "https://wandering-life-jacket-goat.cyclic.app";

  useEffect(() => {
    if(!localStorage.getItem("user")){navigate('/')}
  })

  const fetchImages = () => {
    let words = translation.toLowerCase().trim().split(" ");
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
      <div className="translation-page">
        <LtSubmitWidget text='Translate a phrase...' onClick={fetchImages} onChange={setTranslation} value={translation}/>
        <div className='translation-container'>
            {images.map((e, index) => {
              return index < images.length-1 
              ? <div className='row-container'>
                  <LtImageRow images={e}/>
                  <i class="fa fa-plus image-add" aria-hidden="true"/>
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