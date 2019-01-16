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
      located: false
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
    const index = this.areYouSarahConnor(data);
    let clarifaiFace, boxShadow;
    if (index !== undefined) {
      clarifaiFace = data.outputs[0].data.regions[index].region_info.bounding_box;
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

  areYouSarahConnor = (data) => {
    this.clearInput();
    const concepts = data.outputs[0].data.regions.map(item => item.data.face.identity.concepts);
    const faces = concepts.map(item => item.map(nested => nested.name));
    let faceIndex;
    faces.forEach((item, index) => {
      if (item.includes('linda hamilton')) {
        faceIndex = index;
      }
    });
    faceIndex !== undefined ? this.setState({ located: true }) : this.setState({ located: false });
    return faceIndex;
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

  onButtonSubmit = () => {
    this.scanToggle();
    this.setState({ imageUrl: this.state.input });
    this.clearInput();
    app.models.predict(
      ConfigObj.CELEBRITY_MODEL,
      this.state.input
    )
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
        .catch(err => console.log(err))
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
            <MissionStatus located={this.state.located} />
          </div>
          <div className='tl w-20 pt4'>
          </div>
        </div>
        <ImageLinkForm className='center' onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
