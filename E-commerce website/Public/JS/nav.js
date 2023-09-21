

const createNav = () => {
    let nav = document.querySelector('.navbar');

    nav.innerHTML = `
    <div class="nav">
    <img src="../images/logo.png" class="brand-logo" alt="">
    <div class="nav-items">
        <div class="search">
            <input type="text" class="search-box" placeholder="search brand, product">
            <button class="search-btn">search</button>
           
        </div>
        <a>
             <img src="../images/user.peg" id="user-img" alt="">
             <div class="login-logout-popup hide"> 
                  <p class="account-info">Log in as, name</p>
                  <button class="btn" id="user-btn">Log out</button>
             </div>
        </a>
        <a href="#"><img src="../images/cart.peg" alt=""></a>
    </div>
</div>
<ul class="links-container">
            <li class="link-item"><a href="#" class="link">home</a></li>
            <li class="link-item"><a href="#" class="link">women</a></li>
            <li class="link-item"><a href="#" class="link">men</a></li>
            <li class="link-item"><a href="#" class="link">kids</a></li>
            <li class="link-item"><a href="#" class="link">accessories</a></li>
        </ul>
    `;
}


createNav();

//nav popup
const userImageButton = document.querySelector('#user-img');
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
    userPopup.classList.toggle('hide');
})

window.onload = () => {
    let user =JSON.parse(sessionStorage.user || null);
    if(user != null){
        // means user is logged in
       popuptext.innerHTML = "logged in as,Manohar";
       actionBtn.innerHTML = 'log out';
       actionBtn.addEventListener('click', ()=>{
               sessionStorage.clear();
               location.reload();
       })  
    } else{
        //user is logged out
       popuptext.innerHTML = 'Sign-up to place order';
        actionBtn.innerHTML = 'Sign-up';
        actionBtn.addEventListener('click', () => {
            location.href = '/signup';
        })
    }
}