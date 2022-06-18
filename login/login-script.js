var SignUp = document.querySelectorAll(".login-form")[0];
var Login = document.querySelectorAll(".login-form")[1];

var toSign = Login.querySelector(".switch");
var toLogin = SignUp.querySelector(".switch");

toSign.addEventListener("click", function(){Toggle(Login, SignUp)});
toLogin.addEventListener("click", function(){Toggle(SignUp, Login)});

// initialise by having login form visible and addin eventlistener to both
Toggle(SignUp, Login);
addFormListeners([SignUp, Login]);


function addFormListeners(form_list){
    for(var i =0; i<form_list.length; i++){
        (function(){
            let form = form_list[i];

            // grab elements of the three buttons
            var submitButton = form.querySelector(".submitButton");
            var backButton = form.querySelector(".backButton");

            submitButton.addEventListener("click", function(){
                submitButton.disabled = true;
                backButton.disabled = true;

                if(form.checkValidity()){
                    // if error div is present then remove it
                    errorDiv = form.querySelector(".errorDiv");
                    if(errorDiv != null) errorDiv.remove(); 

                    // get ready for script and server-side validation
                    submitForm(form)

                }
                else{
                    submitButton.disabled = false;
                    backButton.disabled = false;
                    
                    // do nothing if error message is already there
                    if(form.querySelector(".errorDiv") != null){
                        // do transition where text flashes or smth 


                        return
                    };
                    
                    // add new div and the content
                    newDiv = document.createElement("div");
                    newDiv.setAttribute("class", "errorDiv")
                    content = document.createTextNode("Form invalid, please try again");

                    // add text to new div and insert right after consent checkbox
                    consentBox = form.querySelector("#consent");
                    newDiv.append(content);
                    form.insertBefore(newDiv, submitButton.parentElement);
                }

            });
        }());

    }
    
}


function submitForm(lForm){
    // add div to cover login form 
    coverDiv = document.createElement("div")
    
    //create text and its contents
    loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loadingDiv");
    text = document.createTextNode("Loading...");
        
    // add text to div and div to container for animation to run
    loadingDiv.append(text);
    coverDiv.append(loadingDiv);

    coverDiv.classList.add("cover", "cover-faded");
    lForm.append(coverDiv);
    

    // submit form
    setTimeout(function(){
        lForm.submit();

    }, 3000);
}

function Toggle(from, to){
    // start by disabling all the content on the from object and then the object itself
    from.style.display = "none";

    // then enable the object and all of the children nodes of the other one
    to.style.display = "grid";
}



