/*
===========================
    MEDIA QUERY FOR PAGE
===========================
*/

const medQuery = window.matchMedia("(max-width: 650px)");
var disabledInfo = document.querySelectorAll(".online, .email");

function handleChange(e){
    if(e.matches){
        // small screen, disable all unnecesary info
        for(let info of disabledInfo){
            info.style.display = "none";
        }
    }
    else{
        for(let info of disabledInfo){
            info.style.display = "block";
        }
    }
}

medQuery.addListener(handleChange);

handleChange(medQuery);


/*
===========================
    AUTO-RESIZE TEXTAREA
===========================
*/

const txtBox = document.querySelectorAll("#text");

for (let box of txtBox){
    console.log(box);
    
    box.style.height = box.scrollHeight + "px"
    box.style.overflowY = "hidden";
    
    box.addEventListener("input", setHeight);
}

function setHeight(){
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}



/*
===========================
    Texting app
===========================
*/

// get form and container
const messageForm = document.querySelector("form");
const container = document.querySelector("#text-app");

messageForm.addEventListener("submit", function(e){
    e.preventDefault();

    // instantiate a card to be added into textApp container
    container.innerHTML += 
    '<div class="card">' +
        '<div class="about">' +
            '<img src="./background-image.jpg" class="image"></img>' +
            '<div class="info">' +
                '<div class="username"> Ahmed </div>' +
                '<div class="online">Online</div>' +
                '<div class="email">Ashu@gmail.com</div>' +
            '</div>' +
        '</div>' +
        '<div class="text">' + txtBox[0].value +'</div>' +
    '</div>';

    // clear the textbox
    txtBox[0].value = "";
    container.scrollTo({top: container.scrollHeight, left: 0, behaviour: "smooth"});
})