window.onload=function(){
  var oDiv1 = document.getElementById("div1");
  var oDiv2 = document.getElementById("div2");
  var oDiv3 = document.getElementById("div3");
  var oImg2 = document.getElementById("img2");
  oDiv1.onmouseover=function(){
          oDiv2.style.display = "block";
          oDiv3.style.display = "block";
          oDiv1.onmousemove=function(ev){
          var ev = ev || event;
       var l = ev.clientX - oDiv2.offsetWidth/2;
       var t = ev.clientY - oDiv2.offsetHeight/2;
       if(l<0){
              l = 0;
       }
       if(l>oDiv1.offsetWidth-oDiv2.offsetWidth){
              l = oDiv1.offsetWidth-oDiv2.offsetWidth;
       }
         if(t<0){
              t = 0;
       }
       if(t>oDiv1.offsetHeight-oDiv2.offsetHeight){
             t = oDiv1.offsetHeight-oDiv2.offsetHeight;
       }
       //计算大图的位置
       var scaleX = l/(oDiv1.offsetWidth-oDiv2.offsetWidth);
       oImg2.style.left = (oDiv3.offsetWidth-oImg2.offsetWidth)*scaleX+"px";
       var scaleY = t/(oDiv1.offsetHeight-oDiv2.offsetHeight);
       oImg2.style.top = (oDiv3.offsetHeight-oImg2.offsetHeight)*scaleY+"px";
       document.title = scaleX;
          oDiv2.style.left = l +"px";
          oDiv2.style.top = t +"px";
      }
  }
 oDiv1.onmouseout=function(){
      oDiv2.style.display = "none";
      oDiv3.style.display = "none";
  }
}
