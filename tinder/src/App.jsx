import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUndo } from 'react-icons/fa';
import './App.css';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IconButton, Typography } from '@mui/material';
import LoremIpsum from 'react-lorem-ipsum';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UndoIcon from '@mui/icons-material/Undo';
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Card, CardContent, CardMedia } from "@mui/material";

function App() {
  const [cargando, setCargando] = useState(true);
  const [perroImagen, setPerroImagen] = useState('');
  const [perrosRechazados, setPerroRechazados] = useState([]);
  const [perrosAceptados, setPerrosAceptados] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);


  const x = LoremIpsum;

  const descripcion= x({
    random: true,
    p: 1,
    avgSentencesPerParagraph: 3,
  }
  );


  useEffect(() => {
    fetchDogImage();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;



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
    setPerrosAceptados([...perrosAceptados, { name: generateDogName(), url: perroImagen , description: descripcion}]);
    fetchDogImage();
  };

  const handleReject = () => {
    setPerroRechazados([...perrosRechazados, { name: generateDogName(), url: perroImagen , description: descripcion}]);
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


 

  
function DogImage(props, number) {
    if(props.number==1){
      return (
        <img id='imagenPAR' src={props.url} alt="Random dog" />
        
      );
    }
    else{
      return (
        <img id='imagenPC' src={props.url} alt="Random dog" />
      );
    }
  
  }
  
  function UndoButton(props) {
    return (
      <button onClick={props.onClick}>
      <FaUndo />
    </button>
    );
  }


  return (
    <section id='pagina'>

      <section id='superior1'> 
      <div> 
      <img id="perritasSolteras" src="https://i.imgur.com/ZV2LzLb.png"/>
      </div>

      <div id='superior'>

  

        
      <div id='superior2'>
      <p id='parrafoTit'>
        <h1>
             
              <label id='titPag1'>PERROS <label id='titPag2'>CALIENTES</label>  </label>
             

              <h2 id='subtitPag'>
            el verdadero placer de la salchicha
          </h2>

          </h1>
      </p>
      </div>
     

      <img id="logo1" src="../img/Mi proyecto.png"  /> 

         </div>
         </section>
  <section id= 'a'>
    <div id='Pagina1'> 

        <div  id='candidato'>


          <center>

      <h2 id='titPC' >Perro candidato </h2>
      
         

     
        </center>
        {cargando ? (
          <img classname="loading" src="https://media.giphy.com/media/8agqybiK5LW8qrG3vJ/giphy.gif" alt="loading" />
        ) : (
          <div>
            <center>

          <DogImage url={perroImagen} number={0} />
       
              
        
            <b> 
            <p id='nombrePC'>{generateDogName()}</p>
            <p> {descripcion} </p>
            </b>
        
            <div>
                
                <IconButton className="acepted" onClick={handleAccept}>
                    <FavoriteIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
              
              
                <IconButton className="rejected" onClick={handleReject}>
                    <CloseIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
              
              
            </div>
            </center>
          </div>
        )}
      </div>

      <div  id='aceptados'>
         
      <center>
        <h2>Perros aceptados</h2>    
        <ul >
          {perrosAceptados.map(dog => (
            <li key={dog.url}>
              <DogImage url={dog.url} number={1}/> 
              <p>{dog.name}</p>

              <IconButton className="verDesc" variant="contained" onClick={handleClick}>
                    <VisibilityIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
                
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                     }}>

                  <Card>

                     <CardMedia
                        classname="imagenDesc"
                        component="img"
                        image={dog.url}/>
                  <CardContent>
                    
                    <b>Nombre:</b> {dog.name} <br />
                   <b>Descripcion:</b> {dog.description}
                  </CardContent> 
                    </Card>
                </Popover>  

              <IconButton className="undoAceptados" onClick={(UndoButton) => handleUndo(dog, perrosAceptados)}>
                    <UndoIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
            </li>
          ))}
        </ul>
        </center>

        </div>
          
      <div  id='rechazados' >
        <center> 
        
            
            <h2>Perros rechazados</h2>
                     


       
       
        
        <ul>
          {perrosRechazados.map(dog => (
            <li key={dog.url}>
              <DogImage url={dog.url} number={1} />
              <p>{dog.name}</p>
              <IconButton className="verDesc" variant="contained" onClick={handleClick}>
                    <VisibilityIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>
                
                  <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                     }}>

                  <Card>

                     <CardMedia
                        classname="imagenDesc"
                        component="img"
                        image={dog.url}/>
                  <CardContent>

                    <b>Nombre:</b> {dog.name} <br />
                   <b>Descripcion:</b> {dog.description}
                  </CardContent> 
                    </Card>
                </Popover>

                <IconButton className="undoRechazados" onClick={(UndoButton) => handleUndo(dog, perrosRechazados)}>
                    <UndoIcon className="header__icon" fontSize="large" disabled={cargando}/>
                </IconButton>

      



            </li>
          ))}
        </ul>
        </center>
      </div>
      

      
      </div>
      
      </section>  
      
      
      

      
      
      </section>

  );
  
}

export default App; 