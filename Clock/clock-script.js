timerHolder = document.getElementById("timer-text");

function UpdateTime(){
    var time = new Date();

    var current_hour = time.getHours() < 10? "0" + time.getHours(): time.getHours();
    var current_minute = time.getMinutes() < 10? "0" + time.getMinutes(): time.getMinutes();
    var current_second = time.getSeconds() < 10? "0" + time.getSeconds(): time.getSeconds();

    var current_time =current_hour + ":" + current_minute + ":" + current_second;


    time_text = current_time;

    timerHolder.innerHTML =  time_text;

    setTimeout(UpdateTime, 1000);
}

UpdateTime();