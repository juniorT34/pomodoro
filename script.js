const workTime = document.querySelector('#workTime')
const breakTime = document.querySelector('#breakTime')
const startBtn = document.querySelector('#play img')
const resetBtn = document.querySelector('#reset')
const cycle = document.querySelector('#cycle');
// 30 * 60 and 5 * 60
let initialTime = 1800;
// let initialTime = 3;
let restTime = 300;
//for button state
let pause = true;
//return value of setInterval
let timerId;
//number of cycle
let countCycle = 0;
// cycle = 0;
let currentInterval = false;
function returnFormattedTime(time){
    return `${Math.trunc(time/60)}:${time % 60 < 10 ? `0${time % 60}` : time % 60}`
}

workTime.textContent = returnFormattedTime(initialTime)
breakTime.textContent = returnFormattedTime(restTime)

startBtn.addEventListener('click',togglePomo);
resetBtn.addEventListener('click',reset);

function togglePomo(){
    handlePlayPause(startBtn);
    if(currentInterval) return;
    currentInterval = true;
    initialTime--;
    workTime.textContent = returnFormattedTime(initialTime);
    timerId = setInterval(handleTicks,1000);
}

function handlePlayPause(btn){
    if(btn.src.includes('play')){
        btn.src = "assets/pause.svg"
        pause = false;
    }else{
        btn.src = "assets/play.svg"
        pause = true;
    }
}

function handle(item){
    if(item.classList.contains('active')){
        item.classList.remove('active');
    }else{
        item.classList.add('active');
    }
}
function handleTicks(){
    let currentInit = 0
    let currentRest = 0
    if(!pause && initialTime > 0){
        initialTime--;
        currentInit = initialTime;
        workTime.textContent = returnFormattedTime(initialTime);
        handle(document.querySelector('.working'));
    }else if(!pause && initialTime === 0 && restTime > 0){
        restTime--;
        currentRest = restTime;
        breakTime.textContent = returnFormattedTime(restTime)
        handle(document.querySelector('.resting'));
    }else if(pause && initialTime > 0){
        workTime.textContent = returnFormattedTime(initialTime) = currentInit;
        handle(document.querySelector('.working'));
    }else if(pause && restTime > 0){
        breakTime.textContent = returnFormattedTime(restTime) = currentRest;
        handle(document.querySelector('.resting'));
    }else{
        initialTime = 1800;
        restTime = 300;
        workTime.textContent = returnFormattedTime(initialTime);
        breakTime.textContent = returnFormattedTime(restTime);
        handle(document.querySelector('.resting'));
        handle(document.querySelector('.working'));
        countCycle++;
        cycle.textContent = `${countCycle}`;
    }
}

function reset(){
    initialTime = 1800;
    restTime = 300;
    workTime.textContent = returnFormattedTime(initialTime);
    breakTime.textContent = returnFormattedTime(restTime);
    document.querySelector('.resting').classList.remove('active')
    document.querySelector('.working').classList.remove('active')
    btn.src = "assets/play.svg"
    cycle.textContent = 0
    clearInterval(timerId);
    currentInterval = false;
}