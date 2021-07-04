function toggle(){
    var header = document.getElementById('header')
    header.classList.toggle('act')
}

const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('img')
images.forEach(image => {
    image.addEventListener('click', e =>{
        lightbox.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        while (lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
    })
})

lightbox.addEventListener('click', e => {
    if(e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})

window.addEventListener('scroll' , reveal);

function reveal(){
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i < reveals.length; i++ ){
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
            reveals[i].classList.add('active');
        }
        else{
            reveals[i] = null;
        }
    }
}

window.onload=function(){
    setTimeout(media, 500);
    setTimeout(content, 500);
}

function media(){
    var y=document.querySelectorAll('#header ul li');
    var i;
    for(i=0; i<y.length; i++){
        y[i].style.opacity='1';
        y[i].style.transform='translate(0)';
    }
}

function content(){
    var he=document.querySelector('#home h2');
    he.style.opacity='1';
        he.style.transform='translateY(0)';
    var hs=document.querySelector('#home p');
    hs.style.opacity='1';
        hs.style.transform='translateY(0)';
    var hy=document.querySelector('#home h1');
    hy.style.opacity='1';
        hy.style.transform='translateY(0)';
    var hh=document.querySelector('#home a');
    hh.style.opacity='1';
        hh.style.transform='translateY(0)';
}