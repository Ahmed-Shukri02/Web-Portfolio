const num_id_list = ["zero", "one", "two", "three", "four", "five", "six", "seven", 
"eight", "nine"]

num_id_list.forEach(setEventListener)

function setEventListener(id){
    document.getElementById(id).addEventListener("click", function(){
      alert("you have clicked " + id); 
    })
}

document.getElementById("zero").addEventListener(onclick, function(){
    alert("you clicked zero");
})