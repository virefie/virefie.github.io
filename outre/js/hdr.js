let qrs = el => document.querySelector(el), hdr = document.createElement('header');

qrs('head').innerHTML += '<link rel="stylesheet" href="https://virefie.github.io/outre/css/header.css">';


let orgn = location.origin, path = window.location.pathname;
hdr.innerHTML =
    `<div class="container"  >
        <h4 class="logo">مكافحة النصب الإلكتروني</h4>
        <div class="links">
            <span class="icon"><span></span><span></span><span></span>
            </span>
            <ul>
                <li>
                    <a id= "/" href="${orgn}" class="aboutUs"> الصفحة الرئيسية</a>
                </li>
                <li>
                    <a id = "/call" href="${orgn}/call/index.min.html">اتصل بنا</a>
                </li>
                <li >
                    <a id = "/aboutus" href="${orgn}/aboutus/index.min.html"> من نحن</a>
                </li>
                <li >
                    <a id="/cnfdnt" href="${orgn}/cnfdnt/index.min.html"> سياسة الخصوصية</a>
                </li>
            </ul>
        </div>
    </div>`;
qrs('body').prepend(hdr);

path = path != ('/' && '/index.min.html') ? path.slice(0, path.indexOf('/index')) : '/';
document.getElementById(path).classList.add('active');
