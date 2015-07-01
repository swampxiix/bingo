$( document ).ready(function() {

/* ######################################################
    CONSTANTS */

var field = [];

var COMBOS = {"B": [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 
          "I": [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
          "N": [31,32,33,34,35,36,37,38,39,40,41,42,43,44,45],
          "G": [46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
          "O": [61,62,63,64,65,66,67,68,69,70,71,72,73,74,75],
        };

/* ######################################################
    INIT */

reset_game();
$("#controls").hide();

/* ######################################################
    CALLABLE FUNCTIONS */

function reset_game () {
    field = [];
    $(".bbrow").remove();
    $("#balldisplay").removeClass('green');
    $("#balldisplay").removeClass('gray');
    $("#balldisplay").html('?');
    for (let in COMBOS) {
        var rowstring = '<tr class="bbrow"><td class="white">' + let;
        var rang = COMBOS[let];
        for (i = 0; i < rang.length; i++) {
            var num = rang[i];
            var tdid = let+num;
            rowstring = rowstring + '<td class="field" id="'+tdid+'">'+num
            var combo = let + ' ' + num;
            field.push(combo);
        }; // for
    $('#bigboard > tbody:last-child').append(rowstring);
    }; // for
};

function draw_ball () {
    var tumble = [];
    var n = 1;
    while (n < 18) {
        var dex = Math.floor(Math.random() * field.length) + 1 ;
        var ball = field[dex-1];
        if ( $.inArray(tumble, ball) == -1 ) {
            tumble.push(ball);
        }; // if
        n += 1;
    }; // while
    return tumble;
};

function roll_barrel () {
    var tumble = draw_ball(),
        counter = 0,
        timer = setInterval(function(){
            var ball = tumble[counter];
            $("#balldisplay").html(ball);
            counter++;
            if (counter === tumble.length) {
                clearInterval(timer);
                remove_ball_from_field(ball);
                $("#balldisplay").removeClass('gray');
                $("#balldisplay").addClass('green');
            } // if
        },100);
};

function remove_ball_from_field (ball) {
    var index = field.indexOf(ball);
    if (index > -1) {
        field.splice(index, 1);
    }; // if
    tdid = ball.replace(/\s+/g, '');
    $("#"+tdid).addClass('white');
    $("#drawbutton").removeAttr('disabled');
};

/* ######################################################
    EVENT HANDLERS */

$("#drawbutton").click(function() {
    if ($("#drawbutton").attr('disabled') == 'disabled') {
    } else {
        $("#drawbutton").attr('disabled', 'disabled');
        if ($("#sound-on").prop("checked")) {
            var beepboop = $('#beepboop')[0];
            beepboop.play();
        }; // if
        $("#balldisplay").removeClass('green');
        $("#balldisplay").addClass('gray');
        roll_barrel();
    }; // if

});

$("#newgame").click(function() {
    reset_game();
});
$("#csh").click(function() {
    $("#controls").toggle();
});



});
