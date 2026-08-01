$(function () {

    "use strict";

    // init the validator
    // validator files are included in the download package
    // otherwise download from http://1000hz.github.io/bootstrap-validator
    $('#contact-form').validator();

    // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {

            e.preventDefault();

            var form = this;
            var formData = new FormData(form);

            // send the form data straight to Web3Forms, which emails it to
            // the address tied to the access_key hidden field above
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            })
            .then(function (response) { return response.json(); })
            .then(function (data) {

                var messageAlert = data.success ? 'alert-success' : 'alert-danger';
                var messageText = data.message || (data.success ? 'Message sent, thank you!' : 'Something went wrong. Please try again.');

                var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                $('#contact-form').find('.messages').html(alertBox);

                if (data.success) {
                    form.reset();
                }
            })
            .catch(function () {
                var alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Something went wrong. Please email me directly instead.</div>';
                $('#contact-form').find('.messages').html(alertBox);
            });

            return false;
        }
    })
});
