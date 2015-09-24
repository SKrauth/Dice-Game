$(document).ready(function(){
//This array holds the value of the dice. Defaults to 0 for keeps, and 1 for rolls.
    var dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

//Array to hold the dice id's, makes placing the dice in the correct div easier
    var diceCount = ["dice-0", "dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6", "dice-7", "dice-8", "dice-9"];
    
//Holds scores as they are input.
    var score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
//Holds the score id's, for score placement.
    var scoreCount =["score-0", "score-1", "score-2", "score-3", "score-4", "score-5", "score-6", "score-7", "score-8", "score-9", "score-10", "score-11", "score-12", "score-13"];

//helps keep track of roll count
    var rollLimit = 1;
    var roundTotal = 0;

//Outputs the dice to display.
    var diceOutput = function(){
            $.each( diceCount, function( i, val ) {
                $("#" + diceCount[i]).text(dice[i]);

                return ( diceCount !== "dice-9" );
            });    
    };

//Rolls, creates a random number, the dice.
    var diceRoll = function(){        
            $.each(dice, function(i, val){
                if (dice[i] != 0) {
                dice[i]=Math.floor(Math.random()*6+1);
                };

                return ( i !== 4);
            }); 
    };
    
    
//Runs roll program on button click
    $("#roll").click(function(){
        if (rollLimit < 4){
            diceRoll();
            diceOutput();

//Changes button to let user know what roll they are on
            rollLimit++;
            $("#roll").text("Roll #" + rollLimit);
        };  

//Changes button text to let user know they are out of rolls
        if (rollLimit === 4) {
            $("#roll").text("Out of Rolls");
            $("#roll-all").text("Out of rolls")
        };
    
    });
    
//This takes the keep dice and rolls all of them.
    $("#roll-all").click(function(){
        dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
        
        if (rollLimit < 4){
            diceRoll();
            diceOutput();

//Changes button to let user know what roll they are on
            rollLimit++;
            $("#roll").text("Roll #" + rollLimit);
        };  

//Changes button text to let user know they are out of rolls
        if (rollLimit === 4) {
            $("#roll").text("Out of Rolls");
            $("#roll-all").text("Out of rolls")
        };
    });
    
//This is the click function for the score card. Will eventually need a round counter so that after 13 rounds it will ask to reset the game.
    $("#next-round").click(function(){

//This takes the imput and stores it in our array.        
        jQuery.each( score, function( i, val ) {
            score[i] = $("#" + scoreCount[i]).val();
            return ( scoreCount !== "score-12" );
        });

//This is supposed to add the score of the array parts, not there yet. Missing something...
//        var scoreTotal = score[0] + score[1] + score[2] + score[3] + score[4] + score[5] + score[6] + score[7] + score[8] + score[9] + score[10] + score[11] + score[12];

//Outputs total score to bottom of the score sheet.
//            $("#score-total").text(scoreTotal);

//Resets dice array for a new round, removes "keeps"
        dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

//Resets dice display for a new round
        jQuery.each( diceCount, function( i, val ) {
            $("#" + diceCount[i]).text(" ");

            return ( diceCount !== "dice-9" );
        });

//Resets roll limit so the roll button can be clicked in the new round
        rollLimit = 1;
        $("#roll").text("Roll");
        
        

        roundTotal++;
        if (roundTotal <= 13){
            alert ("Thanks for playing!")
//Code for total output goes here!!!
        }
    });
    
//This very WET code holds the current version of our keep device. Needs DRYing and possibly a reversable function. Need rules clarifiction on if kept dice can be un-kept.
    $("#dice-0").click(function(){
        if (dice[0] > 0){
            dice[5]=dice[0];
            dice[0]=0;
            $("#dice-0").text(dice[0]);
            $("#dice-5").text(dice[5]);    
        }
    });
    $("#dice-1").click(function(){
        if (dice[1] > 0){
            dice[6]=dice[1];
            dice[1]=0;
            $("#dice-1").text(dice[1]);
            $("#dice-6").text(dice[6]);    
        }
    });
    $("#dice-2").click(function(){
        if (dice[2] > 0){
            dice[7]=dice[2];
            dice[2]=0;
            $("#dice-2").text(dice[2]);
            $("#dice-7").text(dice[7]);    
        }
    });
    $("#dice-3").click(function(){
        if (dice[3] > 0){
            dice[8]=dice[3];
            dice[3]=0;
            $("#dice-3").text(dice[3]);
            $("#dice-8").text(dice[8]);    
        }
    });
    $("#dice-4").click(function(){
        if (dice[4] > 0){
            dice[9]=dice[4];
            dice[4]=0;
            $("#dice-4").text(dice[4]);
            $("#dice-9").text(dice[9]);    
        }
    });
    
//This unkeeps dice.
    $("#dice-5").click(function(){
        if (dice[5] > 0){
            dice[0]=dice[5];
            dice[5]=0;
            $("#dice-0").text(dice[0]);
            $("#dice-5").text(dice[5]);    
        }
    });
    $("#dice-6").click(function(){
        if (dice[6] > 0){
            dice[1]=dice[6];
            dice[6]=0;
            $("#dice-1").text(dice[1]);
            $("#dice-6").text(dice[6]);    
        }
    });
    $("#dice-7").click(function(){
        if (dice[7] > 0){
            dice[2]=dice[7];
            dice[7]=0;
            $("#dice-2").text(dice[2]);
            $("#dice-7").text(dice[7]);    
        }
    });
    $("#dice-8").click(function(){
        if (dice[8] > 0){
            dice[3]=dice[8];
            dice[8]=0;
            $("#dice-3").text(dice[3]);
            $("#dice-8").text(dice[8]);    
        }
    });
    $("#dice-9").click(function(){
        if (dice[9] > 0){
            dice[4]=dice[9];
            dice[9]=0;
            $("#dice-4").text(dice[4]);
            $("#dice-9").text(dice[9]);    
        }
    });    

});