const nameInput=document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success"); 
const errorNodes = document.querySelectorAll(".error");

function ValidateForm(){
    clearMessages();
    let error =false;
    if(nameInput.value.length<1){
        errorNodes[0].innerText="Write your name";
        nameInput.classList.add("error-border");
        error=true;
    }
    if(!emailIsValid(email.value)){
        errorNodes[1].innerText="Invalid Email";
        email.classList.add("error-border");
        error=true;
    }
    if(message.value.length<1){
        errorNodes[2].innerText="Please enter message";
        message.classList.add("error-border");
        error=true;

    }
    if(!error){
        success.innerText = "Success";
    }
}

function clearMessages(){
    for(let i = 0; i< errorNodes.length; i++){
        errorNodes[i].innerText ="";
    }
    success.innerText="";
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");
}
function emailIsValid(){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}
export default ValidateForm;