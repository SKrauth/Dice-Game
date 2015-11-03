# Dice-Game

This was my first jQuery project. It's basically 1 player Yahtzee. It was fun to build and the score validation supplied some interesting problems to solve.

### Sample Code

```JavaScript
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
```

This is probably the most complex bit of my score validation. Most of the score validation starts with the same first three lines. `SortDice()` sorts the dice, which allows me to compair the relationship between the dice rather than trying to check their actual values.  `YAHTZEEBonus()` checks to see if you've gotten two or more Yahtzee's and give you a 100 point bonus if you have. I've never actually seen this happen though.

The if statements were interesting to come up with. My struggle with small straights was that you only care if four of the dice make a straight. Once the dice are sorted the fifth dice could be anywhere. As a result of that tricky fifth dice there are eighteen possible sorted outputs for a small straight. So I'm fairly pleased that I was able to narrow it down to four if statements.
