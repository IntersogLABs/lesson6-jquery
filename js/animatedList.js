$.fn.animatedList = function(count){
var END_WIDTH = 200;
var cb = function(){
    var $next = $(this).next();
    if ($next[0]) animateLi($next)
}
var $ul = this;
var $li;
var parseColor = function(color) {
    if (color.charAt(0) == '#') {
	var nhex = (color.length - 1) / 3;
	return [
	    parseInt(color.substr(1, nhex), 16),
	    parseInt(color.substr(1+nhex, nhex), 16),
	    parseInt(color.substr(1+2*nhex, nhex), 16),
	]
    } else {
	color = color.replace(/rgb\((.*?)\)/, '$1').split(', ');
	return [
	    parseInt(color[0]),
	    parseInt(color[1]),
	    parseInt(color[2])
	];
    }
};

var buildColor = function(channels) {
    return 'rgb('+
	channels[0]+', '+
	channels[1]+', '+
	channels[2]+')';
}

var animateBgColor = function(now, tween) {
	var fromColor = parseColor(this.style.backgroundColor)
	var toColor = [255,127,63];
	var coef = tween.now/tween.end;
	var currentColor = [
	    parseInt(fromColor[0]+(toColor[0]-fromColor[0])*coef),
	    parseInt(fromColor[1]+(toColor[1]-fromColor[1])*coef),
	    parseInt(fromColor[2]+(toColor[2]-fromColor[2])*coef)
	];
	this.style.backgroundColor = buildColor(currentColor);
};

var animateLi = function($el){
    $el.animate({
        'width':END_WIDTH
    }, {
	'duration':500,
	'complete':cb,
	'step':animateBgColor
    });
};

for (var i=0; i<count; i++) {
    $li = $('<li>')
	.width(1)
	.appendTo($ul)
	.css({
	    'backgroundColor': '#f00',
	    'height': 20
	})
    if (!i)
	animateLi($li);
}
};
