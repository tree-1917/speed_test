/* Typing Game : 
 * - It's Funny Game To Test Your Speed 
 *
*/
// Words 
let words = ['Hello', 'Welcome', 'Good', 'Bad', 'New', 'That', 'Then'] 

// Get Value From Json Object 
// let mywords = JSON.parse(wordsfile)
// console.log(mywords);

// Levels
let levels = {
    "Easy" : 4 ,
    "Normal" : 3,
    "Hard" : 2 
}

// Catch Element 
let level = document.querySelector("span.level");
let levelDuration = document.querySelector("span.level-duration");
let startBtn = document.querySelector("#start");
let theRandomWord = document.querySelector(".therandomword");
let userInput = document.querySelector("input.trace");
let wordsContainer = document.querySelector(".words");
let timer = document.querySelector("span.timer");
let userPoints = document.querySelector("span.points");
let totalPoints = document.querySelector("span.total-points");
let darkLayer = document.querySelector('.dark-layer');
let msg = document.querySelector('.msg')
// Global Variable
let word = '' ; 
/**
 * Game Logic : 
 *  [1] User Must click Start Point
 *  [2] Generate Random Word To User 
 *  [3] Check User Input After Time 
 *  [4] if true => continue => Start From [2]
 *      if false => Game Over 
 *  [5] User Finish All Words => Good JOb
 *  [6] UP To Next Level if He Want Or Play In same Game
 * 
 * Game Note : 
 * [1] - push Start button From js To RePush it if User Finish The Game 
 *     _ and don't Need To Play Next Game And See His Scores Only
 * [2] - Get Word From Text And Make More Specific To The Length of The Word For Every Level
 * [3] - I don't Need To Romove The Form The Array To Can Use Again But Remove From the page
 * [4] - You Need To Make Function To Push Start State to The app To don't make any reload To the page 
 *     - but When user click Rest button repush the parts ..<T>..
 * [5] - Make The Page Rest 
 * [6] - Make Wait 3 seconds before Start First Time You Can Use Add the Same The All 
 * [7] - Take Words Form The Text File in Your Data Base...
 * [8] - Get Values Form Json File Too.
*/

// Defualt Setting To The Game

// You Need To make EventListener To select Box Of levels If Change and Call This Function

function defualtSetting(){
    // User Level
    // let levelUser = ; // this Will Come Fomr The Select Box 
    let levelUser = 'Normal'; 
    let levelTime = levels[levelUser];
    // Show Them By Defualt Values 
    level.innerHTML = levelUser ;
    levelDuration.innerHTML = levelTime;
    // Make Deafult Setting The Control Part
    timer.innerHTML = levelTime;
    totalPoints.innerHTML = words.length
}
defualtSetting()

// Click The Button
startBtn.onclick = function (e){
    // Push Words For Level
    levelSetting(); 
    // foucAtuo 
    userInput.focus()
    // Generate Random Word 
    genWord(); 
    // Remove Start button 
    e.target.parentElement.remove()
}

// Generate Random Word

function genWord(){
    // Empty The RandomWordContainer
    theRandomWord.innerHTML = '';
    // Generate Random 
    word = words[Math.floor(Math.random() * words.length )]
    // Make User See It 
    let therandomwordcontent = document.createTextNode(word);
    theRandomWord.appendChild(therandomwordcontent) 
    // Remove Random Word Form Words & Array
    removeRandomWord(word);
    // Check The Value Will Input 
    startGame();
}

// Push Words For All Level 
function levelSetting(){
    // Push All Words In Level 
    for(let i of words ){
        let wordBox = document.createElement('div')
        wordBox.className = i
        wordBox.innerHTML = i;
        wordsContainer.appendChild(wordBox)
    }
}
// Remove Random Word Form Words 
function removeRandomWord(word){
    // You Need To Modfiy This Part With Better Logic
    // When You Remove The Value From Arry The Index can't Safe In Same Value 
    // Bad Solution but Work Push Again
    // Remove From page
    let indexRandomWord = words.indexOf(word)
    let randomWordBox = document.querySelector(`.${word}`);
    // Test
    randomWordBox.remove()
    words.splice(indexRandomWord , 1)
}

// Start Game And Timer Will work 
function startGame(){
    // Reset Timer To Level Time
    timer.innerHTML = levels['Normal'];
    // To Stop SetInterval You Need To Make Id For this interval To Stop .
    let GameTime = setInterval(() => {
        if(timer.innerHTML > '0'){
            // Game Work
            timer.innerHTML--;
        }else{
            // Check The User Input 
            finish();
            clearInterval(GameTime)
        }
    }, 1000);
}

// Finish Will See if will Take Anthor Word Or Game Over

function finish(){
    // Take Value To Check it
    let userValue = userInput.value
    // Clear the input Field
    userInput.value = '';
    // User Game 
    if(userValue === word){
        if(words.length !== 0){
            // Generate New Word For Him
            userPoints.innerHTML++;
            genWord();
        }else{
            // Show Good Job Message 
            makeEndMsg()
        }
    }else{
        // Game Over
        makeEndMsg()
    }
}

// Make Message To Good Job || GameOver
function makeEndMsg(){
    // User Finish The Game
    theRandomWord.innerHTML = '';
    // Message Build 
    let msgtext = (words.length === 0)? "You Make Good Job !" : "Game Over";
    let darkLayerColor = (words.length === 0 )? 'good' : 'bad';
    let msgbox = document.createElement('div')
    let RestButton = document.createElement('button')
    let msgholder = document.createElement('p')
    // Define The Msg Element
    RestButton.classList.add('rest-btn') // Make Rest Button
    RestButton.append('Start Again');
    msgholder.classList.add('msg-holder')
    // Append all Element In Pop-Up msg
    msgholder.append(msgtext);
    msgbox.appendChild(msgholder)
    msgbox.appendChild(RestButton)
    msg.appendChild(msgbox)
    // DarkLayer
    darkLayer.classList.add('end', darkLayerColor);
    // Message Will Apper
    msg.classList.add('pop-up' , darkLayerColor)
}
// For Now Reset button
document.addEventListener('click', (e) => {
    if(e.target.className === 'rest-btn'){
        console.log(e.target)
        reLoadDom()
    }
})
// But It's So Bad Way You Must Make Function To Rest the page Not reload It ..<d>
function reLoadDom(){
    window.location.reload(true)
}
