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
    M.updateTextFields();
})

// index js
// removing index img mask when viewport small enough
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
let contact_select = $('#contact-select');
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

$('#bank').on('click', function () {
    $('#404').show();
})

// js form handling (will primarily use vanilla js to understand fundamentals)
// validation
$(document).ready(function () {
    $('#contact-select').on('change', function () {
        $(this).valid();
    })
    $('input.select-dropdown').on('change click', function () {
        $('#contact-select').valid();
    })

    jQuery.validator.setDefaults({
        debug: true,
        ignore: ':hidden',
        success: 'valid',
        showErrors: function (errorMap, errorList) {
            /*console.log('validating elements:', errorList.map(e => e.element));*/
            const seen = new Set();
            $('span.invalid').each(function () {
                const id = this.id;
                if (id && seen.has(id)) {
                    $(this).remove();
                } else {
                    seen.add(id);
                }
            })
            this.defaultShowErrors();
        }
    });

    const form = $('#contact-form');

    form.validate({
        normalizer: function (value) {
            return $.trim(value);
        },
        ignore: '.select-dropdown :hidden:not(.validate)',
        errorClass: 'invalid',
        validClass: 'valid',
        errorElement: 'span',
        errorPlacement: function (error, element) {
            console.log('error element:', element);
            console.log('error msg:', error);

            const errorId = error.attr('id') || `${element.attr('id')}-error`
            $(`#${errorId}`).not(error).remove();
            if ($(element).is('select')) {
                const input = element.siblings('.select-dropdown');
                setTimeout(() => {
                    if (!input.next(`#${errorId}`).length) {
                        error.attr('id', errorId);
                        error.insertAfter(input);
                    }
                }, 0)
            } else {
                if (!$(element).next(`#${errorId}`).length) {
                    error.attr('id', errorId)
                    error.insertAfter(element);
                }
            };
            if (element.attr('name') == 'amount-select') {
                error.insertAfter('#amount');
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            if ($(element).is('select')) {
                $(element).siblings('.select-dropdown')
                    .addClass(errorClass)
                    .removeClass(validClass);
            }
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
            if ($(element).is('select')) {
                $(element).siblings('select-dropdown')
                    .addClass(validClass)
                    .removeClass(errorClass);
            }
        },
        focusCleanup: true,
        rules: {
            fname: {
                required: true,
            },
            lname: 'required',
            email: {
                required: true,
                email: true,
                require_from_group: [1, '.contact-info']
            },
            'phone-num': {
                required: true,
                phoneFormat: true,
                require_from_group: [1, '.contact-info']
            },
            'contact-select': {
                required: true
            },
            'amount-selected': {
                require_from_group: [1, '.amount-required']
            },
            'custom-amount': {
                require_from_group: [1, '.amount-required'],
                number: true
            },
            'card-name': {
                required: true
            },
            'card-num': {
                required: true,
                creditcard: true
            },
            'exp-date': {
                required: true,
            },
            cvc: {
                required: true,
                cvcFormat: true
            }, 
            'volunteer-type': {
                required: true
            },
            role: {
                required: true
            },
            url: {
                required: true,
                url: true
            },
            deadline: {
                required: true
            },
            'org-name': {
                required: true
            }
        },
        messages: {
            fname: 'Please enter your first name.',
            lname: 'Please enter your last name',
            email: {
                require_from_group: 'Please enter your email address or phone number for us to contact you',
                email: 'Enter a valid email address format: example@domain.com'
            },
            'phone-num': {
                require_from_group: 'Please enter your email address or phone number for us to contact you',
                phoneFormat: 'Enter a valid phone number: (000)000-0000 or 000-000-000'
            },
            'contact-select': {
                required: 'Please select a reason for contacting us.'
            },
            'amount-selected': {
                require_from_group: 'Please either select a donation amount or fill in a custom donation amount'
            },
            'custom-amount': {
                require_from_group: 'Please either select a donation amount or fill in a custom donation amount',
                number: 'Please enter a number amount'
            },
            'card-name': {
                required: "Please enter the credit card's holder's name"
            },
            'card-num': {
                required: 'Please enter the credit card number',
                creditcard: 'Please enter a valid credit card number'
            },
            'exp-date': {
                required: "Please select the credit card's expiration date"
            },
            cvc: {
                required: "Please enter the credit card's security number",
                cvcFormat: 'Please enter a valid security number (3 or 4 digit number)'
            },
            'volunteer-type': {
                required: 'Please select a volunteering role'
            },
            role: {
                required: 'Please enter your role'
            },
            url: {
                required: "Please enter your website's url",
                url: 'Please enter a valid url'
            },
            deadline: {
                required: 'Please select your desired redesign deadline'
            },
            'org-name': {
                required: "Please enter your organization's name"
            }
        },
        submitHandler: function (form) {
            form.submit();
        }
    })

    jQuery.validator.addMethod('phoneFormat', function (value, element) {
        return this.optional(element) || /^\d{3}-\d{3}-\d{4}$/.test(value) || /^\(\d{3}\)-\d{3}-\d{4}$/.test(value);
    })

    jQuery.validator.addMethod('cvcFormat', function (value, element) {
        return this.optional(element) || /^\d{3,4}$/.test(value);
    })

    // select work-around Materialize
    $('select').formSelect();
    $('.select-dropdown').on('click', function () {
        const select = $(this).siblings('select');
        setTimeout(() => {
            select.trigger('change');
        }, 100);
    })
    function selectWork() {
        const select = $(this);
        const dropdown = select.siblings('.select-dropdown');
        if (select.valid()) {
            dropdown.removeClass('invalid').addClass('valid');
        } else {
            dropdown.removeClass('valid').addClass('innvalid');
        }
        $(this).valid();
    }
    $('#contact-select').on('change blur', function () {
        const select = $(this);
        const dropdown = select.siblings('.select-dropdown');
        if (select.valid()) {
            dropdown.removeClass('invalid').addClass('valid');
        } else {
            dropdown.removeClass('valid').addClass('innvalid');
        }
        $(this).valid();
    })
    $('#volunteer-type').on('change blur', function () {
        const select = $(this);
        const dropdown = select.siblings('.select-dropdown');
        if (select.valid()) {
            dropdown.removeClass('invalid').addClass('valid');
        } else {
            dropdown.removeClass('valid').addClass('innvalid');
        }
        $(this).valid();
    })
    $('#website-type').on('change blur', function () {
        const select = $(this);
        const dropdown = select.siblings('.select-dropdown');
        if (select.valid()) {
            dropdown.removeClass('invalid').addClass('valid');
        } else {
            dropdown.removeClass('valid').addClass('innvalid');
        }
        $(this).valid();
    })
    $('#deadline').on('change blur', function () {
        const select = $(this);
        const dropdown = select.siblings('.select-dropdown');
        if (select.valid()) {
            dropdown.removeClass('invalid').addClass('valid');
        } else {
            dropdown.removeClass('valid').addClass('innvalid');
        }
        $(this).valid();
    })

    // donation amount
    let donation = '';
    function donateValid() {
        const buttonVal = $('#amount-selected').val();
        const customVal = $('#custom-amount').val();

        if ($.trim(customVal) !== '') {
            donation = customVal;
        } else if ($.trim(buttonVal) !== '') {
            donation = buttonVal;
        }
            
        if (donation !== '') {
            $('#amount-selected').removeClass('invalid').addClass('valid');
            $('#custom-amount').removeClass('invalid').addClass('valid');
            $('label[for="custom-amount"]').removeClass('invalid');
        }
        console.log(`donate value: ${donation}`);
    }

    $('.amt-option').on('click', function () {
        donation = $(this).val();
        $('.amt-option').removeClass('selected')
        $(this).addClass('selected')
        $('#amount-selected').val($(this).val()).trigger('blur');
        $('#custom-amount').val('').removeClass('valid invalid')
        $('#custom-amount').valid();
        $('#amount-selected').valid();
        donateValid();
    })

    $('#custom-amount').on('input', function () {
        const customVal = $(this).val();
        if (customVal) {
            $('#amount-selected').val('').removeClass('valid invalid');
            $('.amt-option').removeClass('selected');
        }
        $(this).valid();
        $('#amount-selected').valid();
        donateValid();
    })

    form.on('change', function () {
        if ($('#recur').is(':checked')) {
            const recurDonate = 'recurring donation';
            console.log(recurDonate);
        }
        console.log('exp-date' + $('#exp-date').val())
    })

    // can't select past today's mon/year
    const today = new Date();
    const currY = today.getFullYear();
    const currM = (today.getMonth() + 1).toString().padStart(2);
    $('#exp-date').attr('min', currY + '-' + currM);
})