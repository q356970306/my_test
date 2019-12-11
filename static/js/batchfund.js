/**
 * js一次发送，后台for循环，返回字符串
 * */
function login(type) {
    var start = new Date().getTime();


    if(($("#batchFund").val().replace(/\s/g, "").length==0)&&(type=="default")){

        alert("账号信息不能为空");
        return;
    }

    var url = '/my-test/fund/batchcreate',

        data = {
            batchfundTest: $("#batchFund").val(),
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
                if(!(result.toString().indexOf("传入参数有误")!=-1))
                {  alert("批量公积金任务创建成功，请稍后查询");

                }

                $("#tradeNo").val(result);
            } else {
                alert("批量公积金任务创建异常");
            }
            console.log("耗时" + (new Date().getTime() - start) + "毫秒")
        }

    });
}


/**
 * 全部任务查询
 * */
function getAllStatus() {

    var url = '/my-test/fund/batchfundstatus',
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













