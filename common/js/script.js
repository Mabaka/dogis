const version = getCookie('version');

let params = {
    'version': version
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

function using_slider() {
    ym(95126453,'reachGoal','using_slider')
}

function using_form() {
    
    ym(95126453,'reachGoal','using_form')
    work_is_done();
}

function work_is_done() {
    if (document.cookie.indexOf('start_time=') != -1) {
        const start_time = getCookie('start_time');
        const now = Date.now();

        const lost_time = now - start_time;
        const lost_time_sec = lost_time / 60 / 60;
        const lost_time_min = lost_time / 60 / 60/ 60;
        params = {
            'version': version,
            'lost_time_sec': lost_time_sec,
            'lost_time_min': lost_time_min
        }
        ym(95126453,'reachGoal','stay_time',params)
    }
}

function using_phone() {
    ym(95126453,'reachGoal','using_phone');

    work_is_done();
}

function using_email() {
    ym(95126453,'reachGoal','using_email');

    work_is_done();
}

function using_find() {
    ym(95126453,'reachGoal','using_find');
}

function top_animal(event) {
    const params = {
      'animal_name': event.srcElement?.classList?.[1] || event.srcElement?.parentNode?.parentNode?.classList?.[1] || 'null'      
    }
    
    ym(95126453,'reachGoal','top_animal',params);

  }

function init_p() {
    if (document.cookie.indexOf('start_time=') === -1) {
        createCookie('start_time', Date.now(), 1);
    }

    add_f('.sliderPetsBtnLeft', using_slider, 'click');
    add_f('.sliderPetsBtnRight', using_slider, 'click');
    add_f('.sliderContainer', using_slider, 'click');
    add_f('.ourFriendsBtnGetToKnowTheRest', using_slider, 'click');



    add_f('.btn', using_form, 'click');
    add_f('.phone', using_phone, 'click');
    add_f('.mail', using_email, 'click');        
    add_f('#inputSearch', using_find, 'change');
    
}



function add_f(name, fn, event) {    
    document.querySelectorAll(name).forEach(element => {
        element.addEventListener(event, fn)
    });
}


init_p();