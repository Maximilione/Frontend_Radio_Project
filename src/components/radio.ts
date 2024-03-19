export interface Radio {
    id: number;
    name: string;
    streams: { id: number; url: string; bitrate: string; is_video: boolean; is_online: boolean }[];
    logo?: string;
    website?: string;
    // Aggiungi altre proprietà opzionali se necessario
  }
  
  const defaultRadio: Radio = {
    id: 0,
    name: 'Default Radio',
    streams: [
      {
        id: 0,
        url: 'http://defaultstream.url',
        bitrate: '128',
        is_video: false,
        is_online: true,
      }
    ],
    logo: 'http://defaultlogo.url',
    website: 'http://defaultwebsite.url'
  };
  
  export default defaultRadio;
  