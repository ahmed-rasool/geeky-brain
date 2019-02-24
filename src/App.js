import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputForm from './components/InputForm/InputForm';
import Message from './components/Message/Message';
import FaceImage from './components/FaceImage/FaceImage';
import Footer from './components/Footer/Footer';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '33d93ac7511547fe97c00979985dd275'
 });

const particleOptions = {
  particles: {
  number: {
  value: 100,
  density: {
    enable: true,
    value_area: 800
    }
  },
  color: {
  value: "#000000"
  },
  shape: {
    type: "circle",
    stroke: {
    width: 0,
    color: "#000000"
  },
  polygon: {
  nb_sides: 3
  },
  image: {
  src: "img/github.svg",
  width: 100,
  height: 100
  }
  },
  opacity: {
  value: 0.5,
  random: true,
  anim: {
  enable: false,
  speed: 1,
  opacity_min: 0.1,
  sync: false
  }
  },
  size: {
  value: 3,
  random: true,
  anim: {
  enable: false,
  speed: 40,
  size_min: 0.1,
  sync: false
  }
  },
  line_linked: {
  enable: true,
  distance: 200,
  color: "#000000",
  opacity: 0.4,
  width: 1
  },
  move: {
  enable: true,
  speed: 6,
  direction: "none",
  random: false,
  straight: false,
  out_mode: "out",
  bounce: false,
  attract: {
  enable: false,
  rotateX: 600,
  rotateY: 1200
  }
  }
  },
  interactivity: {
  detect_on: "canvas",
  events: {
  onhover: {
  enable: false,
  mode: "bubble"
  },
  onclick: {
  enable: true,
  mode: "push"
  },
  resize: true
  },
  modes: {
  grab: {
  distance: 400,
  line_linked: {
  opacity: 1
  }
  },
  bubble: {
  distance: 400,
  size: 40,
  duration: 2,
  opacity: 8,
  speed: 3
  },
  repulse: {
  distance: 200,
  duration: 0.4
  },
  push: {
  particles_nb: 4
  },
  remove: {
  particles_nb: 2
  }
  }
  },
  retina_detect: true
  }

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      message: {},
      box: {}
    }
  }

  onInputUrl = (event) => {
    this.setState({input: event.target.value});
  }
  
  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.settingStateBox(this.calculateFaceBoxLoc(response))
        this.settingStateMessage(this.okStatus(response))
      })
      .catch(response => this.settingStateMessage(this.errStatus(response)));
  }

  okStatus = (okResp) => {
    const okMessage = {
      statusCode: okResp.status.code,
      statusDescription: okResp.status.description
    }
    return okMessage;
  }

  errStatus = (errorResp) => {
    const errMessage = {
      statusCode: errorResp.status,
      statusText: errorResp.statusText,
      errorCode: errorResp.data.status.code,
      errorDesciption: errorResp.data.status.description
    }
    return errMessage;
  }

  settingStateMessage = (inputRespMessage) => {
    this.setState({message: inputRespMessage})
  }

  calculateFaceBoxLoc = (input) => {
    const clarifaiResp = input.outputs[0].data.regions[0].region_info.bounding_box;
    
    // Fetching image with its id and calculating image width and height
    const resultImage = document.getElementById('result-Image');
    const resultImageWidth = Number(resultImage.width);
    const resultImageHeight = Number(resultImage.height);
    
    // Creating object filling objects
    const coords = {
      toprow: clarifaiResp.top_row * resultImageHeight,
      leftcol: clarifaiResp.left_col * resultImageWidth,
      bottomrow: resultImageHeight - (clarifaiResp.bottom_row * resultImageHeight),
      rightcol: resultImageWidth - (clarifaiResp.right_col * resultImageWidth)
    };
    return coords;
  }

  settingStateBox = (inputCoords) => {
    this.setState({box: inputCoords})
  }
  
  render() {
    return (
      <div className="App">
        <Particles className='part-bg' params={particleOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <InputForm onInputUrl={this.onInputUrl} onButtonClick={this.onButtonClick} />
        <Message message={this.state.message} />
        <FaceImage imageUrl={this.state.imageUrl} faceBox={this.state.box} />
        <Footer />
      </div>
    );
  }
}

export default App;
