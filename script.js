$(document).ready(function () {
    M.AutoInit();
    $('select').formSelect();
    $('.tabs').tabs();
    $('.chips').chips();
})

let contact_select = document.querySelector('#contact-select');
($(contact_select).on('change', function () {
    console.log('contact type changed')
    let selected_option = $(contact_select).find('option:selected').val();
    console.log(`selected: ${selected_option}`);

    if (selected_option == 'donate') {
        $('#donate').show();
    } else {
        $('#donate').hide();
    }

    if (selected_option == 'volunteer') {
        $('#volunteer').show();
    } else {
        $('#volunteer').hide();
    }

    if (selected_option == 'request') {
        $('#request').show();
    } else {
        $('#request').hide();
    }
})).trigger('change');

// js form handling
// validation