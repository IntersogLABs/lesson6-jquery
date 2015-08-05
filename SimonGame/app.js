$('document').ready(function () {
    var $round = $("#roundValue");
    var $score = $("#scoreValue");
    var $startButton = $('#startButton');
    var speed = 1000;
    $('.circle').on('click',function (event) {
        if(state.inAnimation){
            return
        }
        if(state.userSequence.length >= state.randomSequence.length){
            return
        }
        $(event.target).simonHighlight(speed, 0.2, function () {
        });
        var ind = [
            'simonButton1',
            'simonButton2',
            'simonButton3',
            'simonButton4'
        ].indexOf(event.target.id);
        userClick(ind);
    });
    $startButton.click(function () {
        if(state.round != 0){
            state.round = 0;
            state.randomSequence=[];
            state.userSequence=[];
        }
        nextRound();
    });


    var state = {
        round: 0,
        score: localStorage.getItem('score') || 0,
        randomSequence:[],
        userSequence:[],
        inAnimation: false
    };
    var simonButtons = [
        $('#simonButton1'),
        $('#simonButton2'),
        $('#simonButton3'),
        $('#simonButton4')
    ];
    function render(){
        $score.html(state.score);
        $round.html(state.round);
        $startButton.html(state.round == 0 ? 'Start' : 'Restart')
    }
    function nextRound(){
        state.round += 1;
        if(state.round - 1 > state.score){
            state.score = state.round - 1;
            localStorage.setItem('score', state.score);
        }
        state.userSequence = [];
        increaseSequence();
        render();
        randomSequenceShow();
    }
    function failGame(){
        alert("fail");
        state.round = 0;
        state.randomSequence = [];
        render();
    }
    function increaseSequence(){
        var newVal = Math.floor((Math.random() * 4));
        state.randomSequence.push(newVal);
        console.log("sec ",state.randomSequence);
    }
    function randomSequenceShow(){
        stopAnimation();
        state.inAnimation = true;
        function highlightElInSeq(ind, callback){
            if(ind >= state.randomSequence.length){
                callback();
                return
            }
            var btnNo = state.randomSequence[ind];
            var btn = simonButtons[btnNo];
            btn.simonHighlight(speed, 0.2, function () {
                highlightElInSeq(ind + 1, callback);
            });
        }
        highlightElInSeq(0, function () {
            state.inAnimation = false;
        })
    }
    function stopAnimation(){
        simonButtons.forEach(function (btn) {
            btn.stop();
            btn.css({opacity:1});
        });
    }
    function userClick(btnNo){
        state.userSequence.push(btnNo);
        console.log("user ", state.userSequence);
        var subCorrect = state.userSequence.every(function (el, ind) {
            return el == state.randomSequence[ind];
        });
        var correct = state.randomSequence.every(function (el, ind) {
            return el == state.userSequence[ind];
        });
        if(correct){
            setTimeout(nextRound, speed);

        }
        else if(subCorrect){
            console.log("continue");
        }
        else{
            failGame();
        }

    }
    render();
});

$.fn.simonHighlight = function simonHighlight(duration, minOpacity,callBack){
    if(!callBack){
        callBack = minOpacity;
        minOpacity = 0.5;
    }

    function fadeIn(el,callback){
        el.animate({opacity:minOpacity},{
            duration: duration/2,
            complete: callback
        })
    }
    function fadeOut(el,callback){
        el.animate({opacity:1},{
            duration: duration/2,
            complete: callback
        })
    }

    this.each(function (i, el) {
        fadeIn($(el),function () {
            fadeOut($(el),function () {
                callBack();
            })
        });
    });
    return this;
};