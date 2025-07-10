($('#contact-select').change((function () {
    console.log('contact type changed')
    var selected_option = $('#contact-select').find('option:selected').val();
    if (selected_option = 'donate') {
        $('#donate').css('display', 'block');
    } else if (selected_option = 'volunteer') {
        $('#volunteer').css('display', 'block');
    } else {
        $('#request').css('display', 'block');
    }
})))