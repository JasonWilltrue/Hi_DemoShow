layui.use(['laypage', 'layer'], function() {
    var laypage = layui.laypage,
        layer = layui.layer;

    //调用分页
    function pageShow() {
        if (json.data.length) {
            laypage.render({
                elem: 'page', //挂载器
                count: json.data.length, //总长度
                limit: 6, //页面显示内容的个数
                jump: function(obj) {
                    //模拟渲染
                    document.getElementsByClassName("project-list")[0].innerHTML = function() {
                        var arr = [],
                            thisData = json.data.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit);
                        layui.each(thisData, function(index, item) {
                            arr.push(
                                ' <section class="project-item">' +
                                '<div class="project-item-body">' +
                                '<a href="' + item.url + '" class="project-item-thumb img-flicker">' +
                                '<img src="img/' + item.image + '" alt="提供高品质前端开发服务">' +
                                '</a><h3 class="project-item-title mo-text-overflow">' + item.title + '</h3>' +
                                '<p class="project-item-description">' + item.content + '</p>' +
                                '<div class="project-item-info">' +
                                '<span><i class="icon mo-icon-eye-open"></i> 1.02k</span>' +
                                '<span><i class="icon mo-icon-praisepressed"></i> 2</span>' +
                                '<span><i class="icon mo-icon-aixin"></i> 71</span>' +
                                '<span data-tipsy="开源项目" class="info mo-ui-tipsy mo-tipsy--top"><i class="icon mo-icon-coding"></i> </span>' +
                                '</div></div></section>');
                        });
                        return arr.join('');
                    }();
                }
            });
        }
    }
    pageShow();

});