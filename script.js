// materialize js init
$(document).ready(function () {
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
    $('.dropdown-trigger').dropdown();

    // index js
    /*$(document).ready(function () {
        var img_width = $('#opening-img').css('width');
        var condition = $.Deferred();
    
        $.when(condition).done(function (bool) {
            if (bool == true) {
                $('.parallax-container').removeClass('mask-index');
            } else {
                $('.parallax-container').addClass('mask-index');
            }
        })
    
        condition.resolve(img_width <= '425px');
    })*/
    var div = window.matchMedia('(max-width: 600px');
    function windowChange(div) {
        if (div.matches) {
            $('.parallax-container').removeClass('mask-index');
        } else {
            $('.parallax-container').addClass('mask-index');
        }
    }
    windowChange(div);
    div.addEventListener('change', function () {
        windowChange(div);
    })

    // contact js
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

    const form = $('#contact-form');
    const errorMessage = $('#error-container');
    form.on('keydown', function (event) {
        event.preventDefault();

        const { fname, lname, email, phone_num} = form.elements;

        errorMessage.innerHTML = '';

        if (!fname.value.trim()) {
            fname.addClass('invalid');
            displayError('Please enter your first name.');
            return;
        } else {
            fname.addClass('valid');
        }

        if (!lname.value.trim()) {
            lname.addClass('invalid');
            displayError('Please enter your last name.');
            return;
        } else {
            lname.addClass('valid');
        }

        if (!email.value.trim() || (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))) {
            email.addClass('invalid');
            displayError('Please enter a valid email.s');
            return;
        } else {
            email.addClass('valid');
        }
    })

    function displayError(message) {
        errorMessage.innerHTML += `<div class="error">${message}</div>`
    }
})