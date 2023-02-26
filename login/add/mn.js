import { app, database, ref, gebi, child, get } from "../../main.js";
import { push, update, remove, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
const auth = getAuth(app); const dbRef = ref(database);
const edtSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.3 8.925-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Z"/></svg>';
let frm = document.forms[0], idUpdt = '', aSn = {valed: {}, Fake: {} }, vUp = { lvrvaled: 0, lvrFake: 0 }, stId,vlFk;

gebi('logaut').onclick = () => {
  signOut(auth).then(() => { 
    let datCoki = new Date();
    datCoki.setDate(-1);
    document.cookie = 'enter=;expires=' + datCoki + ';path=/';
    window.open("../", '_self');
   });
}

/* get Upload */
get(child(dbRef, "updatV/")).then(e => {
  vUp.lvrvaled = e.val().vrvaled;
  vUp.lvrFake = e.val().vrFake
})

/* function zFill(nm,width) {
   nm = ''+nm ;
  while (nm.length < width) {
    nm = '0' + nm
  }
  return nm
} */


frm.onsubmit = (e) => {
  e.preventDefault();
  let namePg = frm.namePg.value, lienPg = frm.lienPg.value, nmbrCcpPg = frm.nmbrCcpPg.value,
    emailPg = frm.emailPg.value, chPg = frm.chPg.value, inf = frm.inf.value,rsltCcp = false;
    idUpdt =frm.idUpdt.value;
  namePg = namePg.trim(); lienPg = lienPg.trim(); nmbrCcpPg = nmbrCcpPg.trim();
  emailPg = emailPg.trim();
if (namePg == '') {
  namePg='بدون إسم'
}
  /* Start  facebook*/
  let inFcbk = lienPg.indexOf('facebook.com');
  if (inFcbk < 0 && lienPg.length > 0) {
    gebi('msageUrl').style.display = 'block';
    setTimeout(() => {
      gebi('msageUrl').style.display = 'none';
    }, 2000);
    return 0
  } else if (inFcbk > -1) {
    lienPg = lienPg.slice(inFcbk + 13, lienPg.length)
  }

  /* End  facebook*/
  /* Start verefail CCP Compte */
  if (!isNaN(nmbrCcpPg) && nmbrCcpPg.indexOf(' ') < 0) {

    if (nmbrCcpPg.length == 12) {
      if (nmbrCcpPg.indexOf('00') == 0) { rsltCcp = true; nmbrCcpPg = nmbrCcpPg.slice(2, nmbrCcpPg.length) }
    } else if (nmbrCcpPg.length == 20) {
      if (nmbrCcpPg.indexOf('0079999900') == 0) { rsltCcp = true; nmbrCcpPg = nmbrCcpPg.slice(10, nmbrCcpPg.length) }
    } else if (nmbrCcpPg.length == 10) { rsltCcp = true }

  }
  if (rsltCcp == false && nmbrCcpPg.length > 0) {
    gebi('msageCcp').style.display = 'block';
    setTimeout(() => {
      gebi('msageCcp').style.display = 'none';
    }, 2000);
    return 0
  }
  /* End verefail CCP Compte */

  if (inFcbk < 0 && lienPg.length > 0) { return 0 }

  if (idUpdt == '' || vlFk == chPg) {
    vUp['lvr'+chPg]++;
    set(ref(database, 'updatV/vr'+ chPg), vUp['lvr'+chPg])
    .then(()=>{
      if (idUpdt == '') {
        stId = 'P' + vUp['lvr'+chPg];
        apdorSt(set);
      } else {
        stId = idUpdt;
        apdorSt(update);
      }
    });
   

  } else {
    vUp.lvrvaled++; vUp.lvrFake++;
    set(ref(database, 'updatV/vrvaled'), vUp.lvrvaled);
    set(ref(database, 'updatV/vrFake'), vUp.lvrFake)
    .then(()=>{
      stId = 'P' +vUp['lvr'+chPg];
      remove(child(dbRef, idUpdt));
      apdorSt(set);
    });
    
  }

  function apdorSt(uppSt) {
    aSn[chPg][stId] = { 0: namePg, 1: lienPg, 2: nmbrCcpPg, 3: emailPg, 4: inf }
    uppSt(ref(database, chPg + '/' + stId),aSn[chPg][stId])
      .then(() => {
        gebi('vlpush').style.display = 'block';
        setTimeout(() => {
          gebi('vlpush').style.display = 'none';
        }, 2000);

        frm.reset();
        let childdv;
        childdv = document.createElement('div');
        childdv.className = 'dvPlc';
        
        if ( vlFk == chPg || idUpdt == '') {
          if (idUpdt == '') {
            gebi(`list${chPg}`).innerHTML += dvUpdt(chPg, stId, aSn[chPg][stId]);
          } else {
            gebi(chPg + '/' + idUpdt).outerHTML = dvUpdt(chPg, stId, aSn[chPg][stId]);
            // idUpdt = ''; 
            upAdd();
          }
        } else {
          remove(child(dbRef, vlFk+'/'+idUpdt));
          gebi(vlFk+'/'+idUpdt).remove();
          upAdd();
          gebi(`list${chPg}`).innerHTML += dvUpdt(chPg, stId, aSn[chPg][stId]);
        }
        function upAdd() {
          gebi('supmt').innerText = 'التعديل';
          frm.sub.value= 'إضافة';
            setTimeout(() => {
              gebi('supmt').innerText = 'الإضافة';
            }, 3000);
        }
      })
      .catch((e) => {
        gebi('errpush').style.display = 'block';
        console.log(e);
        setTimeout(() => {
          gebi('errpush').style.display = 'none';
        }, 2000);
      });
  }
}

function dvUpdt(chPg, stId, aSn) {//{ 0: namePg, 1: lienPg, 2: nmbrCcpPg, 3: emailPg  }
  let fblien = aSn[1].length > 0 ? 'href="https://www.facebook.com/' + aSn[1]+'" target="_blank"' : '',
    prNmCcp = aSn[2].length > 0 ? '0079999900' + aSn[2] : '';
  return `<div id="${chPg}/${stId}" class="dvPlc ${chPg}">
  <span class="cntnr">
  <span  onclick="dltdiv('${chPg}/${stId}')" class="clear" >×</span>
  <a href="#input-box" class="mdfSVG" onclick="upVlu('${chPg}','${stId}')">${edtSVG}</a>
  </span>
  <div class="normal">
    <h2><a ${fblien}> ${aSn[0]}</a></h2><strong>:الايميل</strong> <br> ${aSn[3]}<br><br>
  <strong> :رقم الحساب البريدي </strong><br> ${prNmCcp}<br><br>
  <strong> :معلومات عن الحساب</strong><br> ${aSn[4]}
  </div>
  </div>`
}
/* ############################# result ########################################### */
/* let mydt = 'i'+new Date()*1;
console.log(mydt);
 */


let cmprNmbr = (a, b)=> a.slice(1) - b.slice(1);
rslt('valed');
rslt('Fake');

function rslt(chPg) {
  get(child(dbRef, `${chPg}/`)).then((snp) => {
    /* snp =>  = snapshot */
    if (snp.exists()) {
      let lstPg = '', kys=Object.keys(snp.val());
      kys.sort(cmprNmbr);
      aSn[chPg] = snp.val();
      kys.forEach(e=>{
        lstPg += dvUpdt(chPg, e, aSn[chPg][e]);
      });
      gebi(`list${chPg}`).innerHTML = lstPg;
     
    } else {
      gebi(`list${chPg}`).innerText = "No data available";
    }
    if (chPg == 'Fake') {
      gebi("plWt").className = "n";
      gebi("lod").className = "n";
    }
  })
  
} 



function upVlu(chPg, stId) {
  let fblien = aSn[chPg][stId][1].length > 0 ? 'https://www.facebook.com/' + aSn[chPg][stId][1] : '',
    prNmCcp = aSn[chPg][stId][2].length > 0 ? '0079999900' + aSn[chPg][stId][2] : '';
  vlFk = chPg;
  frm.namePg.value = aSn[chPg][stId][0]; frm.lienPg.value = fblien;
  frm.nmbrCcpPg.value = prNmCcp; frm.emailPg.value = aSn[chPg][stId][3];
  frm.inf.value =aSn[chPg][stId][4];
  frm.chPg.value = chPg; frm.sub.value = 'تعديل';frm.idUpdt.value = stId;
  gebi('supmt').innerText = 'التعديل';
}

function dltdiv(stId) {
  remove(child(dbRef, stId));
  gebi(stId).remove();
}

window.upVlu = upVlu;
window.dltdiv = dltdiv;
document.querySelectorAll('.h2lst').forEach(el => {
  el.onclick = (e) => {
    let nxtEl = el.nextElementSibling;
    if (nxtEl.style.display == "flex") {
      nxtEl.style.display = "none";
      el.firstElementChild.innerHTML = '▼'
    } else {
      nxtEl.style.display = "flex";
      el.firstElementChild.innerHTML = '▲';
      setTimeout(() => {
        window.scrollTo(0, e.layerY);
      }, 20);
    }

  }
})
/*   let allCcp =
 '1971441301 1857380650 2429688895 2848267563 1673385715 2877269205 0195904704 2559427074 1783284096 0174793721 2905768872 2809847124 1984284683 2673558729 2384063005 1912355788 2491897323 2939317292 1933475210 2397636215 2951239465 2630874849 2802653216 1965521682 2933880830 2877269205 2902255726 1946017795 1577203813 2833459737 2671626489 2294115487 2576733717 2502646572 2590194116 1805676546 2369801483 1919371410 2621214813 2637712670 2832471695 1864448652 2467592421 1427403124 2614488348 2362671789 2905375537 2699574032 2961918389 2475944024 1696332326 0615282652 0434914256 2590194116 1805676546 00799999002369801483 1919371410 2621214813 2637712670 2989463479 2832471695 1864448652 2808685646 2698409741 2465436790 2230422377 2916191522 2873674482 1862877640 2636636455 2808150109 1769743381 1587392208 2845857210 1990355913 2065331190 1990355913 2805872161 2373829796 2877269205 2678775649 0055634459 1970098530 2575197431 2673558729 2905375537 2858839302 2902190736 2804860839 1348157325 2807659928 2765285324'
,arrAllC=allCcp.split(' '),call=0;
//set(ref(database, 'updatV/vrFake'), vUp.lvrvaled);
 arrAllC.forEach(e=>{
  vUp['lvrFake']++;stId='P'+vUp['lvrFake']
  aSn.Fake[stId] = { 0: '', 1: '', 2: e, 3: '', 4: '' }
    hgh(ref(database, 'Fake/'+stId),aSn.Fake[stId])
      .then(()=>{
        call++;
        console.log(call);
      });
}) 
 */
/* onAuthStateChanged(auth,user=>{
  if (user == null) {
    document.cookie = 'UsrEmail=;expires=' + datCoki + ';path=/';
    window.open('../','_self')
  }
}) */

/* end valedat sign in */


/* const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  }); */

/* const auth =getAuth(app);

})

//vldSgnIn();
function vldSgnIn() {
  let alcokis = document.cookie, mailCoki = '', psCoki = '';
  // alcokis = alcokis.replaceAll('=','=');
  alcokis = alcokis.split('; ')
  alcokis.forEach(e => {
    mailCoki = cokif(e, 'UsrEmail=', mailCoki);
    psCoki = cokif(e, 'UsrPassword=', psCoki);
  })

  function cokif(e, name, elck) {
    if (e.indexOf(name) > -1) {
      elck = e.substring(name.length , e.length)
    }
    return elck
  }


  signInWithEmailAndPassword(auth, mailCoki, psCoki)
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      window.open('../?resignIn','_self','','false')
    });
}

//writeUserData() ;
/*writeUserData(/* 'abdou2Id',/  'abdou2', 'abdou2@gmail.com', 'slimani abdelhadi zuin') 47
 */
//writeUserData() ;
/* 
function writeNewPost(uid, username, picture, title, body) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return update(ref(db), updates);
}

  get data 
  const dbRef = ref(database);
get(child(dbRef, `valedat/`)).then((snp) => {
  if (snp.exists()) {
    let myarr = [];
    snp.forEach(e => {
      myarr.push(e.val());
      console.log(e.key);
    });
    console.log(myarr);
    console.log(myarr.indexOf('abdou@gmail.com',0));
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
}); 

 */