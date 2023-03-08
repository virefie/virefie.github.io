import { database, ref, child, get, gebi } from "../../main.js";
class base {
    valed = []; Fake = [];
    getInd(e) {
        let ind = this.valed.indexOf(e);
        if (ind > -1) {
            return { vl: "valed", in: ind }
        }
        ind = this.Fake.indexOf(e)
        if (ind > -1) {
            return { vl: "Fake", in: ind }
        }
        return { vl: "Uncertain", in: ind }
        /* return ind > -1 ? {
            
        } : (ind = this.Fake.indexOf(e)? {
            vl: "Fake",
            in: ind
        } : (ind = 0, {
            vl: "Uncertain",
            in: ind
        })) */x
    };
};
let aSn = { valed: [], Fake: [] }, vUp = { lvrFake: 0, lvrvaled: 0, dwAapp: 0 }, frm = document.forms[0],
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

/*

let os= navigator.userAgent.toLocaleLowerCase();

if (os.includes('android') && os.includes('chrome')) {
    gebi('dwnld').className = 'dwnld';
}
  */

function stlstPg(e) {
    let cmprNmbr = (a, b) => a[0].slice(1) - b[0].slice(1);//,t = "";
    aSn[e].sort(cmprNmbr);
    aSn[e].sort(cmprNmbr).forEach(a => {
        emails[e].push(a[1][3]), Ccps[e].push(a[1][2]), fcbs[e].push(a[1][1]);

        /* let l = a[1][1].length > 0 ? 'href="https://www.facebook.com/' + a[1][1] +'" target="_blank"':'',
            s = a[1][2].length > 0 ? "0079999900" + a[1][2] : "";
        t += `<tr><td>${s}</td><td>${a[1][3]}</td><td><a ${l}>${a[1][0]}</a><p>${a[1][4]}</p></td></tr>` */
    });// gebi("bdy" + e).innerHTML = t;
    if ("Fake" == e) {
        gebi("lod").className = "n";
        gebi("plWt").className = "n";
        document.querySelector('header').style.display = 'block';
    }

}

function afchRslt(e) {
    //console.log(['Array'].forEach);console.log(fcbs);
    gebi("cntnr").style.display = "flex";
    setTimeout(() => {
        dv.className += " opPlc"
    }, 0);
    if (e.vl == "Uncertain") {
        dv.innerHTML = '<span class="clear" onclick="hiding()">×</span>\n       <div class="Uncertain hidplac">\n      <h2>لم يتم التأكد من مصداقية هد الحساب</h2>\n      <span> ليس لدينا معلوما حول هذا الحساب يرجى مساعدتنا عبر صفحتنا على الفيسبوك </span><a href="https://www.facebook.com/profile.php?id=100089115259293" >  مكافحة النصب الإلكتروني</a></div> ';
        return 0
    }

    let t = aSn[e.vl][e.in][1],
        a = "valed" == e.vl ? "هذا الحساب موثوق" : 'حذاري التعامل مع هذا الشخص، نصاب ⚠️',
        l = t[1].length > 0 ? `<h2> : إسم الحساب<br><a href="https://www.facebook.com/'${t[1]}" target="_blank"> ${t[0]}</a></h2>  ` : "",
        s = t[2].length > 0 ? `<strong> :رقم الحساب البريدي </strong><br>0079999900${t[2]}<br><br>` : "",
        n = t[3].length > 0 ? `<strong>:الايميل</strong> <br> ${t[3]}<br><br>` : "",
        r = t[4].length > 0 ? `<strong> :معلومات عنه </strong><br> ${t[4]}` : "";
    dv.innerHTML = `<span class="clear" onclick="hiding()">×</span>\n  <div class="dv${e.vl} hidjs"><h2>${a}</h2>${l} ${n + s + r}   </div>`;

}

function hiding() {
    dv.className = "dvPlc", setTimeout(() => {
        gebi("cntnr").style.display = "none"; frm.srch.focus()
    }, 320)
}

window.onload = () => {
    if (window.navigator.onLine) {
        lodngVrsn()
    } else {
        if (localStorage.vrsnUp != null) {
            aSn.valed = JSON.parse(localStorage.lstvaled);
            stlstPg("valed");
            aSn.Fake = JSON.parse(localStorage.lstFake);
            stlstPg("Fake")
        } else {
            gebi('ntintrnt').innerText = 'ليس لديك اتصال بالانترنت'
        }
    }
}

function lodngVrsn() {
    get(child(dbRef, "updatV/"))
        .then(e => {
            vUp.dwAapp = e.val().dwAapp;
            if (localStorage.vrsnUp != null) {
                vUp = JSON.parse(localStorage.vrsnUp);

                if (vUp.lvrvaled == e.val().vrvaled) {
                    aSn.valed = JSON.parse(localStorage.lstvaled);
                    stlstPg("valed")
                } else {
                    vUp.lvrvaled = e.val().vrvaled;
                    localStorage.setItem("vrsnUp", JSON.stringify(vUp));
                    rslt("valed")
                }
                if (vUp.lvrFake == e.val().vrFake) {
                    aSn.Fake = JSON.parse(localStorage.lstFake);
                    stlstPg("Fake")
                } else {
                    vUp.lvrFake = e.val().vrFake;
                    localStorage.setItem("vrsnUp", JSON.stringify(vUp));
                    rslt("Fake");
                }

                /* }); */
            } else {
                /*  get(child(dbRef, "updatV/")).then(e => { */
                vUp.lvrFake = e.val().vrFake;
                vUp.lvrvaled = e.val().vrvaled;
                localStorage.setItem("vrsnUp", JSON.stringify(vUp));
                rslt("valed"); rslt("Fake")

            }
        })
}

frm.onsubmit = (e => {
    function t() {
        gebi("errCcp").style.display = "block", setTimeout(() => {
            gebi("errCcp").style.display = "none"
        }, 2e3)
    }
    e.preventDefault(); frm.srch.blur();
    frm.srch.value = frm.srch.value.trim();
    let vl = frm.srch.value, tpInp = gebi("tpInp").value, l = vl.indexOf("facebook.com"),
        s = vl.length;

    if (tpInp == 'rib' && 0 == vl.indexOf("0079999900") && !isNaN(vl) && 20 == s) {
        vl = vl.slice(10, 20); afchRslt(Ccps.getInd(vl));
        return 0
    }
    if (tpInp == 'Nccp' && !isNaN(vl) && vl.length == 12 && vl.indexOf("00") == 0) {
        vl = vl.slice(2, 12);
    }
    if (tpInp == 'Nccp' && vl.length == 10) {
        afchRslt(Ccps.getInd(vl));
        return 0
    }

    if (tpInp == 'fcbURL' && l > -1) {
        afchRslt(fcbs.getInd(vl.slice(l + "facebook.com/".length, s)));
        return 0
    }
    if (tpInp == 'eml' && vl.indexOf('@') > 0) {
        afchRslt(emails.getInd(vl));
        return 0
    }
    t();

});
window.hiding = hiding;


/* instalation app */
let deferredPrompt;
/* if app is instal */
/* window.addEventListener('appinstalled', () => {
    // Hide the app-provided install promotion
    gebi('dwnld').className ='n';
    // Clear the deferredPrompt so it can be garbage collected
    deferredPrompt = null; */
/* // Optionally, send analytics event to indicate successful install
console.log('PWA was installed'); */
/*  }); */

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    // Update UI notify the user they can install the PWA
    let os = navigator.userAgent.toLocaleLowerCase();

    if (os.includes('android') || os.includes('ipad') || os.includes('iphone')) {
        gebi('dvdw').className = 'blck';
    }

});

let buttonInstall = gebi('dwnld');
buttonInstall.addEventListener('click', async () => {
    gebi('dvdw').className = 'n';
    deferredPrompt.prompt();
    /* if (vUp.dwAapp >0) {
        
    } */
    /* 
        const { outcome } = await deferredPrompt.userChoice;
    
        console.log(`User response to the install prompt: ${outcome}`); */
    deferredPrompt = null;
});


/* 
  function getPWADisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
      return 'twa';
    } else if (navigator.standalone || isStandalone) {
      return 'standalone';
    }
    return 'browser';
  } */
/* 
  window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
    let displayMode = 'browser';
    if (evt.matches) {
      displayMode = 'standalone';
    }
    // Log display mode change to analytics
    console.log('DISPLAY_MODE_CHANGED', displayMode);
  }); */