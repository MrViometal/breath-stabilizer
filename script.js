const container = document.querySelector('.circles-container');
const text = document.querySelector('#text');

const totalTime = 19000;

const ratio = {
  total: 19,
  in: 4,
  hold: 7,
  out: 8,
};

const breathInTime = (totalTime / ratio.total) * ratio.in;
const holdTime = (totalTime / ratio.total) * ratio.hold;
const breathOutTime = (totalTime / ratio.total) * ratio.out;

var stressAudio = new Audio();
stressAudio.src = './audio/stress.mp3';
stressAudio.volume = 0.3;

var anxietyAudio = new Audio();
anxietyAudio.src = './audio/anxiety.mp3';
anxietyAudio.volume = 0.08;

var guitarAudio = new Audio();
guitarAudio.src = './audio/guitar-serenity.mp3';
guitarAudio.volume = 0.05;

breathAnimation();

setCSSVariables();

function playGuitarAudio() {
  guitarAudio.play();
  guitarAudio.loop = true;
}

function playAudio(id) {
  if (id === 'anxious') {
    if (anxietyAudio.paused === false) {
      //anxiety audio is playing, should pause
      anxietyAudio.pause();
      guitarAudio.play();

      document.getElementById('anxious-icon').innerHTML = 'pause';
    } else {
      //anxiety audio is either paused or not paying, should play
      stressAudio.load();
      guitarAudio.pause();
      anxietyAudio.play();

      document.getElementById('stressed-icon').innerHTML = '';
      document.getElementById('anxious-icon').innerHTML = 'play_arrow';
    }
  } else if (id === 'stressed') {
    if (stressAudio.paused === false) {
      //stress audio is playing, should pause
      stressAudio.pause();
      guitarAudio.play();

      document.getElementById('stressed-icon').innerHTML = 'pause';
    } else {
      //stress audio is either paused or not paying, should play
      anxietyAudio.load();
      guitarAudio.pause();
      stressAudio.play();

      document.getElementById('anxious-icon').innerHTML = '';
      document.getElementById('stressed-icon').innerHTML = 'play_arrow';
    }
  }
}

function setCSSVariables() {
  cssVar('--total-time-in-seconds', `${totalTime}ms`);

  cssVar('--breath-in-time-in-seconds', `${ratio.in}s`);
  cssVar('--hold-time-in-seconds', `${ratio.hold}s`);
  cssVar('--breath-out-time-in-seconds', `${ratio.out}s`);

  cssVar('--breath-in-ratio', ratio.in / ratio.total);
  cssVar('--hold-ratio', ratio.hold / ratio.total);
  cssVar('--breath-out-ratio', ratio.out / ratio.total);

  cssVar('--first-interval', (ratio.in / ratio.total) * 100 + '%');
  cssVar(
    '--second-interval',
    ((ratio.in + ratio.hold) / ratio.total) * 100 + '%',
  );
}

function cssVar(name, value) {
  if (name[0] != '-') name = '--' + name; //allow passing with or without --
  if (value) document.documentElement.style.setProperty(name, value);
  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

function breathAnimation() {
  text.innerHTML = 'Breath In';
  container.className = 'circles-container grow';

  setTimeout(() => {
    text.innerText = 'Hold...';

    setTimeout(() => {
      text.innerText = 'Breath Out';
      container.className = 'circles-container shrink';
    }, holdTime);
  }, breathInTime);
}

setInterval(breathAnimation, totalTime);

window.onload = playGuitarAudio();
