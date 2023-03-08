document.querySelector('head').innerHTML += 
'<link rel="stylesheet" href="https://virefie.github.io/outre/css/header.css">';
let orgn = location.origin, path = window.location.pathname,
    fork = document.querySelector('header').innerHTML =
            `<div class="container">
                <h4 class="logo">مكافحة النصب الإلكتروني</h4>
                <div class="links">
                    <span class="icon"><span></span><span></span><span></span>
                    </span>
                    <ul>
                        <li id= "/">
                            <a href="${orgn}" class="aboutUs"> الصفحة الرئيسية</a>
                        </li>
                        <li id = "/call">
                            <a href="${orgn}/call/index.min.html">اتصل بنا</a>
                        </li>
                        <li id = "/aboutus">
                            <a href="${orgn}/aboutus/index.min.html"> من نحن</a>
                        </li>
                        <li id="/cnfdnt">
                            <a href="${orgn}/cnfdnt/index.min.html"> سياسة الخصوصية</a>
                        </li>
                    </ul>
                </div>
            </div>`;
if(path.length > 1){path =path.slice(0,path.indexOf('/index'))};

document.getElementById(path).classList= 'active';