/* bscroll 使用 */
(function() {
	//整个容器
	let listWrapper    = document.querySelector('.list-wrapper');
	let indexListNav   = document.querySelector('.index-list-nav');
	let indexListFixed = document.querySelector('.index-list-fixed');
	let indexListNavs  = indexListNav.querySelectorAll('li');

	let indexList = new BScroll(listWrapper, {
		probeType: 3,
	});

	let indexListContent = document.querySelector('.index-list-content');
	let indexLists       = indexListContent.children[1].children;
	console.log(indexListContent); //获取城市列表dom结构

	//执行事件
	indexList.on('scroll', function(e) {
		console.log('e.y轴：' + e.y);
		//排除顶部城市
		let y = -e.y;
		//如果在顶部则默认停留在第一个五角星位置
		//第0项之前的距离判断
		if (y < indexLists[0].offsetTop) {
			setNav(0);
			indexListFixed.style.display = 'none';
			return;
		}
		indexListFixed.style.display = 'block';

		//第倒数-1项之前的距离判断
		for (var i = 0; i < indexLists.length - 1; i++) {
			if (y >= indexLists[i].offsetTop && y < indexLists[i + 1].offsetTop) {
				setNav(i);
				indexListFixed.innerHTML = indexLists[i].children[0].innerHTML;
				return;
			}
			//最后一项的判断
			setNav(indexLists.length - 1);
			indexListFixed.innerHTML = indexLists[indexLists.length - 1].children[0].innerHTML;
		}
	});
	//原生touch事件
	indexListNav.addEventListener('touchstart', function(e) {
		console.log(e.target);
		console.log(e.changedTouches[0].clientY);
		//根据Y值变化找abcdefg clientY是相对可视区的距离
		setIndex(e.changedTouches[0].clientY);
	});
	indexListNav.addEventListener('touchmove', function(e) {
		setIndex(e.changedTouches[0].clientY);
	});

	function setIndex(y) {
		let index = getIndex(y);
		if (index < 0 || index > indexListNavs.length) {
			return;
		}
		// 这步完成就可以滚动abcdefg字母来滚动事件
		indexList.scrollToElement(indexLists[index], 400);
		//改变激活的颜色
		setNav(index);
	}
	/**
	 * 根据距离顶部高度来算
	 * @param {} y
	 */
	function getIndex(y) {
		//转换为相对于Ul的距离
		let navT = indexListNav.getBoundingClientRect().top;
		console.log('navt' + navT);
		let h     = 18;               //这是每一个字母的高度
		let index = (y - navT) / 18;
		console.log(parseInt(index));
		return parseInt(index);
	}

	function setNav(index) {
		indexListNavs.forEach(el => {
			console.log(el.classList); //每一个元素class属性
			el.classList.remove('active');
		});
		indexListNavs[index].classList.add('active');
	}
})();
