/*
Table of Contents
1. Global Variables
2. Global Functions
3. Dice roll mechanics
4. Scoring mechanics
*/


// 1. Global Variables


$(document).ready(function(){
//This array holds the value of the dice. Defaults to 0 for keeps, and 1 for rolls.
    var dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

//Array to hold the dice id's, makes placing the dice in the correct div easier
    var diceID = ["dice-0", "dice-1", "dice-2", "dice-3", "dice-4", "dice-5", "dice-6", "dice-7", "dice-8", "dice-9"];
    
//Holds scores as they are input.
    var score = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
//Holds the score id's, for score placement.
    var scoreID =["score-0", "score-1", "score-2", "score-3", "score-4", "score-5", "score-6", "score-7", "score-8", "score-9", "score-10", "score-11", "score-12", "score-13"];

//helps keep track of game pacing. Roll total and round total to end game.
    var rollLimit = 1;
    var roundTotal = 0;
    
//Boolean value for Yahtzee bonus
    var IsThereAlreadyAYahtzee = 0;
    
    
// 2. Global Functions
    

//Outputs the dice to display.
    var diceOutput = function(){
            $.each( diceID, function( i, val ) {
                $("#" + diceID[i]).text(dice[i]);

                return ( diceID !== "dice-9" );
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
    
//Contains normal turn functions, most importantly keeps track of, and displays, roll count 
    var TakeATurn = function(){
        if (rollLimit < 4){
            diceRoll();
            diceOutput();
            rollLimit++;
            $("#roll").text("Roll #" + rollLimit);
        };  

        if (rollLimit === 4) {
            $("#roll").text("Out of Rolls");
            $("#roll-all").text("Out of rolls")
        };
    };
    
//This function sorts the dice, for scoring purposes.
    var SortDice = function(){
        dice.sort(function(a,b){return b-a})
    };
    
//This function adds the dice together for scoring purposes.
    var diceSum = function(){
        var addDice = 0
        $.each(dice, function(i, val){
            addDice = addDice + dice[i];
            return ( i !== 9);
        });
        return(addDice);
    };
    
//Yahtzee bonus check.
    var YAHTZEEBonus = function(){
        if (IsThereAlreadyAYahtzee > 0) {
            if (dice[0] === dice[1] && dice[0] === dice[2] && dice[0] === dice[3] && dice[0] === dice[4]){
                alert("YAHTZEE Bonus! 100 extra points!");
                score[13] = score[13] + 100;
            }
        }
    };
    
// 3. Dice Roll Mechanics    
    

//Runs roll program on button click
    $("#roll").click(function(){
        TakeATurn();    
    });
    
//This removes the keep dice and rolls all of them.
    $("#roll-all").click(function(){
        dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
        TakeATurn();
    });

//This very WET code holds the current version of our keep device. Needs DRYing!
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


// 4. Scoring Mechanics

    
    var upperSection = function(checkNum){
        var score = 0;
        SortDice();
        YAHTZEEBonus();
        $.each( dice, function(i, val){
            if(dice[i] === checkNum){
                score = score + checkNum;
            };
        });
        return(score);
    };
    
    var threeOfAKind = function(){
        var score = 0;
        SortDice();
        YAHTZEEBonus();
        $.each(dice, function(i, val){
            if(dice[i] === dice[1 + 1] && dice[i] === dice[i + 2]){
                score = diceSum();
            };
            
            return(i !== 2);
        });
        return(score);    
    };
    
    var fourOfAKind = function(){
        var score = 0;
        SortDice();
        YAHTZEEBonus();
        if (dice[0] === dice[1]){
            if (dice[0] === dice[2] && dice[0] === dice[3]){
                score = diceSum();
            };
        }
        else if(dice[1] === dice[2]){
            if (dice[1] === dice[3] && dice[1] === dice[4]){
                score = diceSum();
            };
        };
        return(score);
    };
    
    var fullHouse = function(){
        var score = 0;
        SortDice();
        YAHTZEEBonus();
        if (dice[0] === dice[1] && dice[3] === dice[4]){
            if(dice[0] === dice[2] || dice[2] === dice[3]){
                score = 25;
            };
        };
        return(score);
    };
    
    var largeStraight = function(){
        var score = 0;
        SortDice();
        YAHTZEEBonus();
        if(dice[0] === dice[1]+1 && dice[0] === dice[2]+2 && dice[0] === dice[3]+3 && dice[0] === dice[4]+4){
            score = 40;
        };
        return(score);
    };
    
    var yahtzee = function(){
        var score = 0;
        SortDice();
        if(dice[0] === dice[1] && dice[0] === dice[2] && dice[0] === dice[3] && dice[0] === dice[4]){
            score = 50;
            IsThereAlreadyAYahtzee++
        };
        return(score);
    };
    
    var chance = function(){
        SortDice();
        YAHTZEEBonus();
        var score = diceSum();
        return(score);
    };
        
//This is the click function for the score card. Will eventually need a round counter so that after 13 rounds it will ask to reset the game.
    $("#next-round").click(function(){
        
//This takes the imput and stores it in our array. This should become obsolete upon score-check installation!   
        jQuery.each( score, function( i, val ) {
            score[i] = $("#" + scoreID[i]).val();
            return ( scoreID !== "score-12" );
        });
        console.log(largeStraight());
//Resets dice array for a new round, removes "keeps"
        dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

//Resets dice display for a new round. I wish there was a way to re-write this so that I could use diceOutput for DRYness.
        jQuery.each( diceID, function( i, val ) {
            $("#" + diceID[i]).text(" ");

            return ( diceID !== "dice-9" );
        });

//Resets roll limit and roll buttons so they can be clicked in the new round
        rollLimit = 1;
        $("#roll").text("Roll");
        $("#roll-all").text("Roll all");
        
//This keeps track of the round limits and ends the game when it is time.
        roundTotal++;
        if (roundTotal >= 13){
            alert ("Thanks for playing!")
//Code for total output goes here!!!
        }
    });
    
});