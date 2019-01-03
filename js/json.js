//将一段数组分页展示
//测试数据
var json = {
	//储存每一个demo块
	data: [
		{
			title  : '分页组件',
			image  : '分页.png',
			url    : '分页/page1.html',
			content: 
				'分页在任务项目中都非常常见，引用第三方大库又影响性能，自己动手丰衣足食简单写了一个，如果有BUG请多多指教，来撩我吧~~(｡◕‿◕｡)',
		},
		{
			title  : '日历组件',
			image  : '日历.gif',
			url    : '日历/date02.html',
			content: '日历刚开始写思路一直很乱慢慢写参考别人的代码优化了很多，如果有BUG请多多指教，来撩我吧~~(｡◕‿◕｡)',
		},
		{
			title  : '运动插件',
			image  : 'sport.png',
			url    : '运动插件/sport4.html',
			content: '这个属于什么需要观察',
		},
		{
			title  : '轮播图',
			image  : '4.jpg',
			url    : '轮播图/index.html',
			content: '轮播图是很常见的一种页面形式',
		},
		{
			title  : '弹性运动',
			image  : 'pic1.png',
			url    : '弹性运动/index.html',
			content: '几个运动',
		},
		{
			title  : '城市联动',
			image  : '城市联动.jpg',
			url    : '城市联动/index.html',
			content: '一个关于省市区城市联动的小Demo',
		},
		{
			title  : '京东放大镜',
			image  : '放大镜.png',
			url    : '京东放大镜/index.html',
			content: '一个关于放大镜的小demo',
		},
		{
			title  : '苹果DOCK',
			image  : '苹果dock.png',
			url    : '苹果dock/index.html',
			content: '一个关于底部dock的小demo',
		},
		{
			title  : '照片墙拖动',
			image  : '照片墙拖动.png',
			url    : '照片墙拖动/index.html',
			content: '一个关于照片墙拖动的小demo；注意随机算法的使用，练习拖动效果的原理',
		},
		{
			title  : '展示图轮播',
			image  : '展示图.png',
			url    : '轮播图2/index.html',
			content: '一个关于展示图的小demo',
		},
		{
			title  : '屏保',
			image  : '屏保.png',
			url    : '屏保/index.html',
			content: '一个关于电视机屏保的效果',
		},
		{
			title  : '按钮美化',
			image  : '按钮美化.png',
			url    : '按钮美化/index.html',
			content: '一个关于按钮美化的效果',
		},
		{
			title  : '3D照片墙',
			image  : '3d照片墙.png',
			url    : '3D照片墙/index.html',
			content: '一个关于照片旋转的效果',
		},
		{
			title  : '自定义滚动条',
			image  : '自定义滚动条.png',
			url    : '自定义滚动条/index.html',
			content: '一个关于自定义滚动条的效果',
		},
		{
			title  : 'JS导览',
			image  : '',
			url    : 'JS导览/index.html',
			content: '一份关于学习JS的思维导图，希望对自己有帮助！',
		},
		{
			title  : 'Loadding',
			image  : 'loadding.png',
			url    : 'Loadding/index.html',
			content: '一个漂亮的Loadding效果！',
		},
		{
			title  : '卡片轮播',
			image  : '卡片.png',
			url    : '卡片交互轮播/index.html',
			content: '网络词语的卡片轮播！',
		},
		{
			title  : '模拟iphone列表效果',
			image  : '模拟iphone列表.png',
			url    : '模拟iphone列表效果/index.html',
			content: '手机上显示效果很赞👍哦',
		},
	],
};
