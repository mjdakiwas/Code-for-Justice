$(document).ready(function() {
    $('select').formSelect();
    $('.tabs').tabs();
    $('.chips').chips();
    $('.chips-placeholder').chips({
        placeholder: 'Enter a skill',
        secondaryPlaceholder: '+Skill',
    });
    $('.chips-autocomplete').chips({
        autocompleteOptions: {
            data: {
                'HTML5': null,
                'CSS3': null,
                'JavaScript': null,
                'WAVE': null,
                'Siteimprove': null,
                'ARIA': null,
                'NVDA': null
            },
            limit: Infinity,
            minLength: 1
        }
    });
    $('.datepicker').datepicker({
        format: 'mmm yyyy'
    });
    $('.modal').modal();
    $('.parallax').parallax();
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



($('#website-type').on('change', function () {
    let website_type = $('#website-type').find('option:selected').val();
    if (website_type == 'business') {
        $('#business').show();
    } else {
        $('#business').hide();
    }
}))

// js form handling
// validation
$('#bank').on('click', function () {
    $('#404').show();
})
