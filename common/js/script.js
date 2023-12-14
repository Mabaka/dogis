document.onload = () => {
    init();
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function init() {
    if (document.cookie.indexOf('start_time=') === -1) {
        createCookie('start_time', Date.now(), 1);
    }

    {
        document.getElementsByClassName('cardFontLearnMore')[0].onclick = using_slider();
        document.getElementsByClassName('sliderPetsBtnLeft')[0].onclick = using_slider();
        document.getElementsByClassName('sliderPetsBtnRight')[0].onclick = using_slider();
        document.getElementsByClassName('sliderContainer')[0].onclick = using_slider();
        document.getElementsByClassName('ourFriendsBtnGetToKnowTheRest')[0].onclick = using_slider();
    }

    {
        document.getElementsByClassName('btn')[0].onclick = using_form();
        document.getElementsByClassName('phone')[0].onclick = using_phone();
    }

    {
        document.getElementById('inputSearch').onchange = find_animal();
    }

    {
        document.getElementById('card').forEach(element => {
            element.onclick = choose_animal();
        });
    }
}

function work_is_done() {
    if (document.cookie.indexOf('start_time=') != -1) {
        const start_time = getCookie('start_time');
        const now = Date.now();

        const lost_time = now - start_time;
        const lost_time_min = lost_time / 60;

        console.log(lost_time_min);
    }
}

function using_slider() {
    console.log('is_used');
}

function using_form() {
    console.log('is_used');

    work_is_done();
}

function using_phone() {
    console.log('is_used');

    work_is_done();
}

function find_animal() {
    console.log('is_used');
}

function choose_animal() {
    console.log('is_used');
}