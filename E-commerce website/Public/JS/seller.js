let loader = document.querySelector('.loader');

const becomeSellerElement = document.querySelector('.become-seller');
const applyForm = document.querySelector('.apply-form');
const showApplyFormBtn = document.querySelector('#apply-btn');


window.onload = () =>{
   if(sessionStorage.user){
    let user = JSON.parse(sessionStorage.user);
    if(compareToken(user.authToken,user.email)){
       becomeSellerElement.classList.remove('hide');
    }
}else{
    location.replace('/signup');
}
}

showApplyFormBtn.addEventListener('click', () => {
    becomeSellerElement.classList.add('hide');
    applyForm.classList.remove('hide');
})

//form submission

const applyFormButton = document.querySelector('#apply-form-btn');
const businessName = document.querySelector('#business-name');
const address = document.querySelector('#business-add');
const about = document.querySelector('#about');
const number = document.querySelector('#number');
const tac = document.querySelector('#terms-and-cond');
const legitInfo = document.querySelector('#legitInfo');

applyFormButton.addEventListener('click', () => {
    if(!businessName.value.length || !address.value.length || !about.value.length || !number.value.length){
       showAlert('fill all the inputs');
    }else if(!tac.checked || !legitInfo.checked){
        showAlert('you must agree to our terms and conditions');
    }else{
        //making server request
        loader.style.display = 'block';
        sendData('/seller',{
            name:businessName.value,
            address:address.value,
            about:about.value,
            number:number.value,
            tac:tac.checked,
            legit:legitInfo.checked,
            email:JSON.parse(sessionStorage.user).email
        })
    }
})





// send data function
const sendData = (path, data) => {
    fetch(path, {
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(data)
    }).then((res) => res.json())
    .then(response => {
        processData(response);
    })
}

const processData = (data) => {
    console.log(data);
    loader.style.display = null;
    if(data.alert){
        showAlert(data.alert);
    }else if(data.name){
        data.authToken = generateToken(data.email);
        sessionStorage.user = JSON.stringify(data);
        location.replace('/');

    }else if(data== true){
        //seller page
        let user = JSON.parse(sessionStorage.user);
        user.seller = true;
        sessionStorage.user = JSON.stringify(user);
        location.reload('/seller');
    }

    }
//alert messages
// alert function
const showAlert = (msg) => {
    let alertBox = document.querySelector('.alert-box');
    let alertMsg = document.querySelector('.alert-msg');
    alertMsg.innerHTML = msg;
    alertBox.classList.add('show');
    setTimeout(() => {
        alertBox.classList.remove('show');
    }, 3000);
}



