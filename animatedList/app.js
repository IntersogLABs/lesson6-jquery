$(document).ready(function(){
    $('body').append($('<ul></ul>'))
    $('ul').animatedList(6, 2000,
        {
            background:'green',
            width: 1
        },
        {
            background:'rgb(230, 60, 90)',
            width:200
        }
    );
});


$.fn.animatedList = function (count, duration, itemsStartOpt, finishOpt ) {
    itemsStartOpt = itemsStartOpt || {
            background:'red',
            width: 1
        };
    finishOpt = finishOpt || {
            width: 200
        };
    duration = duration || 1000;
    function animateList(elements){
        var ind = 0;
        var len = elements.length;
        (function recurs(){
            if(ind >= len){
                return
            }
            var el = $(elements[ind]);
            ind++;
            el.animate(finishOpt,duration,recurs);
            el.animateBackGround(finishOpt.background,duration);
        })();
    }
    function fillList(list){
        var items = [];
        for(var i=0; i < count; i++){
            var li = $('<li>'+i+'</li>');
            li.css(itemsStartOpt);
            list.append(li);
            items.push(li);
        }
        animateList(list.find('li'));
        return list;
    }

    this.each(function (i, el) {
        fillList($(el));
    });
    return this

}