import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';
import './App.css';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Box, Card, CardContent, CardMedia,IconButton } from '@mui/material';

function App() {
  const [cargando, setCargando] = useState(true);
  const [perroImagen, setPerroImagen] = useState('');
  const [perrosRechazados, setPerroRechazados] = useState([]);
  const [perrosAceptados, setPerrosAceptados] = useState([]);

  useEffect(() => {
    fetchDogImage();
  }, []);

  const fetchDogImage = () => {
    setCargando(true);
    axios.get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        setPerroImagen(response.data.message);
        setCargando(false);
      })
      .catch(error => {
        console.log(error);
        setCargando(false);
      });
  };

  const generateDogName = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleAccept = () => {
    setPerrosAceptados([...perrosAceptados, { name: generateDogName(), url: perroImagen }]);
    fetchDogImage();
  };

  const handleReject = () => {
    setPerroRechazados([...perrosRechazados, { name: generateDogName(), url: perroImagen }]);
    fetchDogImage();
  };

  const handleUndo = (dog, list) => {
    const newList = list.filter(item => item !== dog);
    if (list === perrosRechazados) {
      setPerroRechazados(newList);
    } else {
      setPerrosAceptados(newList);
    }
  };

  
function DogImage(props) {
    return (
      <img src={props.url} alt="Random dog" width="300" height="300" />
    );
  }
  
  function UndoButton(props) {
    return (
      <button onClick={props.onClick}>
      <FaUndo />
    </button>
    );
  }


  return (
    <div className="App">
      
      <img src="https://i.imgur.com/yINeoDx.png" width= "350" length="200" align="right"/>
      <img src="https://i.imgur.com/riJifQ3.png" width= "100" length="100" align="left"/>
      
      
    
      <center>
        
      <div className="column">
        <h2>Perro candidato</h2>
        {cargando ? (
          <img classname="loading" src="https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif" alt="loading" />
        ) : (
          <div>
            <DogImage url={perroImagen} />
          
            <p>{generateDogName()}</p>
           
            
            <div className="buttons">
                
                <IconButton className="acepted" onClick={handleAccept}>
                    <FavoriteIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
              
              
                <IconButton className="rejected" onClick={handleReject}>
                    <CloseIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
              
              
            </div>
          </div>
        )}
      </div>
      </center>
      <div className="Aceptados">
        <h2>Perros aceptados</h2>
        <ul>
          {perrosAceptados.map(dog => (
            <li key={dog.url}>
              <DogImage url={dog.url} />
              <p>{dog.name}</p>
              <UndoButton onClick={() => handleUndo(dog, perrosAceptados)} />
            </li>
          ))}
        </ul>
      </div>
      <p align = "right"> 
      <div className="Rechazados">
        <h2>Perros rechazados</h2>
        <ul>
          {perrosRechazados.map(dog => (
            <li key={dog.url}>
              <DogImage url={dog.url} />
              <p>{dog.name}</p>
              <UndoButton onClick={() => handleUndo(dog, perrosRechazados)} />
            </li>
          ))}
        </ul>
      </div>
      </p>
      <img src="https://i.imgur.com/ZV2LzLb.png" width={200} align="left"/>
    </div>
  );
}

export default App; 