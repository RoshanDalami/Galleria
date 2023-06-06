import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [query, setQuery] = useState('');
  const[error,setError] =useState(false)
  const [photos, setPhotos] = useState([]);

  const getPhotos = async () => {
    await fetch(query?`https://api.pexels.com/v1/search?query=${query}`:'https://api.pexels.com/v1/search?query=computer', {
      mode: "cors",
      headers: {
        Authorization:
          "7ifdKrOZTfW76FQ2MyfhkwE67ZvUJymE1pkVtWhZ3uSdEI2pF2m981Rz",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPhotos(data.photos);
      });
  };
  useEffect(() => {
    getPhotos();
  }, []);
  const searchHandler = (e) => {
    if(e.target.value === ''){
      setError(true)
      return ;
    }
    setQuery(e.target.value);
    setError(false)
  };
 

  return (
    <div className="container">
      <div className="header">
        <input
          type="text"
          onChange={searchHandler}
         
          className="input"
        />
        {error && <p style={{color:'red'}}>Enter inot search box to search ...</p> }
        <button onClick={getPhotos}>Search</button>
      </div>

      <div className="categories">
        <button >mountain</button>
        <button >Birds</button>
        <button >Foods</button>
        <button >Beaches</button>
      </div>
      <div className="body">
        {photos.map((item) => {
          return (
            <div className="imageContainer" key={item.id}>
              <img
                src={item.src.large}
                alt={item.id}
                className="image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
