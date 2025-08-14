  //firebase configurations
const firebaseConfig = {
    apiKey: "AIzaSyCNY9zun-ZR1d_yofw2gI0kh3FW-BhqaOk",
    authDomain: "auth-app-da4c2.firebaseapp.com",
    projectId: "auth-app-da4c2",
    storageBucket: "auth-app-da4c2.firebasestorage.app",
    messagingSenderId: "487199440116",
    appId: "1:487199440116:web:e031727e919159fa46b2a1",
    measurementId: "G-4XF5QC71JN"
  };

  //initialize firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

//DOM elements
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const forgotPasswordLink = document.getElementById('forget-password');
const forgotPasswordModal = document.getElementById('forgot-password-modal');
const closeModel = document.querySelector('.close-modal');
const toast = document.getElementById('toast');
const resetPasswordForm = document.getElementById('reset-password-form');
const toastMessage = document.getElementById('toast-message');

//Event Listeners
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = 'block';
});
closeModel.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
});


signupForm.addEventListener('submit', (e) => {
   e.preventDefault();
    //signup process
    const name= signupForm['signup-name'].value;
    const email= signupForm['signup-email'].value;
    const password= signupForm['signup-password'].value;
    const confirmPassword= signupForm['signup-confirm-password'].value;

    //validation part
    if(password !==confirmPassword){
        console.log('Password do not match');
        return;
    }
    //create user with firebase
   auth.createUserWithEmailAndPassword(email,password)
   .then((userCredential)=>{
    //update user profile with name 
    return userCredential.user.updateProfile({
        displayName:name
    });
   })
   .then(()=>{
    showToast('Account created successfully')
    signupForm.reset();
    container.classList.remove('right-panel-active');
   })
   .catch((error)=>{
    showToast(error.message, 'error');
   })
}); 

//Sign In
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password)
    .then(()=>{
        showToast('Logged in successfully!!', 'success');
        loginForm.reset();
        //redirect to dashboard
        window.location.href = 'dashboard.html'
    })
    .catch((error)=>{
        showToast(error.message,'error');
    });
});

function showToast(message, type){
   toastMessage.textContent = message;
   toast.className = 'toast show'
 
   if(type){
    toast.classList.add(type);
   }
   setTimeout(()=>{
     toast.className = toast.className.replace('show', '');
     if(type){
        toast.classList.remove(type);
     }
   },3000);
}

//auth state observer
auth.onAuthStateChanged((user) => {
    if(user){
        //user signed in
        window.location.href = 'dashboard.html';
    }else{
        //user is signed out
        window.location.href = 'index.html';
    }
})