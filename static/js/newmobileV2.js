/**
 * js一次发送，后台for循环，返回字符串
 * */
function login(type) {
    var start = new Date().getTime();
    alert("运营商任务开始创建，请耐心等待");
    var url = '/my-test/mobileV2/newcreate',

        data = {
            mobileTest: $("#mobileTest").val(),
            //渠道和接入方式固定写死
            testType:$("#project_select").val(),
            accessMode: "api",
            runType:type,
            chanelType:$("#channel").val(),
            dataNotifyUrl:$("#dataNotifyUrl").val(),
            reportNotifyUrl:$("#reportNotifyUrl").val(),
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



                if(!(result.toString().indexOf("创建失败")!=-1))
                {   alert("运营商任务创建成功，请稍后查询");
                    $("#tradeNo").val(result);

                }else {
                    alert(result.toString());
                }



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

    var url = '/my-test/mobileV2/newmoreStatus',
        data = {
        //将全部订单号，返回给 tradeNo1
            tradeNo1: $("#tradeNo").val(),

            testType:$("#project_select").val(),
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

function getMoreStatus() {

    var url = '/my-test/mobileV2/moreStatus',
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









