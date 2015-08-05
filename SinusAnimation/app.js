$('document').ready(function () {

    $('button.start')
        .click(function () {
            $('.point').css({
                left: 0,
                top: 200
            });
            startAnimation();
        });
    $('button.stop')
        .click(function () {
            $('.point').stop();
        })
    $('.duration').change(updateAnimation);
    $('.halfPeriods').change(updateAnimation);
    $('.amplitude').change(updateAnimation);


});
function updateAnimation(){
    var $point = $('.point');
    $point.stop();
    startAnimation()
}
function startAnimation(){
    var duration = 1000 * parseFloat($('.duration')[0].value);
    var halfPeriods = parseFloat($('.halfPeriods')[0].value);
    var amplitude = parseFloat($('.amplitude')[0].value);
    var $point = $('.point');
    var width = $point.parent().width();
    $point.periodicAnimation({
        zeroValue: {
            left: 0,
            top: 200
        },
        duration: duration,
        halfPeriods: halfPeriods,
        x: 'left',
        xEnd: width,
        y: 'top',
        yAmplitude: amplitude,
        periodicFunc: Math.sin,
        infinite: true
    });
}


$.fn.periodicAnimation = function periodicAnimation(options){
    options.zeroValue = options.zeroValue || {left: 0, top: 200};

    options.duration = options.duration || 1000;
    options.duration = options.duration > 0 ? options.duration: 1000;

    options.halfPeriods = options.halfPeriods || 1;
    options.halfPeriods = options.halfPeriods > 0 ? options.halfPeriods:1;

    options.x = options.x || 'left';

    options.xEnd = options.xEnd || 600;
    options.xEnd = options.xEnd === 0? 0.01: options.xEnd

    options.y = options.y || 'top';
    options.yAmplitude = options.yAmplitude || 100;
    options.periodicFunc = options.periodicFunc || Math.sin;
    options.infinite = options.infinite || false;
    var radLength = options.halfPeriods * Math.PI;
    function startAnimate(jqElement) {

        var currentX = parseFloat(jqElement.css(options.x));
        var restTime = options.duration * (1 - currentX / options.xEnd);
        var cssOptions = {};
        cssOptions[options.x] = options.xEnd;
        console.log(restTime);
        jqElement.animate(cssOptions, {
            duration: restTime,
            step: function (now, twin) {
                var progress = now / twin.end;
                var curRad = radLength * progress;
                var yOption = {};
                yOption[options.y] = options.zeroValue[options.y] + options.periodicFunc(curRad) * options.yAmplitude;
                $(twin.elem).css(yOption);
            },
            easing: 'linear',
            complete: function () {
                if (options.infinite) {
                    jqElement.css(options.zeroValue);
                    startAnimate(jqElement);
                }
            }
        });
    }

    this.each(function (i, el) {
        startAnimate($(el));
    });
    return this;
};