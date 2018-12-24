window.onload = function() {
    //上一张
    var oPrevDiv = document.getElementsByClassName('prev_div')[0];
    //下一张
    var oNextDiv = document.getElementsByClassName('next_div')[0];

    var aLi = document.getElementsByTagName('li');

    var arr = [];

    for (var i = 0; i < aLi.length; i++) {

        var oImg = aLi[i].getElementsByTagName('img')[0];

        arr.push([parseInt(getStyle(aLi[i], 'left')), parseInt(getStyle(aLi[i], 'top')), getStyle(aLi[i], 'opacity') * 100, getStyle(aLi[i], 'zIndex'), oImg.width]);

    }

    console.dir(arr);
    var prev = document.getElementsByClassName('prev')[0];
    var txt = prev.getElementsByClassName('txt')[0]
    oPrevDiv.onmouseover = function() {
        txt.style.opacity = '1';
    }
    oPrevDiv.onmouseout = function() {
        txt.style.opacity = '0';
    }
    oPrevDiv.onclick = function() { //左
        txt.style.opacity = '0';
        arr.push(arr[0]);
        arr.shift();

        for (var i = 0; i < aLi.length; i++) {

            var oImg = aLi[i].getElementsByTagName('img')[0];

            aLi[i].style.zIndex = arr[i][3];

            startMove(aLi[i], { left: arr[i][0], top: arr[i][1], opacity: arr[i][2] });

            startMove(oImg, { width: arr[i][4] });

        }

    };
    var next = document.getElementsByClassName('next')[0];
    var txt1 = next.getElementsByClassName('txt')[0]
    oNextDiv.onmouseover = function() {
        txt1.style.opacity = '1';
    }

    oNextDiv.onmouseout = function() {
        txt1.style.opacity = '0';
    }
    oNextDiv.onclick = function() { //右
        txt1.style.opacity = '0';
        arr.unshift(arr[arr.length - 1]);
        arr.pop();

        for (var i = 0; i < aLi.length; i++) {

            var oImg = aLi[i].getElementsByTagName('img')[0];

            aLi[i].style.zIndex = arr[i][3];

            startMove(aLi[i], { left: arr[i][0], top: arr[i][1], opacity: arr[i][2] });

            startMove(oImg, { width: arr[i][4] });

        }
    };

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

};