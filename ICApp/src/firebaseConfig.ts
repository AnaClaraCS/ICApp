import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyCv9pHQ0LMOfBDpFO47SfL45koZPhTNEdY',
  authDomain: 'applocalizacaocefet.firebaseapp.com',
  databaseURL: 'https://applocalizacaocefet-default-rtdb.firebaseio.com',
  projectId: 'applocalizacaocefet',
  storageBucket: 'applocalizacaocefet.appspot.com',
  messagingSenderId: '1001211467078',
  appId: '1:1001211467078:android:34e3fed78c84c179b9c147',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
