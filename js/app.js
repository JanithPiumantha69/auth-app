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
const forgetPasswordLink = document.getElementById('forget-password');

//Event Listeners
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

signupForm.addEventListener('submit', (e)=>{
    e.preventDefault(); //stop form submission
    
    //sign up process
    const name =signupForm['signup-name'].value;
    const email =signupForm['signup-email'].value;
    const password =signupForm['signup-password'].value;
    const confirmPassword =signupForm['signup-confirm-password'].value;

    //validate password
    if(password !== confirmPassword){
        console.log('Password do not match');        
        return;
    }

    //create user with firebase auth
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        //update user profile with name
        return userCredential.user.updateProfile({
            displayName: name
        });
    }) 
    .then(()=>{
        console.log('Account created successfully');
        signupForm.reset();
        container.classList.remove('right-panel-active');
    })       
    .catch((error)=>{
        console.log('Error: ${error.message}');
    });

});