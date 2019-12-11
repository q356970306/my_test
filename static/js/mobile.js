/**
 * js一次发送，后台for循环，返回字符串
 * */
function login(type) {
    var start = new Date().getTime();
    var url = '/my-test/mobile/create',

        data = {
            mobileTest: $("#mobileTest").val(),
            //渠道和接入方式固定写死
            testType:$("#project_select").val(),
            accessMode: "api",
            runType:type
        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",

        success: function (result) {
            console.log("下单结果为" + result);
            if (result != null && result != "") {
                alert("运营商任务创建成功，请稍后查询");
                $("#tradeNo").val(result);
            } else {
                alert("运营商任务创建异常");
            }
            console.log("耗时" + (new Date().getTime() - start) + "毫秒")
        }

    });
}


/**
 * 全部任务查询
 * */
function getAllStatus() {

    var url = '/my-test/mobile/moreStatus',
        data = {
        //将全部订单号，返回给 tradeNo1
            tradeNo1: $("#tradeNo").val(),
            testType:$("#project_select").val()
        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",
        success: function (result) {
            //保存状态查询结果
            $("#resultData").val(result);
        }
    });
}



/**
 * 单个、多个、全部任务状态查询
 * */
function getMoreStatus() {

    var url = '/my-test/mobile/moreStatus',
        data = {
            tradeNo1: $("#tradeNo1").val(),
            testType:$("#project_select").val()

        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",
        success: function (result) {
            //保存状态查询结果
            $("#resultData").val(result);
        }
    });
}









