/* import { database, ref, child, get, gebi } from "../../../main.js";
import { remove} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
 */
const dbRef = ref(database);
const edtSVG= '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m19.3 8.925-4.25-4.2 1.4-1.4q.575-.575 1.413-.575.837 0 1.412.575l1.4 1.4q.575.575.6 1.388.025.812-.55 1.387ZM17.85 10.4 7.25 21H3v-4.25l10.6-10.6Z"/></svg>'

/* logaut */
  let datCoki= new Date();
 datCoki.setDate(-1);
gebi('logaut').onclick=()=>{
    document.cookie='UsrEmail=;expires='+datCoki+';path=/';
    document.cookie='UsrPassword=;expires='+datCoki+';path=/';
    window.open("../../",'_self');
}
rslt('valed' , false);
rslt('Fake' , true);

function rslt(name , rmv) {
    get(child(dbRef, `${name}/`)).then((snp) => {
        /* snp => snapshot */
        if (snp.exists()) {
          let lstPg = '';
          snp.forEach(e => {
            lstPg += `<div id="divplac" class="dvPlc">
            <span class="cntnr">
                <span id="${name}/${e.key}" class="clear" >×</span>
                <a href="../?vl=${name}&id=${e.key}" class="mdfSVG">${edtSVG}</a>
            </span>
            <div class="normal">
                <h2><a href="https://www.facebook.com/${e.val()[1]}" target="_blank"> ${e.val()[0]}</a> </h2>
            <strong>:الايميل</strong> <br> ${e.val()[3]}<br><br>
            <strong> :رقم الحساب البريدي </strong><br> 0079999900${e.val()[2]}
            </div> 
        </div>`;
            //console.log(e.key);
      
          });
          gebi(`list${name}`).innerHTML = lstPg; 
          
          if (rmv) {
            document.querySelectorAll('.clear').forEach(el =>{
                el.addEventListener('click',()=>{
                    remove(child(dbRef, el.id));
                    el.parentElement.remove();
                })
            })
          }
        } else {
            gebi(`list${name}`).innerText = "No data available";
        }
      })
}

document.querySelectorAll('.h2lst').forEach(el =>{
    el.onclick = ()=>{
        let nxtEl = el.nextElementSibling;
        if (nxtEl.style.display == "block") {
            nxtEl.style.display = "none";
            el.firstElementChild.innerHTML='▼'
        }else{
            nxtEl.style.display = "block";
            el.firstElementChild.innerHTML='▲'
        }
        
    }
})

/*
2587773966 2838978455 1937346674 2870667773 2877269205 1798293294 1615829989 2373829796 2808095207 4016797754 2748515867 2590194116 1681092268 0893970151 2877269205 2877269205 2453754983 2804860839 2381570881 1056325841 1348157325 2807659928 2858839302 2230422377 1971441301 1857380650 2429688895 2848267563 1673385715 2877269205 0195904704 2559427074 1783284096 0174793721 2905768872 2809847124 1984284683 2673558729 2384063005 1912355788 2491897323 2939317292 1933475210 2397636215 2951239465 2630874849 2802653216 1965521682 2933880830 2877269205 2902255726 1946017795 1577203813 2833459737 2671626489 2294115487 2576733717 2502646572 2590194116 1805676546 2369801483 1919371410 2621214813 2637712670 2832471695 1864448652 2467592421 1427403124 2614488348 2362671789 2905375537 2699574032 2961918389 2475944024 1696332326 0615282652 0434914256 2590194116 1805676546 2369801483 1919371410 2621214813 2637712670 2989463479 2832471695 1864448652 2808685646 2698409741 2465436790 2230422377 2916191522 2873674482 1862877640 2636636455 2808150109 1769743381 1587392208 2845857210 1990355913 2065331190 1990355913 2805872161 2373829796 2877269205 2678775649 0055634459 1970098530 2575197431 2673558729 2905375537 2858839302 2902190736 2804860839 1348157325 2807659928 2765285324
Page Facebook: https://www.facebook.com/profile.php?id=100090794198775&mibextid=ZbWKwL
https://www.facebook.com/profile.php?id=100030374765768&mibextid=ZbWKwL
0676790743 https://www.facebook.com/profile.php?id=100089836217797&mibextid=ZbWKwL

https://www.facebook.com/profile.php?id=100061999310625 
https://www.facebook.com/profile.php?id=100088599398709 
https://www.facebook.com/mohamed.mohale.2756
 */

