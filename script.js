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
stressAudio.src = 'stress.mp3';
var anxietyAudio = new Audio();
anxietyAudio.src = 'anxiety.mp3';

breathAnimation();

setCSSVariables();

function playAudio(id) {
  if (id === 'anxious') {
    if (anxietyAudio.paused === false) {
      //anxiety audio is playing, should pause

      document.getElementById('anxious-icon').innerHTML = 'pause';
      anxietyAudio.pause();
    } else {
      //anxiety audio is either paused or not paying, should play

      document.getElementById('stressed-icon').innerHTML = '';
      stressAudio.load();

      document.getElementById('anxious-icon').innerHTML = 'play_arrow';
      anxietyAudio.play();
    }
  } else if (id === 'stressed') {
    if (stressAudio.paused === false) {
      //stress audio is playing, should pause

      document.getElementById('stressed-icon').innerHTML = 'pause';
      stressAudio.pause();
    } else {
      //stress audio is either paused or not paying, should play
      document.getElementById('anxious-icon').innerHTML = '';
      anxietyAudio.load();

      document.getElementById('stressed-icon').innerHTML = 'play_arrow';
      stressAudio.play();
    }
  }
}

function pauseAudio() {
  anxietyAudio.pause();
  stressAudio.pause();
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

setInterval(breathAnimation, totalTime);
