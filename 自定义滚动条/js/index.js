window.onload=function(){
    var oBox=document.getElementById('box');
    var oDrag=document.getElementById('drag');
    var content=document.getElementById('content');//内容主容器
    var oText = document.getElementById('text');
    var conHeight=content.clientHeight
    var textHeight = oText.clientHeight
    oDrag.onmousedown=function (ev){
        //阻止默认事件
        var e=ev||window.event;
        if (e.preventDefault) {
            e.preventDefault();
        } else{
            e.returnValue=false;
        };
         //e.clientY鼠标当前坐标
        var downY=e.clientY-oDrag.offsetTop;
        //滑块滚动最大距离
        var maxTop = oBox.clientHeight-oDrag.clientHeight
        document.onmousemove=function (ev){
            var e=ev||window.event;
            var top=e.clientY-downY;
            if (top<=0) {
                top=0;
            };

            if (top>=maxTop) {
                top=maxTop;
            };
            var scale=top/maxTop;
            var contentY=scale*(conHeight-textHeight);
            oDrag.style.top=top+'px';
            oText.style.top=contentY+'px';

        }
        document.onmouseup=function (){
            document.onmousemove=document.onmousemove=null;
        }

    }
    var str=window.navigator.userAgent.toLowerCase();
    //火狐浏览器
    if (str.indexOf('firefox')!=-1){
         document.addEventListener('DOMMouseScroll',function (e){
            e.preventDefault();//阻止窗口默认的滚动事件
            if (e.detail<0) {    //向上滚动    div向下滚动
                var scrollHei=oText.offsetTop+25;
                if (scrollHei>=0) {
                    scrollHei=0;
                };
                if (scrollHei<=-(textHeight-conHeight)) {
                    scrollHei=-(textHeight-conHeight);
                };
                var scale=scrollHei/(textHeight-conHeight);
                var top=scale*(oBox.clientHeight-oDrag.clientHeight);
                oText.style.top=scrollHei+'px';
                oDrag.style.top=-top+'px';
            }
            if (e.detail>0) {   //向下滚动    div向上滚动
                var scrollHei=oText.offsetTop-25;
                if (scrollHei>=0) {
                    scrollHei=0;
                };
                if (scrollHei<=-(textHeight-conHeight)) {
                    scrollHei=-(textHeight-conHeight);
                };
                var scale=scrollHei/(textHeight-content.clientHeight);
                var top=scale*(oBox.clientHeight-oDrag.clientHeight);
                oText.style.top=scrollHei+'px';
                oDrag.style.top=-top+'px';
            };
        },false);
    }
    else{//非火狐浏览器
        console.log("非火狐浏览器")
        document.onmousewheel=function (ev){
            var e=ev||window.event;
            if (e.preventDefault) {
                e.preventDefault();
            } else{
                e.returnValue=false;
            };
            if (e.wheelDelta>0) {  //向上滚动    此时div向下移动
                var scrollHei=oText.offsetTop+25;
                if (scrollHei>=0) {
                    scrollHei=0;
                };
                if (scrollHei<=-(textHeight-conHeight)) {
                    scrollHei=-(textHeight-conHeight);
                };
                var scale=scrollHei/(textHeight-conHeight);
                var top=scale*(oBox.clientHeight-oDrag.clientHeight);
                oText.style.top=scrollHei+'px';
                oDrag.style.top=-top+'px';
            };
            if (e.wheelDelta<0) {  //向下
                console.log("下")
                var scrollHei=oText.offsetTop-25;
                if (scrollHei>=0) {
                    scrollHei=0;
                };
                if (scrollHei<=-(textHeight-conHeight)) {
                    scrollHei=-(textHeight-conHeight);
                };
                var scale=scrollHei/(textHeight-conHeight);
                var top=scale*(oBox.clientHeight-oDrag.clientHeight);
                oText.style.top=scrollHei+'px';
                oDrag.style.top=-top+'px';
            };
        }
    }

}
