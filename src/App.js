import React, { Component } from 'react';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import MissionStatus from './components/MissionStatus/MissionStatus';
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
    number: {
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
      imageUrl: '',
      box: {},
      location: -1
    }
  }

  scanToggle = () => {
    const scanElements = document.querySelectorAll('#submit-button span');
    scanElements.forEach((element, i) => {
      setTimeout( () => {
        element.classList.remove('letter' + (i + 1));
      }, 3000)
      element.classList.add('letter' + (i + 1));
    })
  }

  calculateFaceLocation = (data) => {
    let clarifaiFace, boxShadow;
    if (this.state.location !== -1) {
      clarifaiFace = data.outputs[0].data.regions[this.state.location].region_info.bounding_box;
      boxShadow = 'inset 0 0 0 3px #ff0000';
    } else {
      clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      boxShadow = 'inset 0 0 0 3px #fff';
    }
    const image = document.getElementById('face-recog-img');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      boxShadow: boxShadow
    }
  }

  getBestGuesses = (data) => {
    const concepts = data.outputs[0].data.regions.map(item => item.data.face.identity.concepts);
    return concepts.map(firstItem => firstItem[0])
  }

  targetLocator = (facesObjs) => {
    let location = -1;
    facesObjs.forEach((face, i) => {
      if (face.name === 'linda hamilton') {
        location = i;
      }
    });
    location === -1 ? this.setState({ location: -1 }) : this.setState({ location: location });
  }


  clearInput = () => {
    document.getElementById('url-input').value = '';
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onHitEnter = (e) => {
    if (e.keycode === 13) {
      this.onButtonSubmit();
    }
  }

  onButtonSubmit = () => {
    this.scanToggle();
    this.setState({ imageUrl: this.state.input });
    this.clearInput();
    app.models.predict(
      ConfigObj.CELEBRITY_MODEL,
      this.state.input
    )
      .then(response => {
        const faces = this.getBestGuesses(response);
        this.targetLocator(faces);
        const location = this.calculateFaceLocation(response);
        this.displayFaceBox(location)
      .catch(err => console.log(err))
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <div className="flex flex-wrap">
          <div className='tl w-20 pt4'>
          </div>
          <div className=' center w-60'>
            <MissionStatus location={this.state.location} />
          </div>
          <div className='tl w-20 pt4'>
          </div>
        </div>
        <ImageLinkForm className='center' onInputChange={this.onInputChange} onHitEnter={this.onHitEnter} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
