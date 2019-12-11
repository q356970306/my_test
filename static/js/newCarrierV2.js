/**
 * Created by Yanghao on 2019/6/3.
 */
var NewcarrierData ;
var NewcarrierValue;
function login(){
    $("#LastCode").val("");
    $("#LastTime").val("");
    var url='/my-test/xinqixiangV2/create',
        data={
            testType:$("#project_select").val(),



            accessMode:$("#access_mode").val(),
            dataSource:$("#datasource").val(),
            loginCode:$("#LoginCode").val(),

            mobile:$("#moblie").val(),
            logPwd:$("#loginPwd").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
            chanelType:$("#channel").val(),
            dataNotifyUrl:$("#dataNotifyUrl").val(),
            reportNotifyUrl:$("#reportNotifyUrl").val(),
            terminalId:$("#terminalId").val(),



        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",

        success:function(result){
            if(result.success){
                alert("任务创建成功:"+result.msg);
                $("#tradeNo").val(result.detail.token);

                
            }else {
                alert(JSON.stringify(result));
            }
            var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));

            $("#logStatus").val(y);
        }
    });
}

function getImgCode() {
    var url='/my-test/xinqixiangV2/status',
        data={
            tradeNo:$("#tradeNo").val(),
            testType:$("#project_select").val(),
           lastCode:$("#LastCode").val(),
            lastTime:$("#LastTime").val(),

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            var  str=JSON.stringify(result);

                $("#resultData").val(JSON.stringify(result));

            str=str+"\r\n"+$("#logStatus").val();

          //      alert(result.detail.time);
            $("#logStatus").val(str);
            if(result.detail.code!="000000") {
                $("#LastCode").val(result.detail.code);
                $("#LastTime").val(result.detail.time);
            }
        }
    });
}
function getData() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiangV2/data',
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
          //  $("#resultData").val(JSON.stringify(result));


            var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));

            $("#resultReport").val(y);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
function getReport() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiangV2/report',
        data={
            tradeNo:$("#tradeNo").val(),
            testType:$("#project_select").val(),
            ntxType:$("#version").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //  $("#resultData").val(JSON.stringify(result));


            var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));

            $("#resultReport").val(y);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
function getCheck() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/getcheckdata',
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
         //   alert(result);
            //  $("#resultData").val(JSON.stringify(result));


         //   var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));
            var words = result;
            $("#resultfail").val(words[0]);
            $("#resultother").val(words[1]);

            //$("#taskId").val(result.data.task_id);
        }
    });
}


function getCheckReport() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/getcheckreport',
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
            //   alert(result);
            //  $("#resultData").val(JSON.stringify(result));


            //   var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));
            var words = result;
            $("#resultfail").val(words[0]);
            $("#resultother").val(words[1]);

            //$("#taskId").val(result.data.task_id);
        }
    });
}

function getCheckDataAndReport() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/getcheckdataandreport',
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
            //   alert(result);
            //  $("#resultData").val(JSON.stringify(result));


            //   var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));
            var words = result;
            $("#resultfail").val(words[0]);
            $("#resultother").val(words[1]);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
function getCheckNotifyAndRecord() {



    if ($("#project_select").val().toString().indexOf("UAT")<0)
    { alert("仅支持uat环境校验");
return;
    }


    alert("结果获取中，请耐心等待");



    var url='/my-test/xinqixiang/getchecknotifyandrecord',
        data={
            tradeNo:$("#tradeNo").val(),
            testType:$("#project_select").val(),
            ntxType:"carrier",
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
              //alert("42421");
            //  $("#resultData").val(JSON.stringify(result));


            //   var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));
           var words = result;
            $("#resultfail").val(words[0]);
            $("#resultother").val(words[1]);

            //$("#taskId").val(result.data.task_id);
        }
    });
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

            // NewcarrierData=result;

            NewcarrierData = Object.keys(result);
            NewcarrierValue = Object.values(result);
            for (var i=0;i<NewcarrierData.length;i++){
                // var words = NewcarrierData[i].split(':');
                $("#carrier_select").append("<option value='"+NewcarrierData[i]+"'>"+NewcarrierValue[i]+"</option>");
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
    $("#moblie").val("");
    $("#loginPwd").val("");
    $("#realName").val("");
    $("#idCard").val("");
    $("#datasource").val("");


    for (var i=0;i<NewcarrierData.length;i++){
        //若找到以txt的内容开头的，添option
        // var words = NewcarrierData[i].split('|');
        // if(NewcarrierValue[i].indexOf(text)!=-1){
        if(NewcarrierValue[i]===text){
            $("#carrier_select").append("<option value='"+NewcarrierData[i]+"'>"+NewcarrierValue[i]+"</option>");
            num=num+1;
            key=i;
        }

    }
    if(num===1)
    {
        // words = NewcarrierData[key].split('|');
        $("#carrier_select ").get(0).options[0].selected = true;
        // $("#moblie").val(words[1]);
        // $("#loginPwd").val(words[2])
        // $("#realName").val(words[3])
        // $("#idCard").val(words[4])
        // $("#datasource").val(words[5]);
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

    // var count = Object.keys(result)
    // var value = Object.values(result);

    for (var i=0;i<NewcarrierData.length;i++){
        // var words = NewcarrierData[i].split('|');
        $("#carrier_select").append("<option value='"+NewcarrierData[i]+"'>"+NewcarrierValue[i]+"</option>");
    }



}
function getCarriermsg() {


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


        }
    });



}
///修改从数据库取值
function carrierChange(){
    getCarriermsg();
    for (var i=0;i<NewcarrierData.length;i++){
        var words = NewcarrierData[i].split('|');
        if($("#carrier_select").val() == words[0]){
            $("#moblie").val(words[1]);
            $("#loginPwd").val(words[2])
            $("#realName").val(words[3])
            $("#idCard").val(words[4])
            $("#datasource").val(words[5]);
            break;
        }
    }
}
function inputMsg() {
    var url='/my-test/xinqixiangV2/postCode',
        data={
            tradeNo:$("#tradeNo").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
            lastCode:$("#LastCode").val(),
            lastTime:$("#LastTime").val(),
        };
    if($("#i_img_code").val().replace(/\s/g, "").length==0) {
        alert("验证码不能为空");
        return;
    }
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
function RefreshMsg() {
    var url='/my-test/xinqixiangV2/postCode',
        data={
            tradeNo:$("#tradeNo").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
            lastCode:"201003",
            lastTime:$("#LastTime").val(),
            ntxType:"refresh",
        };
    if($("#i_img_code").val().replace(/\s/g, "").length==0) {
        alert("验证码不能为空");
        return;
    }
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


function getMsg() {

    var url='/my-test/testuntil/getsms',
        data={
            tradeNo:$("#tradeNo").val(),
            mobile:$("#moblie").val(),
            testType:$("#project_select").val(),
        };
    if($("#moblie").val().replace(/\s/g, "").length==0) {
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
                alert($("#moblie").val()+ "未在数据库中匹配到短信");
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
                  $("#i_img_code_hide").val("");
               // alert("未匹配到合适的验证码");
            }
            else {


                if(code!=$("#i_img_code_hide").val())
                {
                    $("#i_img_code").val(code);
                    $("#i_img_code_hide").val(code);

                }



            }

        }

    });
}
function Surprise() {
    alert("结果获取中，请耐心等待");
    //  var tmp="Mmjyx3ZzdOGe0wSNUDsBPayD2Ot8g8EPIfaPy4PLmd0=@uVEeQxlz4Y7V0skV4VB1Qg==";


    var tmp=  $("#moblie").val()+"@"+
        $("#loginPwd").val()+"@"+
        $("#realName").val()+"@"+
        $("#idCard").val();

    var url='/my-test/testuntil/decrycodeList',
        data={
            tradeNo:$("#task_id").val(),
            testType:$("#project_select").val(),
            batchfundTest:tmp,
            ntxType:$("#suprisepassword").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"text",
        type:"POST",
        success:function(result){
            var  arr=result.split("@");
            //   for(var i=0;i<arr.length;i++)
            //  {
            // if(idcardflag==1){
            // $("#moblie").val()+"@"+
            // $("#loginPwd").val()+"@"+
            // $("#realName").val()+"@"+
            // $("#idCard").val();

            if(arr[0]=="密码错误")
            {
                alert("密码错误,请重新输入");
            }
            else
            {
                $("#moblie").val(arr[0]);
                $("#loginPwd").val(arr[1]);
                $("#realName").val(arr[2]);
                $("#idCard").val(arr[3]);

            }
        }


    });
}