window.onload=function()
{
    var oDiv1 = document.getElementById("div1");
    var aImgs = oDiv1.getElementsByTagName("img");
    var ainput = document.getElementsByTagName("input");
    
    console.log(aImgs[0].getBoundingClientRect());
    
document.onmousemove = function(ev) {
       //计算鼠标到每个图片之间的直线距离
       var e = ev || event;
       for (var i=0; i<aImgs.length; i++) {
           //计算直线距离
           //因为鼠标是到可视区的距离，所以，我们应该获取鼠标到可视区的距离-元素到可视区的距离
           var a = Math.abs(e.clientY - aImgs[i].getBoundingClientRect().y - aImgs[i].offsetHeight / 2);
           var b = Math.abs(e.clientX - aImgs[i].getBoundingClientRect().x - aImgs[i].offsetWidth / 2);
           var c = Math.sqrt(a*a + b*b);
       
           if (c > 300) {
               c = 300;
           }
           aImgs[i].style.width = 128 - ( c * 0.2 ) + 'px';
       }
   }
}