import React from 'react';
import TinderCard from 'react-tinder-card';
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
      <img src={imagen} alt= "" />
    </div>
  );
}

export default DogCard;
