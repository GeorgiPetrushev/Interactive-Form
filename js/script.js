//Global variables
const $other = $("#other-title");
const $dropOption = $("#title");
const $cornFlowerBlue = $('#color option[value="cornflowerblue"]');
const $darkSlateGrey = $('#color option[value="darkslategrey"]');
const $gold = $('#color option[value="gold"]');
const $tomato = $('#color option[value="tomato"]');
const $steelBlue = $('#color option[value="steelblue"]');
const $dimGrey = $('#color option[value="dimgrey"]');

const $name = $("#name").focus(); //starts cursor in Name input upon loading
const $color = $('#color'); //list of color options
const $colorOp = $('#color option');
const $design = $('#design');
const $colorText = $("<option>Please select a T-shirt theme</option>"); //inserted option item to prompt user to select theme
const $newDiv = $("<div>Total Cost: $</div>");
const $activityClass = $(".activities");
const $activityClass_Div = $(".activities").append($newDiv);
let activityCostTotal = 0;
const $payPal = $('#paypal');
const $bitCoin = $('#bitcoin');
const $creditCard = $('#credit-card');
const $payment = $('#payment');
const $nameInput = $('#name');
const $nameInputSpan = $('<span class="validate">Please enter a valid name</span>');
const $emailInput = $('#mail');
const $emailInputSpan = $('<span class="validate">Please enter a valid email address</span>');
const regex = /^[^@]+@[^@.]+\.[a-z]{3}$/i;
const ccRegex = /^[\d]{4}[\d]{4}[\d]{4}[\d]{1,4}$/;
const $ccSpan = $('<span class="validate">Please enter a valid credit card number</span>');
const $creditCardInput = $('#cc-num');
const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/
const $zipSpan = $('<span class="validate">Please enter valid zipcode</span>');
const $zipcodeInput = $('#zip');
const cvvRegex = /^\d{3}$/;
const $cvvSpan = $('<span class="validate">Please enter valid cvv number</span>');
const $cvvInput = $('#cvv');
const $secondCCSPan = $('<span>Please enter a number 13 to 16 digits long</span>');
const error = 'indianred'




$other.hide(); //hides input field unless javascript is disabled

$dropOption.change(function () { //event handler showing/hiding input field when "Other" is selected in drop down options

    if ($("#title option").eq(5).is(':checked')) {

        $other.show();
    } else {

        $other.hide();
    }

})

// T-Shirt
$color.attr('hidden', true); //hides color options

$colorText.attr('value', 'color-text'); // setting value of attr

$color.prepend($colorText); //prepending to color option list
$colorText.attr('selected', true); //selecting option item to show first when page loads  
//$('#color option').eq(0).attr('selected',true);
$('#color option').eq(0).attr('hidden', true); //event handler hides select theme option


//$('#design option').eq(0).attr('selcted',true);
$('#design option').eq(0).attr('hidden', true);
$design.change(function () { //event handler hides select theme option

    $('#design option[0]').attr('hidden', true);
})
$colorOp.prop('hidden', true); //hides all color options except first option


$design.change(function () { //event handler, listening for design selection, showing corresponding colors
    console.log(this);
    $color.attr('hidden', false); //shows color options

    if ($(this).val() === 'js puns') { //conditional determning theme selected

        $cornFlowerBlue.prop('selected', true); //selects first available color for theme

        $cornFlowerBlue.show();
        $gold.show();
        $darkSlateGrey.show();
        $tomato.hide();
        $steelBlue.hide();
        $dimGrey.hide();



    } else if ($(this).val() === 'heart js') {

        $tomato.prop('selected', true);
        $tomato.show();
        $steelBlue.show();
        $dimGrey.show();
        $cornFlowerBlue.hide();
        $gold.hide();
        $darkSlateGrey.hide();

    }

})

//Activity Section




$activityClass.change(function (e) {
    const $target = $(e.target);
    const $dateAndTime = $target.attr('data-day-and-time');
    let $dataCost = parseInt($target.attr('data-cost').slice(-3)); //parsing the input clicked to an integer

    console.log($target);
    console.log($dateAndTime);


    console.log($dataCost);

    if ($target.prop('checked')) {

        activityCostTotal += $dataCost;


    } else
        activityCostTotal -= $dataCost;







    $('.activities div').html('<div>Total Cost: $' + activityCostTotal + '</div>'); //concatinating total cost of activities to div string

    const $inputIterations = $('.activities input');
    for (let i = 0; i <= $inputIterations.length; i++) { //looping through activitiy inputs 
        const $name = $target.attr('name');

        console.log($inputIterations[i]);
        console.log($name);
        if ($target.prop('checked')) { //if target is checked 
            if ($dateAndTime === $($inputIterations[i]).attr('data-day-and-time') && $name != $($inputIterations[i]).attr('name')) { //checking whether dates/time and names match iterations



                $($inputIterations[i]).attr('disabled', true); //if attributes matched, matching items disabled 

            }
        } else {
            if ($dateAndTime === $($inputIterations[i]).attr('data-day-and-time') && $name != $($inputIterations[i]).attr('name')) {

                $($inputIterations[i]).removeAttr('disabled');

            }
        }
    }
})

$('#payment option').eq(0).attr('hidden', true);
$('#payment option').eq(1).attr('selected', true);

$creditCard.attr('selected', true);


$payPal.hide();
$bitCoin.hide();



//Payment Section
$payment.change(function () { //hiding and showing payment options based on selection

    if ($(this).val() === 'Credit Card') {

        $creditCard.show();
        $bitCoin.hide();
        $payPal.hide();


    } else if ($(this).val() === 'Bitcoin') {

        $bitCoin.show();
        $creditCard.hide();
        $payPal.hide();


    } else if ($(this).val() === 'PayPal') {

        $payPal.show();
        $creditCard.hide();
        $bitCoin.hide();





    }

})
//Form Validation Section

$nameInputSpan.css('color', error);

function name() {


    if ($nameInput.val().length === 0) {



        let $newNameSpan = $nameInput.after($nameInputSpan);
        $nameInputSpan.attr('hidden', false);
        return false;

    } else {

        $nameInputSpan.attr('hidden', true);

        return true;

    }
}



$emailInputSpan.css('color', error);

function email() {

    if (!(regex.test($($emailInput).val()))) {

        let $newEmailSpan = $emailInput.after($emailInputSpan);
        $emailInputSpan.attr('hidden', false);


        return false;
    } else {
        $emailInputSpan.attr('hidden', true);

        return true;


    }
}

const $activitySpan = $('<span class="validate">Please choose at least one activity</span>');

function activity() { //activity validation

    if (activityCostTotal === 0) {
        let $newActivitySpan = $($newDiv).before($activitySpan);
        $activitySpan.css('color', error);
        $activityClass.css('color', error);



        return false;

    } else {

        $activityClass.css('color', 'black');
        $activitySpan.attr('hidden', true)
        return true;
    }

}


$ccSpan.css('color', error);
$secondCCSPan.css('color', error);

function creditCardNum() { //credit card number validation

    
       
    
        if (!(ccRegex.test($('#cc-num').val())) ) {

            $($creditCardInput).after($secondCCSPan);
            $secondCCSPan.attr('hidden', false);
            $ccSpan.attr('hidden', true);
 
            return false;

      }

    
    
     else {

        $ccSpan.attr('hidden', true);
        $secondCCSPan.attr('hidden', true);
        return true;


    }

}


function zipcode() { //zipcode validation

    if (!(zipRegex.test($('#zip').val()))) {

        $zipSpan.css('color', error)
        let $newZipSpan = $($zipcodeInput).after($zipSpan);
        return false;

    } else {

        $zipSpan.attr('hidden', true);

        return true;
    }


}


$cvvSpan.css('color', error);

function cvv() { //cvv validation

    if (!(cvvRegex.test($('#cvv').val()))) {

        $cvvSpan.css('color', error);
        let $newCvvSpan = $($cvvInput).after($cvvSpan);


        return false;


    } else {
        $cvvSpan.attr('hidden', true);

        return true;

    }


}

function creditCardVal() { //validating credit card inputs

    $('#cc-num').keyup(function () {

        creditCardNum();
       


    })
    $('#zip').keyup(function () {

        zipcode();



    })
    $('#cvv').keyup(function () {

        cvv();

    })
}
creditCardVal();



$('form').submit(function (e) { //submit form function, prevents default actions

    if (name() === false) {
        e.preventDefault();


    }

    if (email() === false) {
        e.preventDefault();


    }
    if (activity() === false) {
        e.preventDefault();


    }
    if ($('#payment').val() === 'Credit Card') {
        if (creditCardNum() === false) {
 
            e.preventDefault();
            $ccSpan.attr('hidden', false);
            $($creditCardInput).after($ccSpan);
        }


        if (zipcode() === false) {
            e.preventDefault();


        }
        if (cvv() === false) {
            e.preventDefault();


        }
    }
})