// components/MainStreamPage.tsx (Pagina principale con flusso live streaming)
import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { fetchRadioData } from './api';
import defaultRadio from './radio';
import { Radio } from './radio';
import MediaPlayer from './MediaPlayer';

const MainStream: React.FC = () => {
   

  const [radioList, setRadioList] = useState <Radio[]>([defaultRadio]);

  useEffect(() => {

    if(selectRadio){
      console.log(selectRadio.streams[0].url);
    }
    /**
     * Fetches data from the server and updates the state with the received data.
     *
     * @return {Promise<void>} A promise that resolves when the data is fetched and the state is updated.
     */
    const fetchData = async () => {
      try {
        const data = await fetchRadioData(''); // Passa il termine di ricerca desiderato
        // Aggiorna lo stato con i dati ricevuti
        if(data && Array.isArray(data.items)){
          setRadioList(data.items);
        }else{
          setRadioList([defaultRadio]);
        }
        
      } catch (error) {
        console.error('Errore nella richiesta API:', error);
      }
      
    };
    fetchData();
    //console.log(radioList);
    }, 
  []);

  const [selectRadio, setSelectRadio] = useState<Radio | null>(null);
  const handleRadioSelect = (radio: any) => {
    setSelectRadio(radio);
  };

  return (// mainstreamreampage
    <div className="main-stream-page">
      <h1>Live Streaming</h1>
      <h2>Seleziona un canale</h2>
      
      <SearchBar onRadioSelect={handleRadioSelect} radioList={radioList} /><br></br>

      <h2>{selectRadio?.name}</h2>
      <MediaPlayer url={selectRadio?.streams[0].url || ''} is_video={selectRadio?.streams[0].is_video || false}/>

      <img src={selectRadio?.logo || ''} alt={selectRadio?.name || ''} className="immagine-rotante"></img><br></br>

      <button onClick={() => navigator.clipboard.writeText(selectRadio?.website || '')}>COPY WEBSITE LINK</button>
      
    </div>
  );
};

export default MainStream;