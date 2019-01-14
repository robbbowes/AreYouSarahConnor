import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import ConfigObj from './config/config'

const app = new Clarifai.App({
  apiKey: ConfigObj.API_KEY
});

const particlesOptions = {
  particles: {
    number : {
      value: 200,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict(
      ConfigObj.CELEBRITY_MODEL, 
      "https://o.aolcdn.com/images/dims3/GLOB/crop/1944x1276+0+34/resize/1028x675!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fdf86b0ab14d5d04db8f7448589ccab5c%2F205688650%2Factress-linda-hamilton-attending-the-premiere-of-terminator-2-on-july-picture-id156085440"
    ).then(
    function(response) {
      console.log(response)
    },
    function(err) {
      console.log(err)
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Logo />
        <Navigation />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition />
      </div>
    );
  }
}

export default App;
