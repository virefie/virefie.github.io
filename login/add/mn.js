import { app, database, ref, gebi, child, get } from "../../main.js";
import { push, update, remove, set } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js"
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
const auth = getAuth(app); const dbRef = ref(database);
const edtSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.3 8.925-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Z"/></svg>';
let frm = document.forms[0], idUpdt = '', aSn = {valed: {}, Fake: {} }, vUp = { lvrvaled: 0, lvrFake: 0 }, stId,vlFk,emls=[],fcbs=[],ccps=[];

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
if (!namePg && lienPg) {
  namePg='بدون إسم'
}
  /* Start  facebook*/
  let inFcbk = lienPg.indexOf('facebook.com');
  if (inFcbk < 0 && lienPg.length > 0) {  // >   
    afchHdn('msageUrl','لديك خطأ في الرابط')
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
    afchHdn('msageCcp','Ccp لديك خطأ في كتابة رقم')
   
    return 0
  }
  /* End verefail CCP Compte */

  if (inFcbk < 0 && lienPg.length > 0) { return 0 }

  if (!idUpdt || vlFk == chPg) {
    /* Start chek is set or no */
    if (!idUpdt && isSet() ) {return 0}
    /* End chek is set or no */
    vUp['lvr'+chPg]++;
    set(ref(database, 'updatV/vr'+ chPg), vUp['lvr'+chPg])
    .then(()=>{
      if (!idUpdt) {
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
        afchHdn('vlpush','تم <span id="supmt">الإضافة</span> بنجاح') 

        frm.reset();
        let childdv;
        childdv = document.createElement('div');
        childdv.className = 'dvPlc';
        
        if ( vlFk == chPg || !idUpdt) {
          if (!idUpdt) {
            gebi(`list${chPg}`).innerHTML += dvUpdt(chPg, stId, aSn[chPg][stId]);
          } else {
            gebi(chPg + '/' + idUpdt).outerHTML = dvUpdt(chPg, stId, aSn[chPg][stId]);
            // idUpdt = ''; 
            upAdd();
          }
        } else {
          remove(child(dbRef, vlFk+'/'+idUpdt));
          gebi(vlFk+'/'+idUpdt).remove();
          delete emls[1];delete fcbs[1];delete ccps[1];
          upAdd();
          gebi(`list${chPg}`).innerHTML += dvUpdt(chPg, stId, aSn[chPg][stId]);
        }
        function upAdd() {
          frm.sub.value= 'إضافة';
          afchHdn('msageCcp','التعديل','الإضافة')
        }
      })
      .catch(() => { afchHdn('errpush','حدث خطأ أعد المحاولة')});
  }
/*  */
  function isSet() {
    if (emailPg && emls.includes(emailPg) ) {
      afchHdn('msageEmail','هدا الإميل موجود من قبل')
      return true
    }
    if (lienPg && fcbs.includes(lienPg)) {
      afchHdn('msageCcp','هدا الرابط موجود من قبل')
      return true
    }
    if (nmbrCcpPg && ccps.includes(nmbrCcpPg) ) {
      afchHdn('msageCcp','هدا الحساب موجود من قبل')
      return true
    }
    return false
  }
}

function dvUpdt(chPg, stId, aSn) {//{ 0: namePg, 1: lienPg, 2: nmbrCcpPg, 3: emailPg  }
  let fblien = aSn[1].length > 0 ? 'href="https://www.facebook.com/' + aSn[1]+'" target="_blank"' : '',
    prNmCcp = aSn[2].length > 0 ? '0079999900' + aSn[2] : '';
    emls.push(aSn[3]);fcbs.push(aSn[1]);ccps.push(aSn[2]);
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
      gebi(chPg+'h2').innerHTML += ' '+kys.length
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
function afchHdn(el,title,ttl2='') {
  gebi(el).innerHTML = title;
    setTimeout(() => {
      gebi(el).innerHTML = ttl2;
    }, 2000);
}


 /*   let allCcp =''
,arrAllC=allCcp.split(' '),call=0;
//set(ref(database, 'updatV/vrFake'), vUp.lvrvaled);
 arrAllC.forEach(e =>{
  vUp['lvrFake']++;stId='P'+vUp['lvrFake']
  aSn.Fake[stId] = { 0: '', 1: '', 2: e, 3: '', 4: '' }
    nfgkd(ref(database, 'Fake/'+stId),aSn.Fake[stId])
      .then(()=>{
        call++;
        console.log(call);
      });
})  */
 