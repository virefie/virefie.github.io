function rslt(e) {
    get(child(dbRef, `${e}/`)).then(t => {
        aSn[e] = Object.entries(t.val()), localStorage.setItem("lst" + e, JSON.stringify(aSn[e])), stlstPg(e)
    })
}

function stlstPg(e) {
    let t = "";
    aSn[e].forEach(a => {
        let l = a[1][1].length > 0 ? "https://www.facebook.com/" + a[1][1] : "",
            s = a[1][2].length > 0 ? "0079999900" + a[1][2] : "";
        emails[e].push(a[1][3]), Ccps[e].push(a[1][2]), fcbs[e].push(a[1][1]), t += `<tr><td>${s}</td><td>${a[1][3]}</td>\n      <td><a href="${l}" target="_blank">${a[1][0]}</a><p>${a[1][4]}</p></td></tr>`
    }), gebi("bdy" + e).innerHTML = t, gebi("tb" + e).style.display = "table", "Fake" == e && (gebi("lod").className = "n", gebi("plWt").className = "n")
}

function afchRslt(e) {
    if (gebi("cntnr").style.display = "flex", setTimeout(() => {
            dv.className += " opPlc"
        }, 0), "Uncertain" == e.vl) return dv.innerHTML = '<span class="clear" onclick="hiding()">×</span>\n       <div class="Uncertain hidplac">\n      <h2>لم يتم التأكد من مصداقية هد الحساب</h2>\n      <span> ليس لدينا معلوما حول هذا الحساب يرجى مساعدتنا عبر صفحتنا على الفيسبوك </span><a href="https://www.facebook.com/profile.php?id=100089115259293" >  مكافحة النصب الإلكتروني</a>\n      </div> ', 0;
    let t = aSn[e.vl][e.in][1],
        a = "valed" == e.vl ? "هذا الحساب موثوق" : "Fake" == e.vl ? "حذاري ⚠️  هذا الحساب  مزيف" : "لم يتم التأكد من مصداقية هذه الصفحة",
        l = t[1].length > 0 ? "https://www.facebook.com/" + t[1] : "",
        s = t[2].length > 0 ? `<strong> :رقم الحساب البريدي </strong><br>0079999900${t[2]}<br><br>` : "",
        n = t[3].length > 0 ? `<strong>:الايميل</strong> <br> ${t[3]}<br><br>` : "",
        r = t[4].length > 0 ? `<strong> :معلومات عن الصفحة</strong><br> ${t[4]}` : "";
    dv.innerHTML = `<span class="clear" onclick="hiding()">×</span>\n  <div class="dv${e.vl} hidjs">\n    <h2>${a}</h2><h2> : إسم الحساب<br><a href="${l}" target="_blank"> ${t[0]}</a></h2>\n    ${n+s+r}\n    </div>`
}

function hiding() {
    dv.className = "dvPlc", setTimeout(() => {
        gebi("cntnr").style.display = "none", frm.srch.focus()
    }, 320)
}
import {
    database,
    ref,
    child,
    get,
    gebi
} from "../main.js";
Object.prototype.getInd = function(e) {
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
let aSn = {
        valed: [],
        Fake: []
    },
    vUp = {
        lvrFake: 0,
        lvrvaled: 0
    },
    frm = document.forms[0],
    dv = gebi("divplac"),
    emails = {
        valed: [],
        Fake: []
    },
    Ccps = JSON.parse(JSON.stringify(emails)),
    fcbs = JSON.parse(JSON.stringify(emails));
const dbRef = ref(database);
dv.addEventListener("click", e => {
    e.stopPropagation()
}), null != localStorage.vrsnUp ? (vUp = JSON.parse(localStorage.vrsnUp), get(child(dbRef, "updatV/")).then(e => {
    vUp.lvrvaled == e.val().vrvaled ? (aSn.valed = JSON.parse(localStorage.lstvaled), stlstPg("valed")) : (vUp.lvrvaled = e.val().vrvaled, localStorage.setItem("vrsnUp", JSON.stringify(vUp)), rslt("valed")), vUp.lvrFake == e.val().vrFake ? (aSn.Fake = JSON.parse(localStorage.lstFake), stlstPg("Fake")) : (vUp.lvrFake = e.val().vrFake, localStorage.setItem("vrsnUp", JSON.stringify(vUp)), rslt("Fake"))
})) : get(child(dbRef, "updatV/")).then(e => {
    vUp.lvrFake = e.val().vrFake, vUp.lvrvaled = e.val().vrvaled, localStorage.setItem("vrsnUp", JSON.stringify(vUp)), rslt("valed"), rslt("Fake")
}), frm.onsubmit = (e => {
    function t() {
        gebi("errCcp").style.display = "block", setTimeout(() => {
            gebi("errCcp").style.display = "none"
        }, 2e3)
    }
    e.preventDefault(), frm.srch.blur(), frm.srch.value = frm.srch.value.trim();
    let a = frm.srch.value,
        l = a.indexOf("facebook.com"),
        s = a.length;
    if (l > -1 && afchRslt(fcbs.getInd(a.slice(l + "facebook.com".length, s))), !isNaN(a)) return 20 == s && 0 == a.indexOf("0079999900") && (a = a.slice(10, 20)), 12 == s && 0 == a.indexOf("00") && (a = a.slice(2, 12)), 10 != a.length ? (t(), 0) : (afchRslt(Ccps.getInd(a)), 0);
    a.indexOf("@") > 0 ? afchRslt(emails.getInd(a)) : t()
}), window.hiding = hiding;
class srcdst {
    drt() {
        return this
    }
}
console.log(srcdst);