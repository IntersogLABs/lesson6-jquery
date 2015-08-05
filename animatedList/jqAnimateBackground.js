/**
 * Created by IceBrick on 27.07.2015.
 */
$.fn.animateBackGround = function (color, duration) {
    var options = {
        backgroundColor: color
    }
    this.each(function (i, el) {
        animate(el, options, duration);
    });
    return this

};

function animate(
    element,//htmlNode
    optins, //{width:200px}
    duration, //
    delay,
    callback
){
    if(typeof duration === "function"){
        callback = duration;
        duration = undefined;
        delay = undefined;
    }else if(typeof delay === "function"){
        callback = delay;
        delay = undefined;
    }
    duration = duration || 500;
    duration = duration < 0? 500: duration;
    delay = delay || 0;
    delay = delay < 0? 500: delay;

    var computedStyle = window.getComputedStyle(element);

    var startStyle = {
        width: parseFloat(computedStyle.width),
        height: parseFloat(computedStyle.height),
        opacity: parseFloat(computedStyle.opacity),
        backgroundColor: parseColor(computedStyle.backgroundColor)
    };

    optins.backgroundColor = parseColor(optins.backgroundColor);

    var proDiff = {
        width: (optins.width - startStyle.width),
        height: (optins.height - startStyle.height),
        opacity: (optins.opacity - startStyle.opacity),
        backgroundColor: [
            (+optins.backgroundColor[0] - startStyle.backgroundColor[0]),
            (+optins.backgroundColor[1] - startStyle.backgroundColor[1]),
            (+optins.backgroundColor[2] - startStyle.backgroundColor[2])
        ]
    };

    function update(multyplyer){
        var currStyle = {
            width: startStyle.width + proDiff.width * multyplyer,
            height: startStyle.height + proDiff.height * multyplyer,
            opacity: startStyle.opacity + proDiff.opacity * multyplyer,
            backgroundColor: [
                (+startStyle.backgroundColor[0] + proDiff.backgroundColor[0] * multyplyer),
                (+startStyle.backgroundColor[1] + proDiff.backgroundColor[1] * multyplyer),
                (+startStyle.backgroundColor[2] + proDiff.backgroundColor[2] * multyplyer)
            ]
        };
        applyStyle(element, currStyle);
    }

    var startTime = undefined;

    function step(elapsTime){
        startTime = startTime || elapsTime;
        var timeDiff = elapsTime - startTime;
        var multiplyer = timeDiff / duration;
        update(multiplyer);
        if(multiplyer < 1){
            requestAnimationFrame(step);
        }
        else{
            update(1);
            callback && callback();
        }
    }

    setTimeout(function () {
        requestAnimationFrame(step);
    },delay)

}

function parseColor(color){



    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}



    if(color.charAt(0)=='#'){
        var R = hexToR("#FFFFFF");
        var G = hexToG("#FFFFFF");
        var B = hexToB("#FFFFFF");
        return [R, G, B];
    }
    return color.replace(/rgb\(|\)/g,"").split(", ").map(function (el) {
        return parseInt(el);
    })
}

function applyStyle(element,style){
    var bg = [
        style.backgroundColor[0].toFixed(0),
        style.backgroundColor[1].toFixed(0),
        style.backgroundColor[2].toFixed(0)
    ];
    var newStyle = {
        width: style.width + "px",
        height: style.height + "px",
        opacity: style.opacity,
        backgroundColor: "rgb("+bg.join(", ") + ")"
    }
    for(var propertyName in newStyle){
        element.style[propertyName] = newStyle[propertyName];
    }
}