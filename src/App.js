import './App.css';
import React from 'react';

const drumPads = [
  {
    key: 'Q',
    id: 'heater-1',
    desc: 'Heater 1',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  },
  {
    key: 'W',
    id: 'heater-2',
    desc: 'Heater 2',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  },
  {
    key: 'E',
    id: 'heater-3',
    desc: 'Heater 3',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  },
  {
    key: 'A',
    id: 'heater-4',
    desc: 'Heater 4',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  },
  {
    key: 'S',
    id: 'clap',
    desc: 'Clap',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  },
  {
    key: 'D',
    id: 'open-hh',
    desc: 'Open Hi-Hat',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  },
  {
    key: 'Z',
    id: 'kick-n-hat',
    desc: 'Kick & Hat',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  },
  {
    key: 'X',
    id: 'kick',
    desc: 'Kick Drum',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  },
  {
    key: 'C',
    id: 'closed-hh',
    desc: 'Closed Hi-Hat',
    sound: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  }
];

const App = () => {

  class DrumSet extends React.Component {
    constructor(props) {
      super(props);
      this.playAudio = this.playAudio.bind(this);
      this.displayAudioDesc = this.displayAudioDesc.bind(this);
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
      document.addEventListener('keypress', this.handleKeyDown);
    };

    playAudio(audioElement) {
      audioElement.currentTime = 0;

      audioElement.play();
    };

    displayAudioDesc(desc) {
      document.querySelector('#display').textContent = desc;
    }

    handleKeyDown(e) {
      const isNotValidKey = drumPads.reduce((acc,pad) => {
        return (pad.key === e.key.toUpperCase()) ? acc*false : acc*true;
      },true);
      if (isNotValidKey) {
        return undefined;
      }
      const audio = document.querySelector(`#${e.key.toUpperCase()}`);
      this.displayAudioDesc(audio.getAttribute('data-desc'));
      this.playAudio(audio);
    }

    render() {
      return (
        <div className="App">
          <div id="display"></div>
          <div className="row justify-content-around">
            {drumPads.map((pad) => {
              return <DrumPad
                pad={pad}
                displayAudioDesc={this.displayAudioDesc}
                playAudio={this.playAudio}
              />;
            })}
          </div>
        </div>
      );
    }
  }

  const DrumPad = (props) => {
    const pad = props.pad;
    console.log(props);

    const handleClick = () => {
      props.displayAudioDesc(pad.desc);
      return props.playAudio(document.querySelector(`#${pad.key}`));
    }

    return (
      <button id={pad.id} className="drum-pad col-4 .px-5 btn btn-dark" onClick = {handleClick}>
        {pad.key}
        <audio
          src={pad.sound}
          id={pad.key}
          className="clip"
          data-desc={pad.desc}
        />
      </button>
    )
  }

  return (
    <DrumSet />
  )

};
export default App;
