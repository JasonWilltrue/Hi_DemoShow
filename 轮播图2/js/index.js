window.onload = function() {
	var imgs   = document.getElementsByTagName('img');
	var target = '';
	var n      = 6;                                     //开始值
	var onoff  = true;                                  //解决快速多点   乱跑问题
	setTimeout(function() {
		tab(n);
	}, 200);

	//   3 4 5 6 0 1 2   //初始化
	function tab(n) {
		for (var i = 0; i < 3; i++) {
			var left = n - 1 - i;
			if (left < 0) {
				// 重要步骤一
				left = left + 7;
			}
			imgs[left].style.transform = 
				'translateX(' + -150 * (i + 1) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(30deg)'; //往右边移动 150   景深 2边 离中心越远 越 小
			var right = n + 1 + i;
			if (right > 6) {
				// 重要步骤一
				right = right - 7;
			}
			imgs[right].style.transform = 
				'translateX(' + 150 * (i + 1) + 'px) translateZ(' + (200 - i * 100) + 'px) rotateY(-30deg)';
		}
		imgs[n].style.transform = 'translateZ(300px)';
	}

	for (var i = 0; i < imgs.length; i++) {
		imgs[i].index   = i;
		imgs[i].onclick = function() {
			if (!onoff) {
				return;
			}
			onoff  = false;
			target = this.index;
			//alert(this.index)
			//gonext();
			//是否走下一张最近  还是上一张最近  当前值 》点击值    相减 》= 3
			if (target > n) {
				//  点击 6  当前 2
				if (target - n <= 3) {
					gonext(); //往上走
				} else {
					goprev(); //往下走
				}
			} else {
				//  点击 0  当前 6
				if (n - target >= 4) {
					gonext(); //往上走
				} else {
					goprev(); //往下走
				}
			}
		};
	}

	function gonext() {
		//图片切换
		n++; // +1
		if (n > 6) {
			//判断是否大于6  回归 0
			n = 0;
		}
		tab(n); //顺序不能乱
		if (n == target) {
			//点击值  ==  已经到达的值则退出   运动完成
			onoff = true;
			return;
		}
		setTimeout(function() {
			gonext();
		}, 700);
	}
	function goprev() {
		//图片切换
		n--; // +1
		if (n < 0) {
			//判断是否大于6  回归 0
			n = 6;
		}
		tab(n); //顺序不能乱
		if (n == target) {
			//点击值  ==  已经到达的值则退出

			onoff = true;
			return;
		}
		setTimeout(function() {
			goprev();
		}, 700);
	}
};
