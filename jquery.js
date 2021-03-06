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
    var score = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    
//Holds the score id's, for score placement.
    var scoreID =["score-0", "score-1", "score-2", "score-3", "score-4", "score-5", "score-6", "score-7", "score-8", "score-9", "score-10", "score-11", "score-12", "score-13"];

//helps keep track of game pacing. Roll total and round total to end game.
    var rollLimit = 1;
    var roundTotal = 0;
    
//Boolean value for Yahtzee bonus
    var IsThereAlreadyAYahtzee = 0;
    
    var scoreArrayHolder = 0;
    var tempScoreHolder = 0;
    
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
    
    var upperBonusCheck = function(){
        var upperScores = 0;
        score[13] += 1
        $.each(score, function(i, val){
            upperScores += score[i];
            return (i !== 5);
        });
        if (upperScores >= 63){
            score[13] += 35;
        };
        return(upperScores);
    };
    
    var scoreTotal = function(){
        finalScore = 0;
        $.each(score, function(i, val){
            finalScore += score[i];
            return (i !== 13);
        });
        return(finalScore);
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
    
    var isSmallStraight = function(testArray){
        var smallStraights = {
            one: [1, 2, 3, 4],
            two: [2, 3, 4, 5],
            three: [3, 4, 5, 6]
        };
        var isOne = false;
        for(var property in smallStraights){
            var small = smallStraights[property];
            isOne = (testArray.indexOf(small[0])) > 0 &&
                    (testArray.indexOf(small[1])) > 0 &&
                    (testArray.indexOf(small[2])) > 0 &&
                    (testArray.indexOf(small[3]));
            if(isOne){
                break;
            }
        }
        return isOne;
    };
    
    var smallStraight = function(){
        var score = 0;
        SortDice();
        YAHTZEEBonus();
        if (dice[0] === dice[1]+1 && dice[0] === dice[2]+2 && dice[0] === dice[3]+3){
            score = 30;
        }
        else if (dice[1] === dice[2]+1 && dice[1] === dice[3]+2 && dice[1] === dice[4]+3){
            score = 30;
        }
        else if (dice[0] === dice[1]+1 && dice[0] === dice[3]+2 && dice[0] === dice[4]+3){
            score = 30;
        }
        else if (dice[0] === dice[1]+1 && dice[0] === dice[2]+2 && dice[0] === dice[4]+3){
            score = 30;
        }
        return score;
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
        
    $("#score-0").click(function(){
        scoreArrayHolder = 0;
        tempScoreHolder = upperSection(1);
        $("#score-0").text(tempScoreHolder);
        
    });
    
    $("#score-1").click(function(){
        scoreArrayHolder = 1;
        tempScoreHolder = upperSection(2);
        $("#score-1").text(tempScoreHolder);
    });
    
    $("#score-2").click(function(){
        scoreArrayHolder = 2;
        tempScoreHolder = upperSection(3);
        $("#score-2").text(tempScoreHolder);
    });
    
    $("#score-3").click(function(){
        scoreArrayHolder = 3;
        tempScoreHolder = upperSection(4);
        $("#score-3").text(tempScoreHolder);
    });
    
    $("#score-4").click(function(){
        scoreArrayHolder = 4;
        tempScoreHolder = upperSection(5);
        $("#score-4").text(tempScoreHolder);
    });
    
    $("#score-5").click(function(){
        scoreArrayHolder = 5;
        tempScoreHolder = upperSection(6);
        $("#score-5").text(tempScoreHolder);
    });
    
    $("#score-6").click(function(){
        scoreArrayHolder = 6;
        tempScoreHolder = threeOfAKind();
        $("#score-6").text(tempScoreHolder);
    });
    
    $("#score-7").click(function(){
        scoreArrayHolder = 7;
        tempScoreHolder = fourOfAKind();
        $("#score-7").text(tempScoreHolder);
    });
    
    $("#score-8").click(function(){
        scoreArrayHolder = 8;
        tempScoreHolder = fullHouse()
        $("#score-8").text(tempScoreHolder);
    });
    
    $("#score-9").click(function(){
        scoreArrayHolder = 9;
        tempScoreHolder = smallStraight();
        $("#score-9").text(tempScoreHolder);
    });
    
    $("#score-10").click(function(){
        scoreArrayHolder = 10;
        tempScoreHolder = largeStraight();
        $("#score-10").text(tempScoreHolder);
    });
    
    $("#score-11").click(function(){
        scoreArrayHolder = 11;
        tempScoreHolder = yahtzee();
        $("#score-11").text(tempScoreHolder);
    });
    
    $("#score-12").click(function(){
        scoreArrayHolder = 12;
        tempScoreHolder = chance();
        $("#score-12").text(tempScoreHolder);
    });
    
//This is the click function for the score card. Will eventually need a round counter so that after 13 rounds it will ask to reset the game.
    $("#next-round").click(function(){
        
//Takes temporary score and writes it to the array. This allows for mistake forgiveness.
        score[scoreArrayHolder] = tempScoreHolder;
        
//Resets score display at end of round, removes extra clicks.
        $.each( scoreID, function( i, val ) {
            if(score[i] >= 0){
                $("#" + scoreID[i]).text(score[i]);
            }
            else {
                $("#" + scoreID[i]).text(" ");
            }
            
            return ( scoreID !== "score-13" );
        });

//This keeps track of the round limits and ends the game when it is time.
        roundTotal++;
        if (roundTotal < 13){

//Resets dice array for a new round, removes "keeps"
            dice = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0];

//Resets dice display for a new round. I wish there was a way to re-write this so that I could use diceOutput for DRYness.
            $.each( diceID, function( i, val ) {
                $("#" + diceID[i]).text(" ");

                return ( diceID !== "dice-9" );
            });

//Resets roll limit and roll buttons so they can be clicked in the new round
            rollLimit = 1;
            $("#roll").text("Roll");
            $("#roll-all").text("Roll all");
        }
        else {
            $("#subtotal").text(upperBonusCheck());
            $("#total").text(scoreTotal());
            $.each( scoreID, function( i, val ) {
                $("#" + scoreID[i]).text(score[i]);
                return ( scoreID !== "score-13" );
            });
        };
    });
    
});