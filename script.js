const main = document.querySelector('main');
const readBtn = document.getElementById('read');
const textArea = document.getElementById('text');
const closeBtn = document.getElementById('close');
const toggleBtn = document.getElementById('toggle');
const voicesSelect = document.getElementById('voices');

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

data.forEach(createBox);

//create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.classList.add('box');
  box.innerHTML = `
    <image src="${image}" alt-="${text}"/>
    <p class="info">${text}</p>`;
  //speak event
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    //add/remove active effect
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });
  main.appendChild(box);
}
//init speechsynth
const message = new SpeechSynthesisUtterance();

//store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option);
  });
}

//set text
function setTextMessage(text) {
  message.text = text;
}

//speak text
function speakText() {
  speechSynthesis.speak(message);
}

//set voice
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}
//event listeners

//voice change
speechSynthesis.addEventListener('voiceschanged', getVoices);

//toggle textbox
toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);
//toggle closebtn
closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

//voice select
voicesSelect.addEventListener('change', setVoice);

//read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
