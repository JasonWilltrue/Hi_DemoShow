window.onload = function() {
    var aInput = document.getElementsByTagName('input');
    var oDiv = document.getElementById('div1');
    var oNowTime = document.getElementById('nowTime');
    var oNextTime = document.getElementById('nextTime');
    //获取span
    var aNowSpan = oNowTime.getElementsByTagName("span");
    var aNextSpan = oNextTime.getElementsByTagName("span");
    //获取所以td
    var aTd = oDiv.getElementsByTagName("td");
    var bBtn = true;

    aInput[2].onclick = function() {
        var oDate = new Date();
        if (bBtn) {
            oDiv.style.display = "block";
            //判断是否下一年
            if (oDate.getMonth() + 1 == 12) {
                //传位置   年 月  true代表这个月还是下一个月
                showDate(oNowTime, oDate.getFullYear(), oDate.getMonth() + 1, true);
                showDate(oNextTime, oDate.getFullYear() + 1, 1);
            } else {
                showDate(oNowTime, oDate.getFullYear(), oDate.getMonth() + 1, true);
                showDate(oNextTime, oDate.getFullYear(), oDate.getMonth() + 2);
            }
            //调用查找日期方法找到当前日期所对应的td
            showColor(oDate.getDate());
            showBtn();
            showClick();
            hideLastTr();
        } else {
            oDiv.style.display = "none";
        }
        bBtn = !bBtn;
    };

    function showDate(obj, year, month, bBtn) {
        var oDate = new Date();
        //设置开关防止重新生成
        if (!obj.bBtn) {
            //生成周表格table table有个特别在ie下用HTML是不兼容的
            obj.oTitle = document.createElement('div');
            obj.oTitle.className = 'title';
            obj.appendChild(obj.oTitle);

            var oTable = document.createElement('table');
            var oThead = document.createElement('thead');
            var oTr = document.createElement('tr');
            var arr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            for (var i = 0; i < 7; i++) {
                var oTh = document.createElement('th');
                oTh.innerHTML = arr[i];
                if (i == 0 || i == 6) {
                    oTh.className = "red";
                }
                oTr.appendChild(oTh);
            }
            oThead.appendChild(oTr);
            oTable.appendChild(oThead);
            //生成日期 生成5个行 7个列  每一行七个列
            var oTbody = document.createElement('tBody');
            for (var i = 0; i < 6; i++) {
                var oTr = document.createElement("tr");
                for (var j = 0; j < 7; j++) {
                    var oTd = document.createElement("td");
                    oTr.appendChild(oTd);
                }
                oTbody.appendChild(oTr);
            }
            oTable.appendChild(oTbody);
            obj.appendChild(oTable);

            obj.bBtn = true;
        }
        //根据bbtn判断左边右边的年份换一种写法
        if (bBtn) {
            obj.oTitle.innerHTML = '<div class="l"><span>' + (month - 1) + '</span>月</div>' + '<div class="c"><span>' + year + '</span>年<span>' + month + '</span>月</div>';
        } else {
            obj.oTitle.innerHTML = '<div class="r"><span>' + (month + 1) + '</span>月</div>' + '<div class="c"><span>' + year + '</span>年<span>' + month + '</span>月</div>';
        }

        //生成每一个月的天数 每次点击月份清空
        var aTd = obj.getElementsByTagName('td');
        for (var i = 0; i < aTd.length; i++) {
            aTd[i].innerHTML = '';
        }
        //判断月份的天数
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            dayNum = 31;
        } else if (month == 4 || month == 6 || month == 9 || month == 11) {
            dayNum = 30;
        } else if (month == 2 && isLeapYear(year)) {
            dayNum = 29;
        } else {
            dayNum = 28;
        }
        oDate.setFullYear(year);
        oDate.setMonth(month - 1);
        oDate.setDate(1);
        console.log(oDate.getDay());
        //根据1号 对应的 getDay（）是周几？
        switch (oDate.getDay()) {
            case 0:
                //周日 第一个td开始遍历
                for (var i = 0; i < dayNum; i++) {
                    aTd[i].innerHTML = i + 1;
                }
                break;
            case 1:
                for (var i = 0; i < dayNum; i++) {
                    aTd[i + 1].innerHTML = i + 1;
                }
                break;
            case 2:
                for (var i = 0; i < dayNum; i++) {
                    aTd[i + 2].innerHTML = i + 1;
                }
                break;
            case 3:
                for (var i = 0; i < dayNum; i++) {
                    aTd[i + 3].innerHTML = i + 1;
                }
                break;
            case 4:
                for (var i = 0; i < dayNum; i++) {
                    aTd[i + 4].innerHTML = i + 1;
                }
                break;
            case 5:
                for (var i = 0; i < dayNum; i++) {
                    aTd[i + 5].innerHTML = i + 1;
                }
                break;
            case 6:
                for (var i = 0; i < dayNum; i++) {
                    aTd[i + 6].innerHTML = i + 1;
                }

                break;
        }
        //ajax请求
        ajax('js/data.js?' + Math.random(), function(str) {
            var j = eval('(' + str + ')');
            console.log(j)
            var now = 0;

            for (var i = 0; i < aTd.length; i++) {
                if (aTd[i].innerHTML == 1) {
                    now = i;
                }
            }

            if (j.code) {
                //如果这个月的天数小于数组长度则长度最多为日期天数
                for (var i = 0; i < j.list.length; i++) {
                    if (j.list[i]) {
                        var oP = document.createElement('p');
                        oP.innerHTML = j.list[i] + '元';
                        aTd[i + now].appendChild(oP);
                    }
                }
            }

        });

        //判断如果左边是1月 则 按钮应该是12月份
        if (month == 1 && bBtn) {
            obj.oTitle.getElementsByTagName('span')[0].innerHTML = 12;
        } else if (month == 12 && !bBtn) {
            obj.oTitle.getElementsByTagName('span')[0].innerHTML = 1;
        }


    };
    //判断是否是闰年
    function isLeapYear(year) {
        if (year % 4 == 0 && year % 100 != 0) {
            return true;
        } else {
            if (year % 400 == 0) {
                return true;
            } else {
                return false;
            }
        }
    };

    function showColor(date) {
        var result = []
        var oDate = new Date();
        var bBtn = true;
        var reg = new RegExp('' + date + '(<p>)*');
        var index = 0;
        for (var i = 0, len = aTd.length; i < len; i++) {
            if (aTd[i].innerHTML != "") {
                result.push(aTd[i]);
            }
        }
        //判断当前日期
        if (aNowSpan[1].innerHTML == oDate.getFullYear() && aNowSpan[2].innerHTML == oDate.getMonth() + 1) {
            for (var i = 0; i < result.length; i++) {
                if (reg.test(result[i].innerHTML) && bBtn) {
                    result[i].className = "red";
                    index = i;
                    bBtn = false;
                }
            }
            //找到当天日期是td第几个然后从今天开始往后几个都可以选择
            for (len = index + 11; index + 1 < len; index++) {
                result[index + 1].className = "blue";
            }

        } else {
            //清空每个td的颜色变灰色
            for (var i = 0; i < result.length; i++) {
                result[i].className = "";
            }
        }
    }

    function showBtn() {
        //获取左右2边的月份及年
        var leftMonth = parseInt(aNowSpan[0].innerHTML);
        var leftYear = parseInt(aNowSpan[1].innerHTML);
        var rightMonth = parseInt(aNextSpan[0].innerHTML);
        var rightYear = parseInt(aNextSpan[1].innerHTML);
        aNowSpan[0].parentNode.onclick = function() {
            if (leftMonth == 12) {
                showDate(oNowTime, leftYear - 1, leftMonth, true);
                showDate(oNextTime, leftYear, 1);
            } else {
                showDate(oNowTime, leftYear, leftMonth, true);
                showDate(oNextTime, leftYear, leftMonth + 1);
            }
            showBtn();
            showColor(new Date().getDate());


        }
        aNextSpan[0].parentNode.onclick = function() {
            if (rightMonth == 1) {
                showDate(oNowTime, rightYear, 12, true);
                showDate(oNextTime, rightYear + 1, rightMonth);
            } else {
                showDate(oNowTime, rightYear, rightMonth - 1, true);
                showDate(oNextTime, rightYear, rightMonth);
            }
            showBtn();
            showColor(new Date().getDate());

        }
    }
    //点击事件显示日期在输入框
    function showClick() {
        var re = /(\d+)((<p>)*)/;
        var oDate = new Date();
        for (var i = 0; i < aTd.length; i++) {
            aTd[i].index = i;
            aTd[i].onclick = function() {
                //判断可以点击的日期
                if (this.className == "red" || this.className == "blue") {
                    //判断左边日期还是右边日期
                    if (this.index < aTd.length / 2) {
                        this.innerHTML.replace(re, function($0, $1) {
                            aInput[0].value = oDate.getFullYear() + '-' + (oDate.getMonth() + 1) + '-' + $1;
                        });

                    } else {
                        if ((oDate.getMonth() + 2) == 1) {
                            this.innerHTML.replace(re, function($0, $1) {
                                aInput[0].value = oDate.getFullYear() + 1 + '-' + (oDate.getMonth() + 2) + '-' + $1;
                            });
                        } else {
                            this.innerHTML.replace(re, function($0, $1) {
                                aInput[0].value = oDate.getFullYear() + '-' + (oDate.getMonth() + 2) + '-' + $1;
                            });
                        }
                    }
                    //判断表格内是否有价格显示
                    if (this.getElementsByTagName('p')[0]) {
                        aInput[1].value = this.getElementsByTagName('p')[0].innerHTML;
                    } else {
                        aInput[1].value = '';
                    }

                    oDiv.style.display = 'none';
                    bBtn = true;

                }
            }
        }
    }
    //隐藏多余的td表格框
    function hideLastTr() {
        var bBtn = true;
        var bBtn2 = true;

        for (var i = 35; i < 42; i++) {
            if (aTd[i].innerHTML != '') {
                bBtn = false;
            }
        }

        if (bBtn) {
            for (var i = 35; i < 42; i++) {
                //			  aTd[i].style.display = 'none';
                aTd[i].style.height = '42px';
            }
        } else {
            for (var i = 35; i < 42; i++) {
                aTd[i].style.height = '';
            }
        }

        for (var i = 77; i < 84; i++) {
            if (aTd[i].innerHTML != '') {
                bBtn2 = false;
            }
        }

        if (bBtn2) {
            for (var i = 77; i < 84; i++) {
                aTd[i].style.height = '42px';
            }
        } else {
            for (var i = 77; i < 84; i++) {
                aTd[i].style.height = '';
            }
        }

    }

}