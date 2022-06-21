dataDiv = document.getElementById("data");
myButton = document.getElementById("button1");

myButton.addEventListener("click", function(){
    xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.weatherapi.com/v1/current.json?q=London&key=0c531e6b4837446096391931222106", true);

    xhr.onload = function(){
        if(this.status == 200){
            data = JSON.parse(this.responseText);
            console.log(data);
        }
    }
    
    xhr.send();
})