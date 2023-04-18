import React, { useEffect, useState } from "react";
import axios from 'axios';


function DogCard({ imageUrl }) {
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resultado = await axios.get('https://dog.ceo/api/breeds/image/random')
      setImagen(resultado.data.message);
    };
    fetchData();
  },  [] );

  return (
    <div>
      <center>
      <img src={imagen} alt= "" height="420" width= "420" />
      </center>
    </div>
  );
}

export default DogCard;
