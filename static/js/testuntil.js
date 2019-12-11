/**
 * j加密
 * */
function login(type) {

    if($("#batchFund").val().replace(/\s/g, "").length==0) {

        alert("待加密字符串不能为空");
        return;

    }
        var url = '/my-test/testuntil/encrypt',

        data = {
            batchfundTest: $("#batchFund").val(),
            //渠道和接入方式固定写死
            testType:$("#project_select").val(),
            accessMode: "api",
            runType:type,
            ntxType:$("#type_select").val(),
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


                $("#tradeNo").val(result);
            } else {
                alert("加密失败");
            }
            console.log("耗时" + (new Date().getTime() - start) + "毫秒")
        }

    });
}





/**
 * 解密
 * */
function decrycode() {

    var url = '/my-test/testuntil/decrycode/',

        data = {
            batchfundTest: $("#batchFund").val(),
            //渠道和接入方式固定写死
            ntxType:$("#type_select").val(),
        };
    if($("#batchFund").val().replace(/\s/g, "").length==0) {
         alert("待解密字符串不能为空");
            return;
        }



       /* if(!($("#batchFund").val().toString().indexOf("==")!=-1))
    {  alert("待解密字符串错误，请检查后再试");
        return;
    }*/
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",

        success: function (result) {
            console.log("下单结果为" + result);
            if (result != null && result != "") {


                $("#tradeNo").val(result);
            } else {
                alert("解密失败请检查，解密字符串");
            }
            console.log("耗时" + (new Date().getTime() - start) + "毫秒")
        }

    });
}


/**
 * 全部任务查询
 * */
function md5() {

    var url = '/my-test/testuntil/md5/',

        data = {
            batchfundTest: $("#tmpsrting").val(),
            //渠道和接入方式固定写死

        };
    if($("#tmpsrting").val().replace(/\s/g, "").length==0) {
        alert("待加密字符串不能为空");
        return;
    }




    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",

        success: function (result) {
            console.log("下单结果为" + result);
            if (result != null && result != "") {


                $("#repayData").val(result);
            } else {
                alert("加密失败请检查，加密字符串");
            }
            console.log("耗时" + (new Date().getTime() - start) + "毫秒")
        }

    });
}










