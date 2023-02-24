import { app, gebi} from "../main.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

let auth = getAuth(app),frm = document.forms[0];


frm.onsubmit = (e)=>{
    e.preventDefault();
    let email = frm.email.value,password= frm.password.value,datCoki= new Date();
    datCoki.setDate(365);
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
      // Signed in 
      document.cookie='enter=enter;expires='+datCoki+';path=/';
      window.open('add','_self','','false')
  })
  .catch((error) => {
    //console.log(error.code)
    if(error.code == 'auth/user-not-found'){
      gebi('errEmail').style.display = 'block';
      setTimeout(() => {
        gebi('errEmail').style.display = 'none';
      }, 2000);
    }else if(error.code == 'auth/wrong-password'){
      gebi('errPaswrd').style.display = 'block';
      setTimeout(() => {
        gebi('errPaswrd').style.display = 'none';
      }, 2000);
    }
  }); 
}

 
/* 
  ,createUserWithEmailAndPassword
import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
createUserWithEmailAndPassword(auth, 'confirmationpages896@gmail.com', 'confirmPAGE48.')
.then((userCredential) => {
    // Signed in 
    console.log('cryaha');
})
.catch((error) => {
  console.log(error.code);
});
 */