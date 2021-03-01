let startBtn = document.getElementById("startBtn");
let submit = document.getElementById('submit');
let form = document.getElementById('form');
let userguess =  document.createElement("p");
let container = document.querySelector('#container');
let prompt =null;
let guessTheWord = null;;
let fillIn = null;
let filteredInput = null
let charTracker = null;
let randomWord = null;
let fetchedWord = null;
let userInput = null;
let pressedStart = false;
let vowelCounter;
let constanantCounter;

function generateRandomWord(){
    randomWord = getRandomWord();
}

function fetchWord(){
    fetchedWord = randomWord.split('').map(char => {
        return charTracker.has(char)?char:'_'
    }).join(' ');
    fillIn = document.getElementById("fillIn");
    fillIn.innerHTML = fetchedWord;
}
function addToMap(str){
    str.split('').forEach(char => {
        charTracker.set(char);
    });
}

function start(){
    // When the user clicks start, reveal any instances of the letters R,S,T,L,N, or E
    charTracker = new Map();
    charTracker.set('r');
    charTracker.set('s');
    charTracker.set('t');
    charTracker.set('l');
    charTracker.set('n');
    charTracker.set('e');
    vowelCounter = 0;
    constanantCounter = 0;
    pressedStart = true;
    guessTheWord =  false;
    generateRandomWord();
    fetchWord();
    form.guessBox.placeholder = "1 vowel & 3 constanant";
    userguess.remove();
    prompt =  document.createElement("p");
    prompt.setAttribute('id', 'prompt');
    prompt.style.backgroundColor = 'red';
    prompt.style. display = 'inline-block';
}


function containsOnlyLetters(str){
  return(/^[a-zA-Z]+$/.test(str))
}

function validAmount(str){
    for(let i in str){
        if(str[i] == 'a' || str [i] == 'e'|| str [i] == 'i' || str[i] == 'o'||
        str[i] == 'u'){
               vowelCounter++;
        }
        else{
            constanantCounter++;
        }
    }
    if(vowelCounter !== 1) return false;
    if(constanantCounter !== 3) return false; 
    return true;
}

function checkIfCorrect(fetchedWord){
    return fetchedWord.replace(/\s/g,'') === randomWord;
}

const handleSubmit = function (event){
    event.preventDefault();
    if(pressedStart){
        userInput = form.guessBox.value;
            filteredInput = userInput.replace(/\s/g,'').toLowerCase();
            if(!containsOnlyLetters(filteredInput)){
                prompt.innerText = `Invalid: Detected Non-letter character: ${userInput}`;
                container.append(prompt);
                form.reset()
                return;
            }
        if(!guessTheWord){

            if(!validAmount(filteredInput)){
                prompt.innerText =`Entered ${vowelCounter} vowel and ${constanantCounter} constanantCounter,
                please enter only 1 voewl and 3 constanant`;
                container.append(prompt);
                constanantCounter = 0;
                vowelCounter = 0;
                form.reset()
                return;
            }
            addToMap(filteredInput);

            userguess.innerText = `Guesses: ${filteredInput.split('').join(',')}`;
            document.body.append(userguess)
            fetchWord();
            prompt.remove();
            if(checkIfCorrect(fetchedWord)){
                alert("you win")
            }
            else if(vowelCounter >= 1 && constanantCounter >= 3 ){
            guessTheWord = true;
            prompt.innerText ='Ran out of tries, guess the word';
            form.guessBox.placeholder = "Enter exact word";
            }
        }


        else{
            if(checkIfCorrect(filteredInput)){
                alert("you win")
                fillIn.innerHTML = randomWord;
                pressedStart = false;
                form.guessBox.placeholder = "Press start";
            }
            else{
                alert('you lose')
                fillIn.innerHTML = randomWord;
                pressedStart = false;
                form.guessBox.placeholder = "Press start";
            }
        }
    
    } 

    else{
        alert("Press start")
    }
    form.reset()
}
startBtn.addEventListener("click", start);
submit.addEventListener("click", handleSubmit);