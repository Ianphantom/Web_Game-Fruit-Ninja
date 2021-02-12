var play = false;
var score;
var trialsleft;
var fruits = ["apple", "banana", "cherries", "grapes", "mango", "orange", "peach", "pear", "watermelon"];
var speed;
var fall;
$(function(){
    $("#startreset").click(function(){
        if(play == true){
            location.reload();
        }else{
            play = true;
            score = 0; 
            $("#scorevalue").html(score);
            $("#trialsleft").show();
            trialsleft = 3;
            addHearts();
            $("#gameover").hide();
            $("#startreset").html("Reset Game");
            startGame();
        }
    });

    $("#fruit").mouseover(function(){
        score +=1;
        $("#scorevalue").html(score);
        $("#sound")[0].play();
        clearInterval(fall);
        $("#fruit").hide("explode", 500);
        setTimeout(startGame, 500);
    });

    function addHearts(){
        $("#trialsleft").empty();
        for(i=1;i<=trialsleft;i++){
            $("#trialsleft").append('<img src="images/heart.png" class="life">');
        }
    }
    
    function startGame(){
        $("#fruit").show();
        chooseFruit();
        $("#fruit").css({'left': Math.round(Math.random()*550), 'top' : -70});
        speed = Math.round(Math.random()*5)+1;
        fall = setInterval(function(){
            $("#fruit").css('top', $("#fruit").position().top + speed);
            if($("#fruit").position().top > $("#question").height()){
                if(trialsleft > 1){
                    $("#fruit").show();
                    chooseFruit();
                    $("#fruit").css({'left': Math.round(Math.random()*650), 'top' : -70});
                    speed = Math.round(Math.random()*5)+1;
                    trialsleft --;
                    addHearts();
                }else{
                    play = false;
                    $("#trialsleft").hide();
                    $("#startreset").html("Start Game");
                    $("#gameover").show();
                    $("#gameover").html(`<p>Game Over!</p><p>Your score is ${score} </p>`);
                    stopGame();
                }
            }
        }, 10);
    
    }
    
    function chooseFruit(){
        $("#fruit").attr('src', 'images/' + fruits[Math.round(Math.random()*8)] + '.png');
    }
    
    function stopGame(){
        clearInterval(fall);
        $("#fruit").hide();
    }
});
