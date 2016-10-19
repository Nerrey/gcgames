/**
 * Contact Form
 */
jQuery(document).ready(function ($) {
    var showErrors = true; //show text errors?
    var sendingMessage = 'Sending...';
    var debug = false; //show system errors

    $('.contactForm').submit(function () {
        var $f = $(this);
        var $submit = $f.find('input[type="submit"]');

        //prevent double click
        if ($submit.hasClass('disabled')) {
            return false;
        }

        $submit.attr('data-value', $submit.val()).val(sendingMessage).addClass('disabled');

        $.ajax({
            url: $f.attr('action'),
            method: 'post',
            data: $f.serialize(),
            dataType: 'json',
            success: function (data) {
                $('input.error, textarea.error', $f).removeClass('error');
                $('label.error', $f).remove();

                if (data.errors) {
                    $.each(data.errors, function (i, k) {
                        var input = $('input[name=' + i + '], textarea[name=' + i + ']', $f).addClass('error');
                        if (showErrors) {
                            input.after('<label class="error">' + k + '</label>');
                        }
                    });
                } else {
                    $f.slideUp(function () {
                        if (data.msg) {
                            $f.before(data.msg);
                        }
                    });
                }

                $submit.val($submit.attr('data-value')).removeClass('disabled');
            },
            error: function (data) {
                if (debug) {
                    alert(data.responseText);
                }
                $submit.val($submit.attr('data-value')).removeClass('disabled');
            }
        });

        return false;
    });
});