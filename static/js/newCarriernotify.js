/**
 * Created by Lituo on 2017/4/27.
 */
var NewcarrierData ;
function login(){

    var url='/my-test/xinqixiang/notifycreate',
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




        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",

        success:function(result){
            if(result.success){
                alert("任务创建成功:"+result.detail);
                $("#tradeNo").val(result.detail);
            }else {
                alert(JSON.stringify(result));
            }
        }
    });
}

function getImgCode() {
    var url='/my-test/xinqixiang/status',
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




            //$("#taskId").val(result.data.task_id);
        }
    });
}
function getData() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/callback',
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
           $("#resultReport").val(JSON.stringify(result));


          //  var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));

         //   $("#resultReport").val(y);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
function getReport() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/report',
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
        $("#moblie").val(words[1]);
        $("#loginPwd").val(words[2])
        $("#realName").val(words[3])
        $("#idCard").val(words[4])
        $("#datasource").val(words[5]);
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
///修改从数据库取值
function carrierChange(){

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
    var url='/my-test/xinqixiang/postCode',
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