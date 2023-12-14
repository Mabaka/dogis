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

function using_slider() {
    console.log('is_used');
}

function using_form() {
    console.log('is_used');

    work_is_done();
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


function init_p() {
    if (document.cookie.indexOf('start_time=') === -1) {
        createCookie('start_time', Date.now(), 1);
    }


    add_f('.cardFontLearnMore', using_slider, 'click');
    add_f('.sliderPetsBtnLeft', using_slider, 'click');
    add_f('.sliderPetsBtnRight', using_slider, 'click');
    add_f('.sliderContainer', using_slider, 'click');
    add_f('.ourFriendsBtnGetToKnowTheRest', using_slider, 'click');



    add_f('.btn', using_form, 'click');
    add_f('.phone', using_phone, 'click');

    add_f('.cardContainer', choose_animal,'click');
    add_f('#inputSearch', find_animal, 'change');
    
}

function add_f(name, fn, event) {
    document.querySelectorAll(name).forEach(element => {
        element.addEventListener(event, fn)
    });
}

init_p();