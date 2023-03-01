import { database, ref, child, get, gebi} from "../main.js";
class base { valed = []; Fake = [];
    getInd (e) {
        let t = this.valed.indexOf(e);
        return t > -1 ? {
            vl: "valed",
            in: t
        } : (t = this.Fake.indexOf(e), t > -1 ? {
            vl: "Fake",
            in: t
        } : (t = 0, {
            vl: "Uncertain",
            in: t
        }))
    };
};
let aSn = { valed: [], Fake: []}, vUp = { lvrFake: 0,lvrvaled: 0 },frm = document.forms[0], 
    dv = gebi("divplac"), emails = new base, Ccps = new base, fcbs = new base;

const dbRef = ref(database);
dv.addEventListener("click", e => {
    e.stopPropagation()
});

function rslt(e) {
    get(child(dbRef, `${e}/`)).then(t => {
        aSn[e] = Object.entries(t.val());
        localStorage.setItem("lst" + e, JSON.stringify(aSn[e]));
         stlstPg(e)
    })
}
/*  */

function stlstPg(e) {
    let cmprNmbr = (a, b)=> a[0].slice(1) - b[0].slice(1);//,t = "";
    aSn[e].sort(cmprNmbr);
   /*  aSn[e].sort(cmprNmbr).forEach(a => {
        let l = a[1][1].length > 0 ? 'href="https://www.facebook.com/' + a[1][1] +'" target="_blank"':'',
            s = a[1][2].length > 0 ? "0079999900" + a[1][2] : "";
        emails[e].push(a[1][3]), Ccps[e].push(a[1][2]), fcbs[e].push(a[1][1]), t += `<tr><td>${s}</td><td>${a[1][3]}</td><td><a ${l}>${a[1][0]}</a><p>${a[1][4]}</p></td></tr>`
    }); */// gebi("bdy" + e).innerHTML = t;
    if ("Fake" == e ) {
        gebi("lod").className = "n", gebi("plWt").className = "n"   
    }
   
}

function afchRslt(e) {
    //console.log(['Array'].forEach);console.log(fcbs);
    if (gebi("cntnr").style.display = "flex", setTimeout(() => {
        dv.className += " opPlc"
    }, 0), "Uncertain" == e.vl) return dv.innerHTML = '<span class="clear" onclick="hiding()">×</span>\n       <div class="Uncertain hidplac">\n      <h2>لم يتم التأكد من مصداقية هد الحساب</h2>\n      <span> ليس لدينا معلوما حول هذا الحساب يرجى مساعدتنا عبر صفحتنا على الفيسبوك </span><a href="https://www.facebook.com/profile.php?id=100089115259293" >  مكافحة النصب الإلكتروني</a>\n      </div> ', 0;
    let t = aSn[e.vl][e.in][1],
        a = "valed" == e.vl ? "هذا الحساب موثوق" : "حذاري التعامل مع هذا الشخص، نصاب ⚠️" ,
        l = t[1].length > 0 ? `<h2> : إسم الحساب<br><a href="${t[1]}" target="_blank"> ${t[0]}</a></h2>  `: "",
        s = t[2].length > 0 ? `<strong> :رقم الحساب البريدي </strong><br>0079999900${t[2]}<br><br>` : "",
        n = t[3].length > 0 ? `<strong>:الايميل</strong> <br> ${t[3]}<br><br>` : "",
        r = t[4].length > 0 ? `<strong> :معلومات عن الصفحة</strong><br> ${t[4]}` : "";
    dv.innerHTML = `<span class="clear" onclick="hiding()">×</span>\n  <div class="dv${e.vl} hidjs">    <h2>${a}</h2>${l} ${n + s + r}   </div>`
}

function hiding() {
    dv.className = "dvPlc", setTimeout(() => {
        gebi("cntnr").style.display = "none", frm.srch.focus()
    }, 320)
}

if ( localStorage.vrsnUp != null) {
    vUp = JSON.parse(localStorage.vrsnUp);
     get(child(dbRef, "updatV/"))
     .then(e => {
        if (vUp.lvrvaled == e.val().vrvaled ) {
            aSn.valed = JSON.parse(localStorage.lstvaled);
        }else{
            vUp.lvrvaled = e.val().vrvaled; 
            localStorage.setItem("vrsnUp", JSON.stringify(vUp));
            rslt("valed")
        }
        if (vUp.lvrFake == e.val().vrFake) {
            aSn.Fake = JSON.parse(localStorage.lstFake);
        } else {
            vUp.lvrFake = e.val().vrFake;
            localStorage.setItem("vrsnUp", JSON.stringify(vUp));
            rslt("Fake")
        }
       
    })
    
}else{
    get(child(dbRef, "updatV/")).then(e => {
        vUp.lvrFake = e.val().vrFake; 
        vUp.lvrvaled = e.val().vrvaled;
        localStorage.setItem("vrsnUp", JSON.stringify(vUp)); 
        rslt("valed"); rslt("Fake")
    })
}
 frm.onsubmit = (e => {
    function t() {
        gebi("errCcp").style.display = "block", setTimeout(() => {
            gebi("errCcp").style.display = "none"
        }, 2e3)
    }
    e.preventDefault(), frm.srch.blur(), frm.srch.value = frm.srch.value.trim();
    let vl = frm.srch.value,tpInp=gebi("tpInp").value,
        l = vl.indexOf("facebook.com"),
        s = vl.length;
 
    if (tpInp=='rib'&& 0 == vl.indexOf("0079999900") && !isNaN(vl) && 20 == s ) {
        vl = vl.slice(10, 20);afchRslt(Ccps.getInd(vl));
    }
    if (tpInp=='Nccp' && !isNaN(vl) && vl.length == 12 && vl.indexOf("00")== 0 ) {
        vl = vl.slice(2, 12) ;
    }
    if (tpInp=='Nccp' && vl.length == 10) {
        afchRslt(Ccps.getInd(vl));
        return 0 
    }

    if (tpInp=='fcbURL' && l > -1) {
        afchRslt(fcbs.getInd(vl.slice(l + "facebook.com/".length, s)));
        return 0
    }
    if (tpInp=='eml' && vl.indexOf('@')>0) {
        afchRslt(emails.getInd(vl));
        return 0
    }
    t();
    
});
window.hiding = hiding;
