const num_id_dict = {"zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
"five":"5", "six": "6", "seven": "7", "eight": "8", "nine": "9"};

const op_id_dict = {"add": "+", "take": "-", "multiply": "*", "divide": "/"};

const current_equation = document.getElementById("current-value-text");
const prev_ans = document.getElementById("prev-ans-text");

var equation_list = [];
var term_str = "";

Object.entries(num_id_dict).forEach(numEventListener);

function numEventListener(item){
    var id = item[0];
    var num = item[1];

    document.getElementById(id).addEventListener("click", function(){
      //alert("you have clicked " + num); 
      term_str += num;

      current_equation.innerHTML += num;
    })
}

Object.entries(op_id_dict).forEach(opEventListener);

function opEventListener(item){
  var id = item[0];
  var num = item[1];  
  document.getElementById(id).addEventListener("click", function(){

      //alert("you have clicked " + id);
      
      // add concatenated string to expression list and reset string list
      equation_list.push(term_str);
      term_str = ""

      // add operator to list
      equation_list.push(num);

      current_equation.innerHTML += num;
    })
}

document.getElementById("equals").addEventListener("click", function(){
  // add whats remaining 
  equation_list.push(term_str);
  term_str = "";

  // compute answer
  var final_equation = ""
  for(i = 0; i< equation_list.length; i++){
    final_equation += equation_list[i];
  }
  final_ans = eval(final_equation);
  
  
  prev_ans.innerHTML = final_ans;

  // clear list
  equation_list = [];

  current_equation.innerHTML = "";
})
