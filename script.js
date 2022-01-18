
//shortcuts
const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var interval;
var timerRunning = false;
//keyboard detect
testArea.addEventListener("keypress", startTimer, false);

var timer = [0,0,0,0];
function runTimer(){
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100)-(timer[0]*60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}
//timer start
function startTimer(){
    let textEnteredLength = testArea.value.length;
    if(textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer, 10)
    }
    console.log(textEnteredLength)
}

function leadingZero(time){
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

//keyboard release detect
testArea.addEventListener("keyup", checkInput, false);

//spelling check
function checkInput(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0,textEntered.length);

    if(textEntered == originText){
        clearInterval(interval)
        testWrapper.style.borderColor = "#00b300"
    }else{
        if(textEntered == originTextMatch){
            testWrapper.style.borderColor = "#677fcc"
        }else{
            testWrapper.style.borderColor = "orange"
        }
    }
    console.log(textEntered)
}   

//reset detect
resetButton.addEventListener("click", reset, false);

//reset function
function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "rgb(235, 237, 250)"
}

