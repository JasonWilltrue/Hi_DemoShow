window.onload = function () {
  var btn = document.getElementById("btn");
  var oul = document.getElementById("ul1");
  var ali = document.getElementsByTagName("li");
  var lilen = ali.length;
  var zindex = 1;

  //转换定位
  //                  for (var i=0;i<lilen;i++) {
  //                     ali[i].style.position = "absolute";
  //                 }
  //创建一个数组保存  每个图片的位置
  var picwz = [];
  for (var i = 0; i < lilen; i++) {
    picwz.push({
      left: ali[i].offsetLeft,
      top: ali[i].offsetTop
    })
  }
  for (var i = 0; i < lilen; i++) {
    ali[i].index = i; //为了回到原来的位置增加的索引值
    ali[i].style.left = picwz[i].left + "px";
    ali[i].style.top = picwz[i].top + "px";
    ali[i].style.position = "absolute";
    drag(ali[i])//调用拖动图片函数
  }
  function drag(obj) {
    var disX = 0;
    var disY = 0;
    var o = null;
    obj.onmousedown = function (ev) {
      var ev = ev || event;
      disX = ev.clientX - obj.offsetLeft;
      disY = ev.clientY - obj.offsetTop;
      obj.style.zIndex = zindex++;
      document.onmousemove = function (ev) {
        var ev = ev || event;
        obj.style.left = ev.clientX - disX + "px";
        obj.style.top = ev.clientY - disY + "px";
        //碰撞检测  循环所以Li  排除自己与自己的碰撞💥
        var pzArr = []; //每次move 初始为空
        for (var i = 0; i < lilen; i++) {
          if (obj != ali[i]) {
            pz(obj, ali[i]) && pzArr.push(ali[i]);
          }
        }
        console.log(pzArr);
        //拖动距离  算中心点 离哪一张图片的距离
        //设计一个方法   距离最短
        o = getshort(obj, pzArr);
        for (var i = 0; i < lilen; i++) {
          ali[i].style.border = "0px solid red";
        }
        if (o) //如果o 存在
        {
          o.style.border = "4px solid red";
          console.log(o);
        }

      }
      obj.onmouseup = function () {
        document.onmousemove = null;
        obj.onmouseup = null;
        //判断是否有碰撞
        if (!o) { //回到原来的位置
          //alert(obj.index);    
          startMove(obj, {
            left: picwz[obj.index].left,
            top: picwz[obj.index].top
          }, 1000, "backOut")
        } else {
          o.style.border = "";
          var p1 = picwz[obj.index];
          var p2 = picwz[o.index];
          //移动图片
          startMove(obj, {
            left: p2.left,
            top: p2.top
          }, 1000, "backOut")
          //被移动图片
          startMove(o, {
            left: p1.left,
            top: p1.top
          }, 1000)
          //由于索引没有变化  就需要替换
          //设置第三方变量存 index
          var _index = obj.index;
          obj.index = o.index;
          o.index = _index;
        }
      }
      return false;
    }
    //碰撞检测
    function pz(obj1, obj2) {
      var L1 = obj1.offsetLeft;
      var T1 = obj1.offsetTop;
      var R1 = L1 + obj1.offsetWidth;
      var B1 = T1 + obj1.offsetHeight;
      var L2 = obj2.offsetLeft;
      var T2 = obj2.offsetTop;
      var R2 = L2 + obj1.offsetWidth;
      var B2 = T2 + obj1.offsetHeight;
      //                         if (R1<L2  || B1 < T2 || L1 > R2 || T1 > B2) {
      //                         }
      return !(R1 < L2 || B1 < T2 || L1 > R2 || T1 > B2)
    }
    function getshort(obj, arr) {
      var o = null;
      var pos = 100000;
      for (var i = 0; i < arr.length; i++) {
        var a = (obj.offsetTop + obj.offsetHeight / 2) - (arr[i].offsetTop + arr[i].offsetHeight / 2);
        var b = (obj.offsetLeft + obj.offsetWidth / 2) - (arr[i].offsetLeft + arr[i].offsetWidth / 2);
        c = Math.sqrt(a * a + b * b);
        if (c < pos) {
          pos = c;
          o = arr[i]; //最小值
        }
      }
      return o;
    }
    //随机数
    btn.onclick = function () {
      var arr = [];
      for (var i = 0; i < lilen; i++) {
        arr.push(i);
      }
      arr.sort(function () {
        return Math.random() - 0.5
      })
      console.log(arr);//随机数组中[2, 3, 0, 1, 4, 5, 7, 8, 6]

      for (var i = 0; i < lilen; i++) {
        var posindex = arr[i];//随机数组中[2, 3, 0, 1, 4, 5, 7, 8, 6]
        ali[i].index = posindex; //这一步非常重要 索引 根据变化的值而变化
        startMove(ali[i], {
          left: picwz[posindex].left,
          top: picwz[posindex].top
        }, 1000, "backOut")
      }
    }
  }
}
