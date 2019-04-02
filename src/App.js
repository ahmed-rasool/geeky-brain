import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import InputForm from './components/InputForm/InputForm';
import Message from './components/Message/Message';
import FaceImage from './components/FaceImage/FaceImage';
import Footer from './components/Footer/Footer';
import Particles from 'react-particles-js';


//  react-particles-js settings parameters
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

// initial State which provides the starting point for the App
const initialState = {
  input: '',
  imageUrl: '',
  message: {},
  box: {},
  route: 'signIn',
  isUserSignedIn: false,
  currentUser: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
  
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

// This function sets the 'user' state with data
settingStateCurrentUser = (userData) => {
  this.setState({
    currentUser: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }
  })
}

// // This function is callled by settingStateMessage() inside onImageSubmit() and it
// // returns the output if the response from the clarifai api is OK
// okStatus = (okResp) => {
//   const okMessage = {
//     statusCode: okResp.status.code,
//     statusDescription: okResp.status.description
//   }
//   return okMessage;
// }

// This function is callled by settingStateMessage() inside onImageSubmit() and it
// returns the output if the response from the clarifai api is an error
// errStatus = (errorResp) => {
//   const errMessage = {
//     statusCode: errorResp.status,
//     statusText: errorResp.statusText,
//     errorCode: errorResp.data.status.code,
//     errorDesciption: errorResp.data.status.description
//   }
//   return errMessage;
// }

// This function sets the 'message' state  
settingStateMessage = (inputRespMessage) => {
  this.setState({message: inputRespMessage})
}

// This function sets the 'input' state
settingStateInput = (event) => {
  this.setState({input: event.target.value});
}

// Sending PUT request to update the entries in the database
updateEntries = async () => {
  const request = await fetch('https://geeky-brain-api.herokuapp.com/image', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: this.state.currentUser.id
    })
  })
  const response  = await request.json();
  this.setState(Object.assign(this.state.currentUser, {entries: response}))
}

// Requesting Clarifai API and storing response
apiResponse = async (inputURL) => {
  try {
    const callingAPI = await fetch('https://geeky-brain-api.herokuapp.com/imageUrl', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        imageUrl: inputURL
      })
    })
    const response = await callingAPI.json();
    return response;

  } catch (err) {
    
    return err;
  }
}

// This function requests the clarifai api with data and parses the response
// Using the calculateFaceBoxLoc() nested inside settingStateBox()
requestAPI = async (inputURL) => {
  try {
    this.settingStateBox(this.calculateFaceBoxLoc(await this.apiResponse(inputURL)));
    // this.settingStateMessage(this.okStatus(apiResponse));
    
    // Updating entries in case of a successfull response from API
    this.updateEntries();

    } catch (err) {
      console.log(err);
      // this.settingStateMessage(this.errStatus(err))
    }
}

onImageSubmit = () => {
  this.setState({imageUrl: this.state.input});
  this.requestAPI(this.state.input);
}


// This function calculates the coordinates of box around the face.
// It takes clarifai api response as its input
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

// This function receives the coordinates calculated by calculateFaceBoxLoc()
// Then it sets the 'box' state
settingStateBox = (inputCoords) => {
  this.setState({box: inputCoords})
}

// This function sets the initial values of different properties of this.state object
settingStateInitial = (inputValue) => {
  // Returning to initial state in case of SignOut
  if (inputValue === 'signIn') {
    this.setState(initialState); 
  }
}

// this function determines the current status of the route
// Then sets the 'isUserSignedIn' property of the state object
settingStateUserSignedIn = (inputValue) => {
  // Setting isUserSignedIn state
  if (inputValue === 'home') {
    this.setState({isUserSignedIn: true})
  } else {
    this.setState({isUserSignedIn: false})
  }
}

// This function sets the 'route' state
settingStateRoute = (inputRoute) => {
  
  if (inputRoute === 'signIn') {
    this.setState(initialState);
  }

  this.settingStateUserSignedIn(inputRoute)

  // Setting the route state
  this.setState({route: inputRoute})
}

render() {
  const { imageUrl, box, isUserSignedIn, route, message, currentUser } = this.state;
  return (
    <div className='App'>
      <Particles className='part-bg' params={particleOptions} />
      <Navigation userStatus={isUserSignedIn} changeRoute={this.settingStateRoute} />
      <Logo />
      <SignIn settingCurrentUser={this.settingStateCurrentUser} currentRoute={route} changeRoute={this.settingStateRoute} />
      <SignUp settingCurrentUser={this.settingStateCurrentUser} currentRoute={route} changeRoute={this.settingStateRoute} />
      <ForgotPassword currentRoute={route} changeRoute={this.settingStateRoute} />
      <Message currentRoute={route} message={message} />
      <Rank currentUser={currentUser} currentRoute={route} />
      <InputForm currentRoute={route} settingStateInput={this.settingStateInput} onImageSubmit={this.onImageSubmit} />
      <FaceImage currentRoute={route} imageUrl={imageUrl} faceBox={box} />
      <Footer />
    </div>
  )
}
}

export default App;