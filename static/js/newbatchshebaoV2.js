/**
 * js一次发送，后台for循环，返回字符串
 * */
function login(type) {
    var start = new Date().getTime();


    if(type=="bysub"){
        if(($("#subcode").val()=="")||$("#subcode").val()==null){


        alert("按省份批量创建时，省份不能为空");
        return;
        }
    }
    alert("批量创建中，请耐心等待");
    var url = '/my-test/shebaoV2/create',

        data = {
            batchfundTest: $("#batchFund").val(),
            //渠道和接入方式固定写死
            testType:$("#project_select").val(),

            runType:type,
            ntxType:$("#subcode").val(),
            dataNotifyUrl:$("#dataNotifyUrl").val(),
            reportNotifyUrl:$("#reportNotifyUrl").val(),

            loginType:$("#loginCode").val()

        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",

        success: function (result) {

            if (type == 'singal') {

                if (!(result.toString().indexOf("创建失败") != -1)) {
                    alert("批量社保任务创建成功，请稍后查询");
                    var reg = new RegExp(',', "g")
                    var tokenstr = result.toString().split("+");
                    var newstr = result.replace(reg, '\n');
                    $("#tradeNo").val(newstr);
                    $("#token").val(tokenstr[1]);

                } else {

                    var failstr = result.toString().split("+");
                    alert(failstr[0]);
                }

            }
            else {

                console.log("下单结果为" + result);
                if (result != null && result != "") {

                    if (!(result.toString().indexOf("创建失败") != -1)) {
                        alert("批量社保任务创建成功，请稍后查询");
                        var reg = new RegExp(',', "g")
                        var newstr = result.replace(reg, '\n');

                        $("#tradeNo").val(newstr);

                    } else {

                        var failstr = result.toString().split("+");
                        alert(failstr[0]);
                    }

                } else {
                    alert("批量社保任务创建异常");
                }
                console.log("耗时" + (new Date().getTime() - start) + "毫秒")
            }
        }

    });
}
function loginsingle(type) {
    var start = new Date().getTime();
    //alert($("#loginCode").val());
        if(($("#loginCode").val()=="")||$("#loginCode").val()==null||$("#loginCode").val()==0){


            alert("请选择登陆方式");
            return;
        }




    var url = '/my-test/shebaoV2/singlecreate',

        data = {
            batchfundTest: $("#batchFund").val(),
            //渠道和接入方式固定写死
            testType:$("#project_select").val(),

            runType:$("#loginCode").val(),
            ntxType:$("#subcode").val(),
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
                {  alert("批量社保任务创建成功，请稍后查询");
                    var reg = new RegExp( ',' , "g" )
                    var tokenstr = result.toString().split("+");
                    var newstr = result.replace( reg , '\n' );
                    $("#tradeNo").val(newstr);
                    $("#token").val(tokenstr[1]);

                }else {

                    var failstr = result.toString().split("+");
                    alert(failstr[0]);
                }

            } else {
                alert("批量社保任务创建异常");
            }
            console.log("耗时" + (new Date().getTime() - start) + "毫秒")
        }

    });
}


/**
 * 全部任务查询
 * */
function getAllStatus() {

    var url = '/my-test/shebaoV2/getstatus',
        data = {
        //将全部订单号，返回给 tradeNo1
            batchfundTest: $("#tradeNo").val(),
            testType:$("#project_select").val(),

        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        type: "POST",
        success: function (result) {

            if(result.toString().indexOf("|")!= -1)
            {
                //保存状态查询结果
                var strArr = result.split("|");
                var statusJson = strArr[1];
                if(statusJson!=null&&statusJson.toString()!="") {
                    var statusObj = eval('(' + statusJson + ')');
                    if (statusObj.code.toString() == "20007") {
                        $("#img_code").attr('src', "data:image/bmp;base64," + statusObj.msg);
                    }
                }
                $("#resultData").val(result);
            }
            else
            {
                $("#resultData").val(result);
            }

        }
    });
}


///修改从数据库取值
function carrierChange(){

/*
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
    }*/

}


function setinput(this_){
 //   var select = $("#fund_select");
   // $("#fund_select").empty();
//    var count = $("#fund_select option").length;
    var text = $("#fundName").val();
    var  num=0;
    var  key=0;
    $("#fund_select").find("option").remove();
    $("#fund_select").empty();
    $("#fundlogin_select").find("option").remove();
    $("#fundlogin_select").empty();
    //alert(text);
    $("#fundlogin_select").prepend("<option value='0'>----- 请选择 -----</option>");
    $("#loginCode").val("");
    for (var i=0;i<NewfundNameData.length;i++){
        //若找到以txt的内容开头的，添option
      //  var words = NewfundNameData[i].split('|');
       // alert(text);
     //   alert(NewfundNameData[i]);
        if(NewfundNameData[i].indexOf(text)!=-1){
            $("#fund_select").append("<option value='"+NewfundNameData[i]+"'>"+NewfundNameData[i]+"</option>");
            num=num+1;
            key=i;
        }

    }


    if(num==1)
    {
       // words = NewfundNameData[key].split(;
 //    $("#fund_select").get(1).options[1].selected = true;
       // $("#fundNameDes").val(options.val());
           shebaoChange();
    //   alert(num);

    }
   else
    {

        $("#fund_select").prepend("<option style=\"displty:none\" selected>请选择</option>");
    }

}


function setfocus(this_){
 //   $("#fund_select").find("option").remove();
 //   $("#fund_select").empty();
 //   $("#fund_select").prepend("<option value='0'>----- 请选择 -----</option>");
  //  $("#fundlogin_select").find("option").remove();
  //  $("#fundlogin_select").empty();
//    $("#fundlogin_select").prepend("<option value='0'>----- 请选择 -----</option>");
   for (var i=0;i<NewfundNameData.length;i++){
      //var words = NewcarrierData[i].split('|');
        $("#fund_select").append("<option value='"+NewfundNameData[i]+"'>"+NewfundNameData[i]+"</option>");
    }


}

///修改从数据库取值
function fundChange(){
    var select = $("#fund_select");//获取选中的项
    var options=$("#fund_select option:selected");
    var index=select.selectedIndex ; // selectedIndex代表的是你所选中项的index

var num=0;
    $("#loginCode").val("");
   // $("#fundName").val("");
    //3//拿到选中项options的value： myselect.options[index].value;

    //alert(options.val()) ;
    $("#fundNameDes").val(options.val());

    $("#fundlogin_select").find("option").remove();
    $("#fundlogin_select").empty();





  //  $("#fundNameDes").val( $("#fundlogin_select").val());
    var url='/my-test/fund/getLoginCodeMessage',
        data={
            ntxType:$("#fundNameDes").val()
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result) {

            NewfundLogincodeData = result;
           // alert(NewfundLogincodeData);
            if (result.length >1)
            {
                $("#fundlogin_select").prepend("<option value='0'>----- 请选择 -----</option>");

            }


            for (var i = 0; i < result.length; i++) {
                var words = result[i].split('|');
              //  alert($("#fundlogin_select").val());
                $("#fundlogin_select").append("<option value='" + words[2] + "'>" + words[1] + "-" + words[2] + "</option>");

            }
            if (result.length == 1)
            {
                $("#fundlogin_select ").get(0).options[0].selected = true;
                  fundloginChange();
            }

        },
        complete:function(result) {
            $("#test option").each(function () {
                alert($("#fundlogin_select").val());
                var val = $(this).val();

                if ($("#fundlogin_select option[value='" + val + "']").length > 1)

                    $("#fundlogin_select option[value='" + val + "']:gt(0)").remove();

            });
        }
    });
}

///修改从数据库取值
function fundloginChange(){
    var select = $("#fundlogin_select");//获取选中的项
    var options=$("#fundlogin_select option:selected");
    var index=select.selectedIndex ; // selectedIndex代表的是你所选中项的index

    3//拿到选中项options的value： myselect.options[index].value;

    //alert(options.val()) ;
    $("#loginCode").val(options.val());
}


function newloadShebao() {
    $("#fund_select").find("option").remove();
    $("#fund_select").empty();
    $("#fund_select").prepend("<option value='0'>----- 请选择 -----</option>");
    $("#fundNameDes").val("");
    $("#loginCode").val("");

    var url='/my-test/shebao/getMessage',
        data={

        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){

            NewfundNameData=result;
            //alert(NewcarrierData);
            for (var i=0;i<result.length;i++){
            //    var words = result[i].split('|');
                $("#fund_select").append("<option value='"+result[i]+"'>"+result[i]+"</option>");
            }

        }
    });



}


///修改从数据库取值
function fundloginChange(){
    var select = $("#fundlogin_select");//获取选中的项
    var options=$("#fundlogin_select option:selected");
    var index=select.selectedIndex ; // selectedIndex代表的是你所选中项的index

    3//拿到选中项options的value： myselect.options[index].value;

    //alert(options.val()) ;
    $("#loginCode").val(options.val());
}



///修改从数据库取值
function shebaoChange(){
    var select = $("#fund_select");//获取选中的项
    var options=$("#fund_select option:selected");
    var index=select.selectedIndex ; // selectedIndex代表的是你所选中项的index

    var num=0;
    $("#loginCode").val("");
    // $("#fundName").val("");
    //3//拿到选中项options的value： myselect.options[index].value;

    //alert(options.val()) ;
    $("#fundNameDes").val(options.val());

    $("#fundlogin_select").find("option").remove();
    $("#fundlogin_select").empty();





    //  $("#fundNameDes").val( $("#fundlogin_select").val());
    var url='/my-test/shebao/getLoginCodeMessage',
        data={
            ntxType:$("#fundNameDes").val()
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result) {

            NewfundLogincodeData = result;
            // alert(NewfundLogincodeData);
            if (result.length >1)
            {
                $("#fundlogin_select").prepend("<option value='0'>----- 请选择 -----</option>");

            }


            for (var i = 0; i < result.length; i++) {
                var words = result[i].split('|');
                //  alert($("#fundlogin_select").val());
                $("#fundlogin_select").append("<option value='" + words[2] + "'>" + words[1] + "-" + words[2] + "</option>");

            }
            if (result.length == 1)
            {
                $("#fundlogin_select ").get(0).options[0].selected = true;
                shebaologinChange();
            }

        },
        complete:function(result) {
            $("#test option").each(function () {
                alert($("#fundlogin_select").val());
                var val = $(this).val();

                if ($("#fundlogin_select option[value='" + val + "']").length > 1)

                    $("#fundlogin_select option[value='" + val + "']:gt(0)").remove();

            });
        }
    });
}

///修改从数据库取值
function shebaologinChange(){
    var select = $("#fundlogin_select");//获取选中的项
    var options=$("#fundlogin_select option:selected");
    var index=select.selectedIndex ; // selectedIndex代表的是你所选中项的index

    3//拿到选中项options的value： myselect.options[index].value;

    //alert(options.val()) ;
    $("#loginCode").val(options.val());
}

function inputMsg() {
    var url='/my-test/xinqixiang/postCode',
        data={
            tradeNo:$("#token").val(),
            verifyCode:$("#i_img_code").val(),
            testType:$("#project_select").val(),
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