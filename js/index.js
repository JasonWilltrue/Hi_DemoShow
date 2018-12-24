$(document).ready(function() {
    var html = list.map(function(item) {
        return `<li data-id=${item.id}>
                    <input type="checkbox">
                    <div>
                         <span>${item.caption}</span>
                         <span>${item.time}</span>
                    </div>
                    <p>${item.desc}</p>
               </li>`
    }).join(" ");
    var oUl = $(".emailListUl");
    oUl.html(html);
    //获取选中
    var checkedlen = $(".emailListUl li input");
    //全选按钮 或者 全不选

    var checkboxAll = $(".emailHead input");
    checkboxAll.on("click", function() {
            var arrs = whoSelected();
            console.log(arrs)
            $(".emailListUl li input").prop("checked", $(this).is(':checked'));
            if ($(this).is(':checked')) {
                $(".emailListUl li").css("background", "#f2f6f9");
            } else {
                $(".emailListUl li").css("background", "");

            }

        })
        //选中的input的个数 及下标
    $(".emailListUl li input").on('click', function() {
        if (!($(this).is(':checked'))) {
            $(".emailHead input").prop("checked", false);
            $(this).parent().css("background", "");
        } else {
            $(this).parent().css("background", "#f2f6f9");
        }
        var arr = whoSelected();
        if (arr.length == checkedlen.length) {
            $(".emailHead input").prop("checked", true);
        }

        $(this).parent().mousedown(function(ev) {
            /* Act on the event */
            //消灭冒泡
            ev.stopPropagation();
        });
    });
    //　用来获选中的input
    function whoSelected() {
        var arr = [];
        checkedlen.each(function() {
            if ($(this).is(":checked")) {
                arr.push($(this));
            }

        });
        return arr;
    }

    //删除
    var delet = $("#delet");
    delet.on('click', function() {
        htmldelete();
    });

    function htmldelete() {
        //点击并返回选择的个数；
        var selectArr = whoSelected();
        console.log(selectArr)
        for (var i = 0; i < selectArr.length; i++) {
            selectArr[i].parent().remove(); // 删除被选中input的父级li
            for (var j = 0; j < list.length; j++) {
                if (list[j].id == selectArr[i]) {
                    //这里应该是后端返回ajax传送数据请求数据库删除
                    list.splice(i, 1);
                    console.log(list);
                    console.log('删除成功')
                }
            };

        };
    }

    //在某一点上limousedown会出现 tip
    var tip = $("#hint3");
    var lis = oUl.find("li");
    var beenDel = $(".beenDel"); //删除

    lis.mousedown(function(ev) {
        var selectArr = whoSelected();
        console.log(selectArr.length);
        if ($(this).find("input").is(":checked")) {
            tip.show();
            tip.css("left", ev.clientX + 4 + "px");
            tip.css("top", ev.clientY + 4 + "px");
            tip.html('选中' + selectArr.length + '封邮件');
        } else {
            return;
        }
        //碰撞 默认没有碰到
        var isCollision = false;
        //获取选中了几个
        $(document).mousemove(function(ev) {
            /* Act on the event */
            tip.css("left", ev.clientX + "px");
            tip.css("top", ev.clientY + "px");
            ev.preventDefault();
            //取消默认行为
            if (collision($("#hint3"), $(".beenDel"))) {
                isCollision = true;
            }


        });
        $(document).mouseup(function() {
            /* Act on the event */
            tip.hide();
            if (isCollision) {
                //删除节点
                htmldelete();
            }

            document.mouseover = document.mouseup = null;
        });
    })

});
