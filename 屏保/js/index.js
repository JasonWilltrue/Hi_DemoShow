window.onload = function () {
	//获取节点
	var wrap = document.getElementById('wrap');
	var str = '';
	for (var i = 0; i < 70; i++) {
		str += "<div style='background-position-x:" + -10 * i + "px'></div>";
	}
	wrap.innerHTML = str;
	var divs = wrap.getElementsByTagName('div');
	var num = 0;
	var timer;
	var srcNum = 2;
	go();
	function go() {
		timer = setInterval(function () {
			//		console.log( 1 );
			// 切换图片
			tab(num);
			num++;
			if (num == 71) {
				clearInterval(timer);
				srcNum++;
				if (srcNum == 6) {
					srcNum = 1;
				}
				num = 0;
				setTimeout(go, 500);
			}
		}, 80);
	}
	function tab(n) {
		if (divs[n - 1]) {
			//如果上一个存在
			divs[n - 1].style.opacity = 1;
		}
		if (divs[n]) {
			divs[n].style.opacity = 0;
			divs[n].style.backgroundImage = 'url(img/0' + srcNum + '.png)';
		}
	}
};
