var SignUp = document.querySelectorAll(".login-form")[0];
var Login = document.querySelectorAll(".login-form")[1];

var toSign = Login.querySelector(".switch");
var toLogin = SignUp.querySelector(".switch");

toSign.addEventListener("click", function(){Toggle(Login, SignUp)});
toLogin.addEventListener("click", function(){Toggle(SignUp, Login)});

// initialise by having login form visible and addin eventlistener to both
Toggle(SignUp, Login);
addFormListeners([SignUp, Login]);

const formErrors = {emptyField: "field is empty, try again", shortPass: "password \
needs to be at least 8 characters", noRadio: "Please select one", noCheck: "\
checkbox needs to be checked", emailError: "Please enter a valid email"};


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
                    
                    // find the parameter(s) that have not been met
                    setErrors(form);
                    
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

function setErrors(form){
    var formData = new FormData(form);

    //begin by removing all error elements
    for(var errorElem of document.querySelectorAll(".error")){
        errorElem.remove();
    }
    
    // set condition for adding errors: there should be an existing element and also 
    //no previous error
    genderCondition = (form.querySelector("#gender-block") != null && form.querySelector(".noRadio") == null);
    consentConsition = (form.querySelector("#consent-box") != null && form.querySelector(".noConsent") == null);

    formKeys = Array.from(formData.keys());
    if(!formKeys.includes("gender") && genderCondition){
        // find gender radio and its parent
        let genderRadio = document.getElementById("male");
        InsertError(form, formErrors.noRadio, genderRadio, errorType = "noRadio");
    }
    
    // check if checkbox has not been checked
    if(!formKeys.includes("consent") && consentConsition){
        let consentBox = document.getElementById("consent");
        InsertError(form, formErrors.noCheck, consentBox, errorType = "noConsent");
    }
    
    // for everything else, check if format is valid
    for(var [key, value] of formData){
        
        // check for keys with invalid data
        console.log(key);
        switch(key){
            case "email":
                // check if email is valid
                console.log("adding email error from " + form.id);
                let email = form.elements["email"];

                if(!email.checkValidity()){ InsertError(form, formErrors.emailError, email); }
                else if(value.length == 0){ InsertError(form, formErrors.emptyField, email); }
                continue;

            case "fname":
                // check if field is not empty
                console.log("adding fname error from " + form.id);
                let fname = form.elements["fname"];
                console.log(fname);
                if(value.length == 0){ InsertError(form, formErrors.emptyField, fname); }
                continue;

            case "lname":
                console.log("adding lname error from " + form.id);
                let pass = form.elements["lname"];
                console.log(key + "is equal to lname");
                if(value.length == 0){ InsertError(form, formErrors.emptyField, pass)}
                continue;

        }

    }

}

function InsertError(form, message, input, errorType = ""){
    let parent = input.parentElement;
    //console.log(parent.id, form.id);

    // create div with checkbox error tect
    formError = document.createElement("div");
    formErrorText = document.createTextNode(message);
    formError.style.paddingTop = "1rem";
    formError.style.color = "red";
    formError.setAttribute("class", "error " + errorType);
    formError.append(formErrorText);

    // add error div 
    form.insertBefore(formError, parent)
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



