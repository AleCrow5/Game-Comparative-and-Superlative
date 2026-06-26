//==================================================
// COMPARATIVE CHALLENGE
// Version 2.0
//==================================================

//------------------------------
// ELEMENTOS DEL HTML
//------------------------------

const home = document.getElementById("home");
const game = document.getElementById("game");

const start = document.getElementById("start");

const words = document.getElementById("words");
const answer = document.getElementById("answer");

const question = document.getElementById("question");

const score = document.getElementById("score");
const time = document.getElementById("time");
const bar = document.getElementById("bar");

const check = document.getElementById("check");
const shuffle = document.getElementById("shuffle");
const next = document.getElementById("next");

const message = document.getElementById("message");
const stars = document.querySelectorAll(".star");

//------------------------------
// VARIABLES
//------------------------------

let currentQuestion = 0;

let points = 0;

let draggedWord = null;

let seconds = 60;

let timer = null;

//------------------------------
// PREGUNTAS
//------------------------------

const questions=[

    //----------------------
    // EASY COMPARATIVES
    //----------------------
    
    {
    
    sentence:"Python is easier than Java",
    
    words:["Python","is","easier","than","Java"],
    
    explanation:"Easy → Easier"
    
    },
    
    {
    
    sentence:"Windows is easier than Mac",
    
    words:["Windows","is","easier","than","Mac"],
    
    explanation:"Easy → Easier"
    
    },
    
    {
    
    sentence:"TikTok is more addictive than Instagram",
    
    words:["TikTok","is","more","addictive","than","Instagram"],
    
    explanation:"Long adjective → More"
    
    },
    
    {
    
    sentence:"Telegram is more dangerous than WhatsApp",
    
    words:["Telegram","is","more","dangerous","than","WhatsApp"],
    
    explanation:"Dangerous → More dangerous"
    
    },
    
    {
    
    sentence:"Zoom is faster than Google Meet",
    
    words:["Zoom","is","faster","than","Google","Meet"],
    
    explanation:"Fast → Faster"
    
    },
    
    {
    
    sentence:"Linux is better than Windows",
    
    words:["Linux","is","better","than","Windows"],
    
    explanation:"Good → Better"
    
    },
    
    {
    
    sentence:"Office meetings are more wasteful than remote work",
    
    words:["Office","meetings","are","more","wasteful","than","remote","work"],
    
    explanation:"Wasteful → More wasteful"
    
    },
    
    {
    
    sentence:"Instagram is less addictive than TikTok",
    
    words:["Instagram","is","less","addictive","than","TikTok"],
    
    explanation:"Less + adjective"
    
    },
    
    {
    
    sentence:"Mac is more expensive than Windows",
    
    words:["Mac","is","more","expensive","than","Windows"],
    
    explanation:"Expensive → More expensive"
    
    },
    
    {
    
    sentence:"Java is slower than Python",
    
    words:["Java","is","slower","than","Python"],
    
    explanation:"Slow → Slower"
    
    },
    
    //----------------------
    // AS AS
    //----------------------
    
    {
    
    sentence:"A laptop is as powerful as a desktop computer",
    
    words:["A","laptop","is","as","powerful","as","a","desktop","computer"],
    
    explanation:"As...As"
    
    },
    
    {
    
    sentence:"Public WiFi is as dangerous as no antivirus",
    
    words:["Public","WiFi","is","as","dangerous","as","no","antivirus"],
    
    explanation:"As...As"
    
    },
    
    {
    
    sentence:"ChatGPT is not as smart as a human expert",
    
    words:["ChatGPT","is","not","as","smart","as","a","human","expert"],
    
    explanation:"Not As...As"
    
    },
    
    //----------------------
    // SUPERLATIVES
    //----------------------
    
    {
    
    sentence:"Python is the easiest programming language",
    
    words:["Python","is","the","easiest","programming","language"],
    
    explanation:"Easy → Easiest"
    
    },
    
    {
    
    sentence:"NVIDIA is the largest tech company",
    
    words:["NVIDIA","is","the","largest","tech","company"],
    
    explanation:"Large → Largest"
    
    },
    
    {
    
    sentence:"TikTok is the most addictive social media app",
    
    words:["TikTok","is","the","most","addictive","social","media","app"],
    
    explanation:"Most + adjective"
    
    },
    
    {
    
    sentence:"Zoom is the fastest meeting platform",
    
    words:["Zoom","is","the","fastest","meeting","platform"],
    
    explanation:"Fast → Fastest"
    
    },
    
    {
    
    sentence:"Telegram is the most dangerous app",
    
    words:["Telegram","is","the","most","dangerous","app"],
    
    explanation:"Most dangerous"
    
    },
    
    {
    
    sentence:"Python is the best language for beginners",
    
    words:["Python","is","the","best","language","for","beginners"],
    
    explanation:"Good → Best"
    
    }
    
    ];
//--------------------------------------------------
// BOTON PLAY
//--------------------------------------------------

start.addEventListener("click", startGame);

function startGame(){

    questions.sort(()=>Math.random()-0.5);
    
    home.style.display="none";
    
    game.style.display="block";
    
    loadQuestion();
    
    startTimer();
    
    }
//--------------------------------------------------
// CARGAR PREGUNTA
//--------------------------------------------------

function loadQuestion(){

    message.innerHTML="";
    
    next.style.display="none";
    
    check.disabled=false;
    
    words.innerHTML="";
    
    answer.innerHTML="";
    
    let list=[...questions[currentQuestion].words];
    
    list.sort(()=>Math.random()-0.5);
    
    list.forEach(createWord);
    
    updateProgress();
    
    }
    //--------------------------------------------------
// CREAR PALABRAS
//--------------------------------------------------

function createWord(text){

    let div=document.createElement("div");

    div.className="word";

    div.innerHTML=text;

    div.draggable=true;

    div.addEventListener("dragstart",()=>{

        draggedWord=div;

    });

    div.addEventListener("dragend",()=>{

        draggedWord=null;

    });

    words.appendChild(div);

}
//--------------------------------------------------
// DRAG & DROP
//--------------------------------------------------

answer.addEventListener("dragover",(e)=>{

    e.preventDefault();

});

answer.addEventListener("drop",(e)=>{

    e.preventDefault();

    if(!draggedWord) return;

    const afterElement = getDragAfterElement(answer,e.clientX);

    if(afterElement==null){

        answer.appendChild(draggedWord);

    }else{

        answer.insertBefore(draggedWord,afterElement);

    }

});

words.addEventListener("dragover",(e)=>{

    e.preventDefault();

});

words.addEventListener("drop",(e)=>{

    e.preventDefault();

    if(!draggedWord) return;

    const afterElement = getDragAfterElement(words,e.clientX);

    if(afterElement==null){

        words.appendChild(draggedWord);

    }else{

        words.insertBefore(draggedWord,afterElement);

    }

});
    //--------------------------------------------------
// BARRA DE PROGRESO
//--------------------------------------------------

function updateProgress(){

    let percent=((currentQuestion+1)/questions.length)*100;
    
    bar.style.width=percent+"%";
    
    }
    //--------------------------------------------------
// SHUFFLE
//--------------------------------------------------

shuffle.addEventListener("click", shuffleWords);

function shuffleWords(){

    let cards = [...words.children];

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(card => words.appendChild(card));

}
//--------------------------------------------------
// CHECK
//--------------------------------------------------

check.addEventListener("click", checkAnswer);

function checkAnswer(){

    let response = [];

    answer.querySelectorAll(".word").forEach(word=>{

        response.push(word.innerText);

    });

    response = response.join(" ");

    if(response === questions[currentQuestion].sentence){

        correctAnswer();

    }else{

        wrongAnswer();

    }

}
//--------------------------------------------------
// RESPUESTA CORRECTA
//--------------------------------------------------

function correctAnswer(){

    points += 10;

    score.innerHTML = points;
    updateStars();

playCorrectSound();

createConfetti();

    message.innerHTML = "🎉 Excellent!";
    message.innerHTML += "<br><small>"+questions[currentQuestion].explanation+"</small>";
    message.innerHTML += "<br><small>"+questions[currentQuestion].explanation+"</small>";

    message.className = "correct";

    check.disabled = true;

    next.style.display = "inline-block";

}
//--------------------------------------------------
// RESPUESTA INCORRECTA
//--------------------------------------------------

function wrongAnswer(){

    message.innerHTML = "❌ Try Again";

    message.className = "incorrect";
    playWrongSound();

}
//--------------------------------------------------
// NEXT
//--------------------------------------------------

next.addEventListener("click", nextQuestion);

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= questions.length){

        finishGame();

        return;

    }

    loadQuestion();

}
//--------------------------------------------------
// TIMER
//--------------------------------------------------

function startTimer(){

    timer = setInterval(()=>{

        seconds--;

        time.innerHTML = seconds;

        if(seconds <= 0){

            clearInterval(timer);

            finishGame();

        }

    },1000);

}
//--------------------------------------------------
// FIN DEL JUEGO
//--------------------------------------------------

function finishGame(){

    clearInterval(timer);

    let medal="🥉";

    if(points>=20){

        medal="🥈";

    }

    if(points>=30){

        medal="🥇";

    }

    if(points===40){

        medal="🏆";

    }

    game.innerHTML = `

        <div style="text-align:center;">

            <h1 style="font-size:70px;">${medal}</h1>

            <h2>Game Finished!</h2>

            <h3>Your Score</h3>

            <h1 style="color:#4CAF50;font-size:60px;">

                ${points}

            </h1>

            <button onclick="location.reload()">

                🔄 Play Again

            </button>

        </div>

    `;

}
//--------------------------------------------------
// CALCULAR POSICIÓN
//--------------------------------------------------

function getDragAfterElement(container,x){

    const elements = [...container.querySelectorAll(".word")];

    return elements.reduce((closest,child)=>{

        const box = child.getBoundingClientRect();

        const offset = x - box.left - box.width/2;

        if(offset < 0 && offset > closest.offset){

            return{

                offset:offset,

                element:child

            };

        }

        return closest;

    },{

        offset:Number.NEGATIVE_INFINITY

    }).element;

}
//--------------------------------------------------
// ESTRELLAS
//--------------------------------------------------

function updateStars(){

    let total=Math.floor(points/10);
    
    stars.forEach((star,index)=>{
    
    if(index<total){
    
    star.classList.remove("off");
    
    }else{
    
    star.classList.add("off");
    
    }
    
    });
    
    }
    
    //--------------------------------------------------
    // CONFETTI
    //--------------------------------------------------
    
    function createConfetti(){
    
    const colors=[
    
    "#f44336",
    
    "#2196F3",
    
    "#FFC107",
    
    "#4CAF50",
    
    "#9C27B0"
    
    ];
    
    for(let i=0;i<80;i++){
    
    let div=document.createElement("div");
    
    div.className="confetti";
    
    div.style.left=Math.random()*100+"vw";
    
    div.style.background=colors[Math.floor(Math.random()*colors.length)];
    
    div.style.animationDuration=(1+Math.random()*2)+"s";
    
    document.body.appendChild(div);
    
    setTimeout(()=>{
    
    div.remove();
    
    },3000);
    
    }
    
    }
    
    //--------------------------------------------------
    // SONIDO BIEN
    //--------------------------------------------------
    
    function playCorrectSound(){
    
    const audio=new AudioContext();
    
    const osc=audio.createOscillator();
    
    const gain=audio.createGain();
    
    osc.type="triangle";
    
    osc.frequency.value=700;
    
    osc.connect(gain);
    
    gain.connect(audio.destination);
    
    gain.gain.setValueAtTime(.2,audio.currentTime);
    
    gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.3);
    
    osc.start();
    
    osc.stop(audio.currentTime+.3);
    
    }
    
    //--------------------------------------------------
    // SONIDO MAL
    //--------------------------------------------------
    
    function playWrongSound(){
    
    const audio=new AudioContext();
    
    const osc=audio.createOscillator();
    
    const gain=audio.createGain();
    
    osc.type="square";
    
    osc.frequency.value=180;
    
    osc.connect(gain);
    
    gain.connect(audio.destination);
    
    gain.gain.setValueAtTime(.2,audio.currentTime);
    
    gain.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+.4);
    
    osc.start();
    
    osc.stop(audio.currentTime+.4);
    
    }