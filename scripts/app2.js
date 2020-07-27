const startButton = document.querySelector('.start-button');
const displayTimer = document.querySelector('.timer');
const displayCounter = document.querySelector('.counter');
const setSituation = document.querySelector('.name_situation');
let currentTimeLeft = 10;
const workTimeSession = 10;
const breakTimeSession = 5;
const longBreakTime = 8;
let isTimeRunning = false
let clockTimer = null;
let counter = 0;
let isWorking = false;
setSituation.textContent = "";


const toggleClock = () =>{
    //debugger;
    if(isTimeRunning === false){
        setSituation.textContent = "Focus";
        clockTimer = setInterval(
            () => {
              currentTimeLeft --;
              if(currentTimeLeft ===0){
                  clearInterval(clockTimer);
                  startButton.textContent = "start";
                  isWorking = true;
                  setCounter();
              }
              displayCurrentTimeLeft();
            },1000  
          )
        startButton.textContent = "Pause";
        //startSetInterval();
        isTimeRunning = true;
        //isWorking = true;
    } 
    else{
        clearInterval(clockTimer);
        isTimeRunning = false;
        startButton.textContent = "Start";
    }
    
}


const displayCurrentTimeLeft = () =>{
    let time = currentTimeLeft;
    let seconds = time % 60 ;
    let minutes = Math.floor( time / 60 );
    const addZeroToTime = (times)=>{
        return times<10 ? `0${times}`: times;
    }
    let result = `${addZeroToTime(minutes)} : ${addZeroToTime(seconds)}`;
    displayTimer.textContent = result;
}

const startShortBreakTime = () => {
    //debugger;
    currentTimeLeft = breakTimeSession;
    setSituation.textContent = "Short Break";
    clockTimer = setInterval(
        () => {
          currentTimeLeft --;
          if(currentTimeLeft ===0){
              clearInterval(clockTimer);
              startButton.textContent = "start";
              currentTimeLeft = workTimeSession;
              isTimeRunning = false;
              isWorking = false;
              startButton.disabled = false;
          }
          displayCurrentTimeLeft();
        },1000  
    )
    startButton.textContent = "pause";
    isWorking = true;
    startButton.disabled = true;

}
const startSetInterval = () =>{
    clockTimer = setInterval(
        () => {
          currentTimeLeft --;
          if(currentTimeLeft ===0){
              clearInterval(clockTimer);
              startButton.textContent = "start";
              isWorking = true;
          }
          displayCurrentTimeLeft();
        },1000  
      )
}

const setCounter = () =>{
    counter ++;
    displayCounter.innerHTML = `${counter} / 4 `;
}

const startLongBreak = ()=>{
    currentTimeLeft = longBreakTime;
    setSituation.textContent = "Long Break";
    //startSetInterval();
    clockTimer = setInterval(
        () => {
          currentTimeLeft --;
          if(currentTimeLeft ===0){
              clearInterval(clockTimer);
              startButton.textContent = "start";
              isTimeRunning = false;
              isWorking = false;
              counter = 0;
              currentTimeLeft = workTimeSession;
              displayCounter.textContent = "0 / 4"
        
          }
          displayCurrentTimeLeft();
        },1000  
      )
    //isWorking = false;
    //isTimeRunning = false;
}

startButton.addEventListener('click', () => {
    debugger;
    if(isWorking === false){
        toggleClock();
    }
    else{
        if(counter ===4){
        startLongBreak();
        }
        else{
            startShortBreakTime();
        }
    }
});


