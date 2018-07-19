$(function() {
    //自动加载第一个省级
    var JSON = data;
    var proKey, cityName, ProName;
    $.each(JSON, function(key, cityArr) {
        $pro = $("<li data-value=" + key + ">" + JSON[key].name + "</li>");
        $("#province ul").append($pro);
    });
    //自动获取第一排数据为默认数据
    $("#province input").val($("#province ul li:first").text());
    $("#province input").attr("data-id", $("#province ul li:first").attr("data-value"));
    //初始化事件
    var proId = $("#province input").attr("data-id");
    render(proId);

    $('[name="nice-select"]').click(function(e) {
        $('[name="nice-select"]').find('ul').hide();
        $(this).find('ul').show();
        e.stopPropagation();
    });
    $('[name="nice-select"]').on("mouseenter mouseleave", "li", function(e) {
        $(this).toggleClass('on');
        e.stopPropagation();
    });

    $('[name="nice-select"]').on("click", "li", function(e) {
        var val = $(this).text();
        var id = $(this).attr("data-value");
        var parent = $(this).parents('[name="nice-select"]').attr("id");
        $(this).parents('[name="nice-select"]').find('input').val(val);
        $(this).parents('[name="nice-select"]').find('input').attr("data-id", id);
        $('[name="nice-select"] ul').hide();
        //点击加载
        if (parent == "province") {
            render(id);
        } else if (parent == "city") {
            var proKey = $("#province input").attr("data-id");
            var cityKey = id;
            var areaArr = JSON[proKey].city[cityKey].area;
            $("#area ul").empty();
            $.each(areaArr, function(key, area) {
                $area = $("<li value=" + key + ">" + areaArr[key] + "</li>");
                $("#area ul").append($area);
            });
            $("#address").val(ProName + "," + cityName + "," + areaArr[0]);
            //自动获取第一排数据为默认数据
            $("#area input").val($("#area ul li:first").text());
            $("#area input").attr("data-id", $("#area ul li:first").attr("data-value"));
        }
        e.stopPropagation();
    });
    $(document).click(function() {
        $('[name="nice-select"] ul').hide();
    });

    function render(id) {
        var cityArr = JSON[id].city;
        $("#city ul").empty();
        $.each(cityArr, function(key, area) {
            $city = $("<li data-value=" + key + ">" + cityArr[key].name + "</li>");
            $("#city ul").append($city);
        });
        $("#city input").val($("#city ul li:first").text());
        $("#city input").attr("data-id", $("#city ul li:first").attr("data-value"));
        var cityKey = $("#city input").attr("data-id");
        var areaArr = JSON[id].city[cityKey].area;
        $("#area ul").empty();
        $.each(areaArr, function(key, area) {
            $area = $("<li value=" + key + ">" + areaArr[key] + "</li>");
            $("#area ul").append($area);
        });
        //自动获取第一排数据为默认数据
        $("#area input").val($("#area ul li:first").text());
        $("#area input").attr("data-id", $("#area ul li:first").attr("data-value"));
    }


})







// $(function() {
//     var JSON = data;
//     var proKey, cityName, ProName;
//     $.each(JSON, function(key, cityArr) {
//         $pro = $("<li data-value=" + key + ">" + JSON[key].name + "</li>");
//         $("#province ul").append($pro);
//     });
//     //自动获取第一排数据为默认数据
//     $("#province input").val($("#province ul li:first").text());
//     $("#province input").attr("data-id", $("#province ul li:first").attr("data-value"));

//     function cityShow(obj) {
//         $("#address").empty();
//         ProName = obj.text();
//         proKey = obj.attr("data-value");
//         var cityArr = JSON[proKey].city;
//         $("#city ul").empty();
//         $.each(cityArr, function(key, area) {
//             $city = $("<li data-value=" + key + ">" + cityArr[key].name + "</li>");
//             $("#city ul").append($city);
//         });
//         $("#city").triggerHandler("change");
//         $("#address").val(ProName + "," + cityArr[0].name + "," + cityArr[0].area[0]);
//     }



//     // $("#city").on("change", function() {
//     //     cityName = $("#city input").val();
//     //     var cityKey = $("#city input").attr("data-id");
//     //     var areaArr = JSON[proKey].city[cityKey].area;
//     //     $("#area ul").empty();
//     //     $.each(areaArr, function(key, area) {
//     //         $area = $("<li value=" + key + ">" + areaArr[key] + "</li>");
//     //         $("#area").append($area);
//     //     });
//     //     $("#city").triggerHandler("change");
//     //     $("#address").val(ProName + "," + cityName + "," + areaArr[0]);
//     // });
//     // $("#province").triggerHandler("change");
//     // $("#area").on("change", function() {
//     //     var area = $("#area input").val();
//     //     $("#address").val(ProName + "," + cityName + "," + area);
//     // });

// })