/**
 * Created by yanghao on 2018/11/26.
 */
var NewxinqixiangData
function login(){
    var url='/my-test/xinqixiang/create',
        data={
            testType:$("#project_select").val(),
            accessMode:$("#access_mode").val(),
            dataSource:$("#datasource").val(),
            loginCode:$("#LoginCode").val(),
            mobile:$("#mobile").val(),
            loginId:$("#Account").val(),
            logPwd:$("#loginPwd").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
            dataNotifyUrl:$("#dataNotifyUrl").val(),
            reportNotifyUrl:$("#reportNotifyUrl").val(),
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
function batchcreate(){
    var url='/my-test/xinqixiang/batchcreate',
        data={
            testType:$("#project_select").val(),
            accessMode:$("#access_mode").val(),
            dataSource:$("#datasource").val(),
            loginCode:$("#LoginCode").val(),
            mobile:$("#mobile").val(),
            loginId:$("#Account").val(),
            logPwd:$("#loginPwd").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"text",
        type:"POST",

        success:function(result){
           // alert("任务创建成功:");
                alert("任务创建成功:");
            var reg = new RegExp( ',' , "g" )
            var newstr = result.replace( reg , '\n' );

             $("#realbatchtokenData").val(result);
               $("#batchtokenData").val(newstr);

        }
    });
}
function getbatchData(){
    alert("任务查询成功,请耐心等待");
    var url='/my-test/xinqixiang/batchquerystatus',
        data={
            testType:$("#project_select").val(),
            batchfundTest: $("#batchtokenData").val()

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"text",
        type:"POST",

        success:function(result){
            // alert("任务创建成功:");
            alert("任务查询成功:");
            var reg = new RegExp( '@' , "g" )
            var newstr = result.replace( reg , '\n' );


            $("#batchresultData").val(newstr);

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

            $("#status").val(result.code.toString());
            if ((result.code.toString()=="20003")||(result.code.toString()=="20005"))
            {   $("#img_code").attr("");
                $("#img_code").attr('src',result.msg);
            }
            if (result.code.toString()=="20007")
            {
                $("#img_code").attr('src',result.msg);
            }
            else
           {
               $("#img_code").attr("");
           }

            $("#resultData").val(JSON.stringify(result));
            var  str=JSON.stringify(result);

            $("#resultData").val(JSON.stringify(result));

            str=str+"\r\n"+$("#logStatus").val();

            //      alert(result.detail.time);
            $("#logStatus").val(str);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
function getData() {
    var url='/my-test/xinqixiang/data',
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
//
            //    $("#img_code").attr('src',);



           // $("#resultData").val(result.detail.data);
            var y = JSON.stringify(result, null, 4);

            //$("#allData").val(JSON.stringify(result));

            $("#resultData").val(y);

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

            $("#resultData").val(y);

            //$("#taskId").val(result.data.task_id);
        }
    });
}


function getCheck() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiang/getautoinsuraceCheck',
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
            $("#batchtokenData").val(words[0]);
            $("#batchresultData").val(words[1]);

            //$("#taskId").val(result.data.task_id);
        }
    });
}
///修改从数据库取值
function gateWayChange(){


    var   apiuser="3";
    var   apienc="36b8ef55f9a74e9284166a0bda87d604";



    var   apiusersc="15900578770";
    var   apiencsc="6aa065f93d4cf0cd362ba29d515203b6";

    $("#apiuser").val(apiusersc);
    $("#apienc").val(apiencsc);
    if($("#project_select").val() == "buildnewgateWay"){

        $("#apiuser").val(apiuser);
        $("#apienc").val(apienc);
    }
    if($("#project_select").val() == "buildnewgateWayUAT"){

        $("#apiuser").val(apiuser);
        $("#apienc").val(apienc);
    }

}

///修改从数据库取值
function dataChange(){
    $("#labelmobile").hide();
    $("#mobile").hide();
    $("#mobile").val("");

    $("#labelloginPwd").hide();
    $("#labelloginPwd").val("");

    $("#loginPwd").hide();
    $("#loginPwd").val("");

    $("#labelrealName").hide();
    $("#labelrealName").val("");

    $("#realName").hide();
    $("#realName").val("");

    $("#labelidCard").hide();
    $("#labelidCard").val("");

    $("#idCard").hide();
    $("#idCard").val("");

    $("#labelAccount").hide();
    $("#labelAccount").val("");

    $("#Account").hide();
    $("#Account").val("");
    for (var i = 0; i < NewxinqixiangData.length; i++) {

        var words = NewxinqixiangData[i].split('|');
        var valuestring = words[0] + "-" + words[2];
        if (valuestring.toString() == $("#datasource_select").val()) {

         //   无忧借条,1203,phone,pwd,,15944665807,a1594466
        var params = words[3];
        var param = params.split(',');
    //    var realName=words[];
            var loginId=words[4];
            var loginPwd=words[6];
       //     var idCard=words[];
            var mobile=words[5];
            var realname=words[7];
           var idCard=words[8];

            $("#datasource").val(words[1])
            $("#LoginCode").val(words[2])



            for (var i = 0; i < param.length; i++) {

                if(param[i].toString()=="phone")
                {

                    $("#labelmobile").show();
                      $("#mobile").show();
                    $("#mobile").val(mobile)
                }
                if(param[i].toString()=="pwd")
                {

                    $("#labelloginPwd").show();
                    $("#loginPwd").show();
                    $("#loginPwd").val(loginPwd)

                }

                if(param[i].toString()=="idcard")
                {

                    $("#labelidCard").show();
                    $("#idCard").show();
                    $("#idCard").val(idCard)

                }
                if(param[i].toString()=="name")
                {

                    $("#labelrealName").show();
                    $("#realName").show();
                    $("#realName").val(realname)

                }
                if(param[i].toString()=="account")
                {

                    $("#labelAccount").show();
                    $("#Account").show();
                    $("#Account").val(loginId)

                }

            }



        break;
    }
     //   var  valuestring=words[0]+"-"+words[1];
      //  $("#datasource_select").append("<option value='" + valuestring + "'>" + valuestring + "</option>");


        //
    }



}



function newloadApi() {
    $("#datasource_select").find("option").remove();
    $("#datasource_select").empty();
    $("#datasource_select").prepend("<option value='0'>----- 请选择 -----</option>");

    var url = '/my-test/xinqixiang/getAutoInsuranceParms',
        data = {};
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (result) {

            NewxinqixiangData = result;
            // alert(NewcarrierData);
            for (var i = 0; i < result.length; i++) {
                var words = result[i].split('|');
                var  valuestring=words[0]+"-"+words[2];
                $("#datasource_select").append("<option value='" + valuestring + "'>" + valuestring + "</option>");
            }

        }
    });
}

function inputMsg() {
    var url='/my-test/xinqixiang/postCode',
        data={
            tradeNo:$("#tradeNo").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
            dataSource:$("#datasource").val(),
               ntxType:$("#status").val(),


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

function getMsg() {

    var url='/my-test/testuntil/getsms',
        data={
            tradeNo:$("#tradeNo").val(),
            mobile:$("#mobile").val(),
            testType:$("#project_select").val(),
        };

    if($("#mobile").val().replace(/\s/g, "").length==0) {
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
                alert($("#mobile").val()+ "未在数据库中匹配到短信");
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
function checkColumns() {
    alert("结果获取中，请耐心等待");

    var url = '/my-test/xinqixiang/checkjsondata',

        data = {
            tradeNo: $("#tradeNo").val(),
            testType: $("#project_select").val(),


            dataSource:$("#datasource").val(),


        };

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        success: function (result) {

            var y = JSON.stringify(result, null, 4);



            $("#resultData").val(y);



        }
    });
}

function Surprise() {
    alert("结果获取中，请耐心等待");
    //  var tmp="Mmjyx3ZzdOGe0wSNUDsBPayD2Ot8g8EPIfaPy4PLmd0=@uVEeQxlz4Y7V0skV4VB1Qg==";


    var tmp=  $("#Account").val()+"@"+
        $("#realName").val()+"@"+
        $("#loginId").val()+"@"+
        $("#idCard").val()+"@"+
        $("#mobile").val()+"@"+
        $("#loginPwd").val();

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
                $("#Account").val(arr[0]);
                $("#realName").val(arr[1]);
                $("#loginId").val(arr[2]);
                $("#idCard").val(arr[3]);
                $("#mobile").val(arr[4]);
                $("#loginPwd").val(arr[5]);
            }
        }



    });
}


