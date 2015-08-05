$('document').ready(function () {
    var $rateProgress = $('.rateProgress')

    var fpsSpeed = 40;
    var fps =  fpsSpeed/1000;
    $rateProgress.css('transition', ' width '+ fps+ 's linear');
    var $scoreValue = $('#scoreValue');
    var multiplier = parseFloat($rateProgress.parent().css('width')) / 100;
    var state = {
        progressState: 100,
        frequency: 2,
        score: 0
    };
    function render(){
        var width =  (100-state.progressState) * multiplier;
        //console.log('rend ',width)
        $rateProgress.css({
            width: width
        });
        $scoreValue.text(state.score);
    }
    function updateProgress(diff){
        var newVal = state.progressState + diff;
        if(newVal > 100){
            newVal = 100;
        }
        if(newVal < 0){
            newVal = 0;
        }
        state.progressState = newVal;
        //render();
    }
    function updateFrequency(){
        var progress = state.progressState;
        var freq = Math.round(progress / 10 % 11);

        freq = 90 <=progress && progress <= 100 ? 12 :
               70 <=progress && progress < 90 ? 10 :
               40 <=progress && progress < 70 ? 9 :
               20 <=progress && progress < 40 ? 7 : 5;
        state.frequency = freq;
    }
    function addProgress(diff){
        updateProgress(diff);
        updateFrequency();
        render();
    }
    function givePoints(){
        var progress = state.progressState;
        var points = Math.round(progress / 10 % 11);
        state.score += points;
    }
    $('#cliker').click(function () {
        addProgress(2);
        givePoints();
    });

    setInterval(function () {
        var downSpeed = state.frequency * fps;
        addProgress(-downSpeed);
    },fpsSpeed);

});