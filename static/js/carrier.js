/**
 * Created by Lituo on 2017/4/27.
 */
var NewcarrierData ;
function login(){
    var url='/my-test/carrier/create',
        data={
            loginId:$("#loginId").val(),
            logPwd:$("#loginPwd").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
            testType:$("#project_select").val(),
            accessMode:$("#access_mode").val(),
            userId:$("#userId").val(),

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            if(result.success){
                alert("任务创建成功:"+result.data.tradeNo);
                $("#tradeNo").val(result.data.tradeNo);
            }else {
                alert("任务创建失败:"+result.errorMsg);
            }

        }
    });
}

function batchLogin(){
    for(var i=100; i < 200; i++){
        var url='/my-test/carrier/create',
            data={
                loginId:$("#loginId").val()+i,
                logPwd:$("#loginPwd").val(),
                realName:$("#realName").val(),
                idCard:$("#idCard").val(),
                testType:$("#project_select").val(),
                accessMode:$("#access_mode").val(),
                userId:$("#userId").val(),

            };
        $.ajax({
            url:url,
            data:JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType:"json",
            type:"POST",
            success:function(result){
                if(result.success){
                    //alert("任务创建成功:"+result.data.tradeNo);
                    $("#tradeNo").val(result.data.tradeNo);
                }else {
                    //alert("任务创建失败:"+result.errorMsg);
                }

            }
        });
        sleep(500);
    }

}
/**
 *  睡眠函数
 *  @param numberMillis -- 要睡眠的毫秒数
 */
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

function getImgCode() {
    var url='/my-test/carrier/status',
        data={
            tradeNo:$("#tradeNo").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            $("#resultData").val(JSON.stringify(result));

            if(result.data.finished || result.data.phase_status =='DONE_SUCC'){
                return;
            }
            if(result.data.phase=='CRAWLING_WAIT' || result.data.phase=='LOGIN_WAIT' || result.data.phase=='LOGIN'){
                $("#img_code").attr('src',"data:image/bmp;base64,"+result.data.input.value);
                return;
            }
            $("#taskId").val(result.data.task_id);
            //setTimeout("getImgCode()",5000);
        }
    });
}

function inputMsg() {
    var url='/my-test/carrier/input',
        data={
            tradeNo:$("#tradeNo").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
        }
    });
}

function notify(){
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=CARRIER" +
        "&msg=" + $("#msg").val());
}

function query(){
    var realName = encodeURI($("#realName").val());
    window.open("../../work/carrier.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val() +
    "&mobile=" + $("#loginId").val() + "" + "&idCard=" + $("#idCard").val() + "&realName=" + realName);
}


function getVCode() {
    var url='/my-test/carrier/verifycode',
        data={
            tradeNo:$("#tradeNo").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
        }
    });
}


function loadCarrier() {
    $("#carrier_select").find("option").remove();
    $("#carrier_select").empty();
    $("#carrier_select").prepend("<option value='0'>----- 请选择 -----</option>");
    for (var i=0;i<carrierData.length;i++){
        $("#carrier_select").append("<option value='"+carrierData[i][0]+"'>"+carrierData[i][0]+"</option>");
    }
}
function newloadCarrier() {
    $("#carrier_select").find("option").remove();
    $("#carrier_select").empty();
    $("#carrier_select").prepend("<option value='0'>----- 请选择 -----</option>");

    var url='/my-test/carrier/getMessage',
    data={

    };
        $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){

            NewcarrierData=result;
           // alert(NewcarrierData);
            for (var i=0;i<result.length;i++){
                var words = result[i].split('|');
                $("#carrier_select").append("<option value='"+words[0]+"'>"+words[0]+"</option>");
            }

        }
    });



}
/*
function carrierChange(){
    alert(NewcarrierData);
    for (var i=0;i<carrierData.length;i++){
        if($("#carrier_select").val() == carrierData[i][0]){
            $("#loginId").val(carrierData[i][1]);
            $("#loginPwd").val(carrierData[i][2])
            $("#realName").val(carrierData[i][3])
            $("#idCard").val(carrierData[i][4])
            break;
        }
    }
}*///修改从数据库取值
function carrierChange(){

    for (var i=0;i<NewcarrierData.length;i++){
        var words = NewcarrierData[i].split('|');
        if($("#carrier_select").val() == words[0]){
            $("#loginId").val(words[1]);
            $("#loginPwd").val(words[2])
            $("#realName").val(words[3])
            $("#idCard").val(words[4])
            break;
        }
    }
}

function getChannelData(){
    var url='/my-test/carrier/channels',
        data={
            loginId:$("#loginId").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            if(result.success){
                $("#channelData").val(JSON.stringify(result));
            }else {
                alert("查询失败:"+result.errorMsg);
            }

        }
    });
}

function passReset(){
    $("#reset_img_code").val("");
    $("#reset_i_img_code").val("");
    $("#resetVerifyCode").val("");
    $("#resetPassword").val("");
    $("#reset_img_code").hide();
    $("#reset_i_img_code").hide();
    $("#resetVerifyCode").hide();
    $("#resetPassword").hide();

    var url='/my-test/carrier/reset/create',
        data={
            loginId:$("#loginIdReset").val(),
            realName:$("#realNameReset").val(),
            idCard:$("#idCardReset").val(),
            testType:$("#GateWay_Test_Private_5").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            if(result.success){
                $("#resultDataReset").val(JSON.stringify(result));
                var taskId = JSON.stringify(result.data);
                taskId = taskId.replace('"',"");
                taskId = taskId.replace('"',"");
                $("#taskIdReset").val(taskId);
            }else {
                alert("创建密码重置任务失败:"+result.errorMsg);
            }

        }
    });
}

function getStatusReset(){
    var url='/my-test/carrier/reset/status',
        data={
            taskId:$("#taskIdReset").val(),
            testType:$("#GateWay_Test_Private_5").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            if(result.success){
                $("#resultDataReset").val(JSON.stringify(result));
                var arrInputs = result.data.inputs;
                for(var i=0;i<arrInputs.length;i++){
                    var input = arrInputs[i];
                    var type = input.type;
                    var value = input.value;
                    if(type == 'img'){
                        $("#reset_img_code").show();
                        $("#reset_i_img_code").show();
                        $("#reset_img_code").attr('src',"data:image/bmp;base64,"+value);
                    } else if(type == 'sms'){
                        $("#resetVerifyCode").show();
                    } else if (type == 'pwd'){
                        $("#resetPassword").show();
                    }

                }

            }else {
                alert("查询密码重置任务失败:"+result.errorMsg);
            }

        }
    });
}

function inputReset(){
    var resetInputs = '';;
    var resetVerifyCodeValue = $("#resetVerifyCode").val();
    var resetPasswordValue = $("#resetPassword").val();
    var reset_i_img_codeValue = $("#reset_i_img_code").val();

    if (resetVerifyCodeValue != '') {
        resetInputs = "sms:"+ resetVerifyCodeValue;
    }

    if (resetPasswordValue != '') {
        if(resetInputs.length > 3){
            resetInputs = resetInputs + ",pwd:"+ resetPasswordValue;
        } else {
            resetInputs = "pwd:"+ resetPasswordValue;
        }

    }

    if (reset_i_img_codeValue != '') {
        if(resetInputs.length > 3){
            resetInputs = resetInputs + ",img:"+ reset_i_img_codeValue;
        } else {
            resetInputs = "img:"+ reset_i_img_codeValue;
        }
    }

    
    var url='/my-test/carrier/reset/input',
        data={
            taskId:$("#taskIdReset").val(),
            resetInputs:resetInputs,
            testType:$("#GateWay_Test_Private_5").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            if(result.success){
                $("#resultDataReset").val(JSON.stringify(result));
            }else {
                alert("提交密码重置验证码失败:"+result.errorMsg);
            }

        }
    });

}


function setinput(this_){
    var select = $("#carrier_select");
    $("#carrier_select").empty();
    var count = $("#carrier_select option").length;
    var text = $("#carrierName").val();
    var  num=0;
    var  key=0;
    $("#loginId").val("");
    $("#loginPwd").val("");
    $("#realName").val("");
    $("#idCard").val("");

    for (var i=0;i<NewcarrierData.length;i++){
        //若找到以txt的内容开头的，添option
        var words = NewcarrierData[i].split('|');
        if(words[0].indexOf(text)!=-1){
            $("#carrier_select").append("<option value='"+words[0]+"'>"+words[0]+"</option>");
            num=num+1;
            key=i;
        }

    }

    if(num==1)
    {
         words = NewcarrierData[key].split('|');
        $("#carrier_select ").get(0).options[0].selected = true;
        $("#loginId").val(words[1]);
        $("#loginPwd").val(words[2])
        $("#realName").val(words[3])
        $("#idCard").val(words[4])
    }
    else
    {

        $("#carrier_select").prepend("<option style=\"displty:none\" selected>请选择</option>");
    }

}


function setfocus(this_){
    $("#carrier_select").find("option").remove();
    $("#carrier_select").empty();
    $("#carrier_select").prepend("<option value='0'>----- 请选择 -----</option>");
    for (var i=0;i<NewcarrierData.length;i++){
        var words = NewcarrierData[i].split('|');
        $("#carrier_select").append("<option value='"+words[0]+"'>"+words[0]+"</option>");
    }



}

function encrypt(){
    alert($("#original").val());
    var url='/my-test/carrier/aes/encrypt',
        data={
            keyword:$("#original").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            alert(JSON.stringify(result));
            $("#encrypt").val = JSON.stringify(result);
        }
    });
}

function decrypt() {
    var url = '/my-test/carrier/aes/decrypt',
        data = {
            keyword: $("#encrypt").val(),
        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (result) {
            alert(JSON.stringify(result));
            $("#decrypt").val = JSON.stringify(result);
        }
    });
}

function getMsg() {

    var url='/my-test/testuntil/getsms',
        data={
            tradeNo:$("#tradeNo").val(),
            mobile:$("#loginId").val(),
            testType:$("#project_select").val(),
        };
    if($("#loginId").val().replace(/\s/g, "").length==0) {
        alert("手机号不能为空");
        return;
    }


    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",

        success: function (result) {
            var words = result.split('@');

            if (words[0] == "null") {
                alert($("#loginId").val()+ "未在数据库中匹配到短信");
                return;
            }
            else {

                var fisrt = words[0].split('|');
                if (fisrt.length > 1) {
                    $("#firsttime").val(fisrt[0]);
                    $("#firstcontent").val(fisrt[1]);
                }

            }
            if (words[1] != "null") {
                var second = words[1].split('|');

                if (second.length > 1) {
                    $("#secondtime").val(second[0]);
                    $("#secondcontent").val(second[1]);
                }


            }
            var code = words[2];

            if(code.length==0)
            {
                $("#i_img_code").val("");
                // alert("未匹配到合适的验证码");
            }
            else {
                $("#i_img_code").val(code);
            }

        }

    });
}
