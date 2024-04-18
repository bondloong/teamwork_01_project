import { ReactElement, useEffect } from 'react';
import './App.css';

function App(): ReactElement {
  useEffect(() => {
    const fetchServerData = async (): Promise<void> => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return <div className="App">Вот тут будет жить ваше приложение :)</div>;
}

export default App;
