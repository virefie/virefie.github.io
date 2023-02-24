import { database, ref, child, get, gebi } from "../../../main.js";
import { remove} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

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


