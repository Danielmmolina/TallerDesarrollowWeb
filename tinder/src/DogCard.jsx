import React from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';


function DogCard({ imageUrl }) {
  return (
    <TinderCard className="dog-card">
      <img src={imageUrl} alt="Imagen de perro" />
    </TinderCard>
  );
}

export default DogCard;
