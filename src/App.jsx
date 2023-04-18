import { useState } from 'react'
import './App.css'
import Header from './Header'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DogCard from './DogCard';

function App() {
  

  return (
    <div className="App">

      <Router>
        <Header />
        <Switch>
          <Route path="/like">
          like
          </Route>

          <Route path="/dislike">
          dislike
          </Route>

          <Route path="/">
          <DogCard />
          </Route>

        </Switch>


      </Router>
      

    </div>
  )
}

export default App
