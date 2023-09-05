export default function burgerBtn() {
    const btn = document.querySelector('.burgerBtn'),
    mobileMenu = document.querySelector('.mobileMenu'),
    containerDark = document.querySelector('.containerDark'),
    links = document.querySelectorAll('.containerMenuLinks a')

    function toggleClass(){
    btn.classList.toggle('activeBurger');
    mobileMenu.classList.toggle('showMenu');
    setTimeout(()=>{if (document.querySelector('.activeBurger')) {
        document.body.style.overflow = "hidden";
        mobileMenu.style.right = 0
    } else {
        document.body.style.overflow = "auto"
        mobileMenu.style.right = '-100%'
    }
    },200)
    }

    for (let link of links){
        link.addEventListener("click", toggleClass);
    }
    btn.addEventListener("click", toggleClass);
    containerDark.addEventListener("click", toggleClass);
}
