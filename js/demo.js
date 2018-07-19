//接之前的逻辑判断  如果 nownum 1了怎么办  变2了  最前也变成 -1 0
//必须再加判断

window.onload = function() {
    var json = {
        //储存每一个demo块
        data: [{
                title: "提供高品质前端开发服务",
                image: "1.jpg",
                content: "接活了！！！即日起，水墨寒有偿提供各种高品质前端开发服务，如果您有前端需求，请来撩我吧~~(｡◕‿◕｡)"
            },
            {
                title: "妙味课堂",
                image: "1.jpg",
                content: "这个属于什么需要观察"
            },
            {
                title: "妙味课堂",
                image: "1.jpg",
                content: "这个属于什么需要观察"
            }
        ]
    }
    var arr = []; //存 数组 坐标  
    var iNow = 5; //当前值  记录动作顺序
    page({
        id: "page",
        nowNum: 1,
        allNum: Math.ceil(json.data.length / 6), //如果3.4  必须向上取整
        callback: function(now, all) {
            //当前页数
            var num = (now * 6) < json.data.length ? 6 : (json.data.length - (now - 1) * 6); //总数减去 之前全部的
            var list = document.getElementsByClassName("project-list")[0];
            var section = list.getElementsByTagName("section");

            //判断list 是否有内容   没内容创建 初始化第一次
            if (list.innerHTML == "") {
                for (var i = 0; i < num; i++) {
                    render(i);
                }
                //=============定位布局================
                for (var i = 0; i < section.length; i++) {
                    arr.push([section[i].offsetLeft, section[i].offsetTop]); //不带px
                }
                console.log(arr);
                for (var i = 0; i < section.length; i++) {
                    section[i].style.position = "absolute";
                    section[i].style.left = arr[i][0] + "px";
                    section[i].style.top = arr[i][1] + "px";
                    section[i].style.margin = 0; //去除margin 给 绝对定位产生的影响
                }
                //=============定位布局================

            } else { //表示点击其他页数
                var timer = setInterval(function() {
                    startMove(section[iNow], { left: 200, top: 250, opacity: 0 });
                    if (iNow == 0) {
                        clearInterval(timer);
                        //关闭后 重新打开 取值 不是取inow  而是要取 num 知道下一张里面有多少个li
                        iNow = num - 1; //比如当前点击第四页 那inow就是第三页
                        for (var i = 0; i < num; i++) {
                            render(i);
                            // section[i].innerHTML = json.data[(now - 1) * 6 + i];
                        }
                        //=================展开=================
                        var timer2 = setInterval(function() {
                                startMove(section[iNow], { left: arr[iNow][0], top: arr[iNow][1], opacity: 60 });
                                //继续套路 判断 inow == 0 
                                if (iNow == 0) {
                                    clearInterval(timer2);
                                    iNow = num - 1; //num 2种  6  或者 最后一页 一张
                                } else {
                                    iNow--;
                                }
                            }, 60)
                            //=================展开=================
                    } else {
                        iNow--;
                    }
                }, 60);


            }

        }
    });

    function render(i) {
        var list = document.getElementsByClassName("project-list")[0];
        var section = document.createElement("section");
        var data = json.data[(now - 1) * 6 + i];
        section.innerHTML += '<div class="project-item-body">';
        section.innerHTML += ' <a href="/lab/service" class="project-item-thumb img-flicker">';
        section.innerHTML += '<img src="img/' + json.data[i].image + '" alt="提供高品质前端开发服务">';
        section.innerHTML += '</a><h3 class="project-item-title mo-text-overflow">' + json.data[i].title + '</h3>';
        section.innerHTML += '<p class="project-item-description">' + json.data[i].content + '</p><div class="project-item-info">';
        section.innerHTML += ' <span><i class="icon mo-icon-eye-open"></i> 1.02k</span>';
        section.innerHTML += '<span><i class="icon mo-icon-praisepressed"></i> 2</span>';
        section.innerHTML += '<span><i class="icon mo-icon-aixin"></i> 71</span>';
        section.innerHTML += ' <span data-tipsy="开源项目" class="info mo-ui-tipsy mo-tipsy--top"><i class="icon mo-icon-coding"></i></span></div></div>';
        list.appendChild(section.innerHTML);
    }


    //分页函数
    function page(opt) {
        if (!opt.id) {
            return false;
        }
        var obj = document.getElementById(opt.id);
        var nowNum = opt.nowNum || 1;
        var allNum = opt.allNum || 5;
        //必须判断回调是否存在；
        var callback = opt.callback || function() {};
        //写首页  上一页 大于6才能从中间开始向2边扩散
        if (nowNum > 4 && allNum >= 6) {
            var oA = document.createElement("a");
            oA.href = "#" + 1;
            oA.innerHTML = "首页";
            obj.appendChild(oA);
        }
        //上一页  大于等于2
        if (nowNum >= 2) {
            var oA = document.createElement("a");
            oA.href = "#" + (nowNum - 1);
            oA.innerHTML = "上一页";
            obj.appendChild(oA);
        }


        if (allNum <= 5) {
            for (var i = 1; i <= allNum; i++) {
                var oA = document.createElement("a");
                oA.href = "#" + i;
                if (nowNum == i) {
                    oA.innerHTML = i;
                } else {
                    oA.innerHTML = "[" + i + "]";
                }
                obj.appendChild(oA);
            }

        } else {
            for (var i = 1; i <= 5; i++) {
                var oA = document.createElement("a");
                if (nowNum == 1 || nowNum == 2) {
                    oA.href = "#" + i;
                    if (nowNum == i) {
                        oA.innerHTML = i;
                    } else {
                        oA.innerHTML = "[" + i + "]";
                    }
                    obj.appendChild(oA);
                } //判断最后2页的值  找准规律   6 7 8 9 6
                else if ((allNum - nowNum) == 0 || (allNum - nowNum) == 1) {
                    oA.href = "#" + (allNum - 5 + i);
                    //重点分析 判断 最后2项  9的时候  6的时候
                    if ((allNum - nowNum) == 0 && i == 5) {
                        oA.innerHTML = (allNum - 5 + i);
                    } else if ((allNum - nowNum) == 1 && i == 4) {
                        oA.innerHTML = (allNum - 5 + i);
                    } else {
                        oA.innerHTML = "[" + (allNum - 5 + i) + "]";
                    }
                    obj.appendChild(oA);

                } else {
                    oA.href = "#" + (nowNum - 3 + i);
                    if (nowNum == (nowNum - 3 + i)) {
                        oA.innerHTML = (nowNum - 3 + i);
                    } else {
                        oA.innerHTML = "[" + (nowNum - 3 + i) + "]";
                    }
                }
                obj.appendChild(oA);

            }
        }
        // 下一页   
        if ((allNum - nowNum) >= 1) {
            var oA = document.createElement("a");
            oA.href = "#" + (nowNum + 1);
            oA.innerHTML = "下一页";
            obj.appendChild(oA);
        }
        //尾页 为什么要大于6   如果只有5张就没必要
        if ((allNum - nowNum) >= 3 && allNum >= 6) {
            var oA = document.createElement("a");
            oA.href = "#" + allNum;
            oA.innerHTML = "尾页";
            obj.appendChild(oA);
        }
        callback(nowNum, allNum);
        var aA = document.getElementsByTagName("a");
        for (var i = 0; i < aA.length; i++) {
            aA[i].onclick = function() {
                //alert(this.getAttribute("href").substring(1));
                var nowNum = parseInt(this.getAttribute("href").substring(1));
                obj.innerHTML = ""; //清空整个之后重新生成
                page({
                        id: opt.id,
                        nowNum: nowNum,
                        allNum: allNum,
                        callback: callback
                    })
                    //阻止默认事件
                return false;
            }
        }

    }
}