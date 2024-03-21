// api.ts
import axios from 'axios';

const API_URL = 'https://connect.fm-world.com/client2/radios';

export const fetchRadioData = async (query: string) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        query : query,
        limit: 25,
        
      },
      headers: {
        Authorization: 'Bearer HSf2Zppryj4kXk6UMw3xvGYbmKKVfN3ACu17ycRsEwGp',
      },

    });

    const filteredData = response.data.items.filter((item: any) => item.streams[0].is_online === true );

    console.log(filteredData);

    return { items: filteredData };
  } catch (error) {
    console.error('Errore nella richiesta API:', error);
    throw error;
  }
};