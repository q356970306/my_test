/**
 * Created by Yanghao on 2019/2/28.
 */
var loginData ;
var loginCityData ;
var  idcardflag=0;
var  pwdflag=0;
var  accountflag=0;
var  corpaccountflag=0;
var  realnameflag=0;
var  phoneflag=0;
function
login(){
    $("#LastCode").val("");
    $("#LastTime").val("");


    var url='/my-test/xinqixiangV2/create',

        data={

            testType:$("#project_select").val(),
            loginCode:$("#select_login").val(),
            dataSource:$("#select_fund_city").val(),
            // dataSource:"credit_ccb",
            loginId:$("#account").val(),
            realName:$("#realName").val(),
            idCard:$("#idCard").val(),
            mobile:$("#phone").val(),
            logPwd:$("#password").val(),
            area:$("#select_area").val(),
            orgNo:$("#corpaccount").val(),


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
                $("#logStatus").val("");
                $("#taskId").val(result.detail.token);
            }else {
                alert(JSON.stringify(result));
            }
        }
    });
}


function getImgCode() {
    var url='/my-test/xinqixiangV2/status',
        data={
            tradeNo:$("#taskId").val(),
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
        //    $("#resultData").val(JSON.stringify(result));
            /*  if(result.data.phase=='LOGIN' && result.data.phase_status=='WAIT_CODE'){
                  $("#img_code").attr('src',"data:image/bmp;base64,"+result.data.input.value);
                  return;
              }*/
            var  str=JSON.stringify(result);

            $("#resultData").val(JSON.stringify(result));

            str=str+"\r\n"+$("#logStatus").val();

              //   alert(result.detail.time);
            $("#logStatus").val(str);
            $("#resultData").val(JSON.stringify(result));

            if(result.detail.code!="000000") {
                $("#LastCode").val(result.detail.code);
                $("#LastTime").val(result.detail.time);
            }
            // $("#taskId").val(result.data.task_id);
        }
    });
}

function inputMsg() {
    var url='/my-test/xinqixiangV2/postCode',
        data={
            tradeNo:$("#taskId").val(),
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
function changeHost() {


    queryFundList();

}
function queryFundList(){
    var url='/my-test/xinqixiangV2/fundlogin',
        data={
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //alert(result);
            loginCityData=result;
            loadFund(result);
        }
    });
}

function loadFund(result) {

    var  str=result.detail;


   // alert(result.detail);





    $("#select_fund_city").find("option").remove();
    $("#select_fund_city").empty();
    $("#select_fund_city").prepend("<option value='0'>请选择公积金地区</option>");
    //alert(statusObj.cardType);
    //alert(statusObj.length);
    for (var i=0;i<str.length;i++){

        // $("#select_banktype").append("<option value='"+str[i].card_type+"'>"+str[i].card_type+"</option>");
        //card_type : "CREDITCARD"card_typecard_type
        var statusObj = str[i].area_list;
     //   alert(statusObj.length);
         for (var j=0;j<statusObj.length;j++)
         {   //alert(statusObj[j].city_name);
        //
             $("#select_fund_city").append("<option value='"+statusObj[j].api_name+"'>"+statusObj[j].city_name+"</option>");
        //
         }

    }
}



function queryFundLogin(){
    if($("#select_bank").val()==''||$("#select_bank").val()==undefined||$("#select_bank").val()=='0'){
        alert("请先选择银行");
        return;
    }
    var url='/my-test/xinqixiang/login',
        data={
            areaCode:$("#select_bank").val(),
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //   alert(JSON.stringify(result));
            if(result.success){
                loadLogin(result.data);
                $("#resultData").val(JSON.stringify(result));
            }else {
                alert(result.errorMsg);
            }
        }
    });
}
function queryhelp(){


    var  datasource;

    if($("#select_banktype").val()=="CREDITCARD")
        datasource=  $("#select_bank_CREDITCARD").val();
    if($("#select_banktype").val()=="DEBITCARD")
        datasource=  $("#select_bank_DEBITCARD").val();

    var url='/my-test/xinqixiang/banklogin/filds',
        data={

            dataSource:datasource,
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //  alert(JSON.stringify(result));
            loginData=result;
            if(result.success){
                loadLogin(result.detail);
            }else {
                alert(JSON.stringify(result));
            }
        }
    });
}


function loadLogin(data) {
    $("#select_login").find("option").remove();
    $("#select_login").empty();
    $("#select_login").prepend("<option value='0'>请选择登录方式</option>");

    var   types=  data;
    //alert(types.length);
    loginParmaData=types;
    for (var i=0;i<types.length;i++){
        $("#select_login").append("<option value='"+types[i].code+"'>"+types[i].name +types[i].code+"</option>");
    }

}
function checkLoginType(detail) {



    $("#labelidCard").hide();
    $("#idCard").hide();


    $("#labelpassword").hide();
    $("#password").hide();



    $("#account").hide();
    $("#labelaccount").hide();

    $("#labelcorpaccount").hide();
    $("#corpaccount").hide();

    $("#labelrealname").hide();

    $("#realName").hide();

    $("#area").hide();

    $("#select_area").hide();




    var login_type = $("#select_login").val();
    //  alert(login_type);
    var tmploginDate=loginData.detail;
    //  var   types=  tmploginDate;

    //   loginParmaData=loginData.detail;
      idcardflag=0;
      pwdflag=0;
      accountflag=0;
      realnameflag=0;
      phoneflag=0;

    for (var i=0;i<tmploginDate.length;i++) {

        var   fides=  tmploginDate[i].fields
        if(tmploginDate[i].code==login_type) {
            for (var j = 0; j < fides.length; j++) {
               //alert(fides[j].name);

                if(fides[j].name=='idCard'||fides[j].name=='idCardNum'){
                    $("#labelidCard").show();
                    $("#idCard").show();
                    idcardflag=1;
                }
                if(fides[j].name=='pwd'){
                    $("#labelpassword").show();
                    $("#password").show();
                    pwdflag=1;
                }
                if(fides[j].name=='account'){
                    $("#labelaccount").show();
                    $("#account").show();
                    accountflag=1;
                }
                if(fides[j].name=='corpAccount'){
                    $("#labelcorpaccount").show();
                    $("#corpaccount").show();
                    corpaccountflag=1;
                }
                if(fides[j].name=='realName'||fides[j].name=='name'){
                    $("#labelrealname").show();
                    $("#realName").show();
                    realnameflag=1;
                }
                if(fides[j].name=='phone'){
                    $("#labelphone").show();
                    $("#phone").show();
                    phoneflag = 1;

                }

                if(fides[j].name=='area'){
                    loadSubArea(fides[j].defaultValue,fides[j].label);
                    $("#select_area").show();
                    $("#area").show();




                }
            }

        }
    }
    var url='/my-test/onlinemonitor/getLoginAccount',
        data={

            loginCode:$("#select_login").val(),
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){


            if((result[0]!=null)&&(accountflag!=0))
            {
                $("#account").val(result[0]);
            }
            else{
                $("#account").val(null);
            }

            if((result[1]!=null)&&(realnameflag!=0))
            {
                $("#realName").val(result[1]);
            }
            else{
                $("#realName").val(null);
            }
            if((result[2]!=null)&&(idcardflag!=0))
            {
                $("#idCard").val(result[2]);
            }
            else{
                $("#idCard").val(null);
            }
            if((result[3]!=null)&&(pwdflag!=0))
            {
                $("#password").val(result[3]);
            }
            else{
                $("#password").val(null);
            }

            if((result[4]!=null)&&(phoneflag!=0))
            {
                $("#phone").val(result[4]);
            }
            else{
                $("#phone").val(null);
            }
            if((result[6]!=null)&&(corpaccountflag!=0))
            {
                $("#corpaccount").val(result[6]);
            }
            else{
                $("#corpaccount").val(null);
            }



            $("#urlid").attr("href", "#");
            $("#urlid").attr("onclick", "getUrl();return false");
            if(result[5]!=null)
            { $("#urlid").attr("onclick", "getUrl();");
                $("#urlid").attr("href", result[5]);
            }
      //  alert(result[5]);


        }
    });


}
function loadSubArea(areaList) {
    $("#select_area").find("option").remove();
    $("#select_area").empty();
    $("#select_area").prepend("<option value='0'>请选择</option>");
   // alert(areaList[0].title);

    for (var k=0;k<areaList.length;k++){

        $("#select_area").append("<option value='"+areaList[k].value+"'>"+areaList[k].title+"</option>");
    }
}

function getlogintype() {

    if($("#select_fund_city").val()==null||$("#select_fund_city").val()=="")
    {
        alert("请先选择地区");
        return;
    }
    alert("获取中请耐心等候");
    var url='/my-test/xinqixiangV2/fundloginparam',
        data={

            dataSource:$("#select_fund_city").val(),
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
          //  alert(JSON.stringify(result));

            var resultjson = JSON.stringify(result, null, 4);


            if(result.success){
                $("#resultData").val(resultjson);
            }else {
                alert(JSON.stringify(result));
            }
        }
    });
}

function changeFundCode() {

    $("#select_login").find("option").remove();
    $("#select_login").empty();
    //alert($("#select_fund_city").val());
    var url='/my-test/xinqixiangV2/fundloginparam',
        data={

            dataSource:$("#select_fund_city").val(),
            testType:$("#project_select").val(),
        };

    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            //  alert(JSON.stringify(result));
            loginData=result;
            if(result.success){
                loadLogin(result.detail);
            }else {
                alert(JSON.stringify(result));
            }
        }
    });


}
getlogintype

function resetLogin() {
    $("#select_addr").hide();
    $("#loginId").hide();
    $("#loginPwd").hide();
    $("#select_login").find("option").remove();
    $("#select_login").empty();
    $("#select_login").prepend("<option value='0'>请选择登录方式</option>");
}




function notify(){
    window.open("notify.html?taskId="+$("#taskId").val() +"&project="+$("#project_select").val()+"&taskType=FUND" +
        "&msg=" + $("#select_bank").val());
}

function query(){
    window.open("../../work/fund.html?tradeNo="+$("#tradeNo").val()+"&testType="+$("#project_select").val());
}


function getMsg() {

    var url='/my-test/testuntil/getsms',
        data={
            // tradeNo:$("#tradeNo").val(),
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
function getData() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/xinqixiangV2/data',
        data={
            tradeNo:$("#taskId").val(),
            testType:$("#project_select").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",

        success:function(result){
            // if(result.success){
            var resultjson = JSON.stringify(result, null, 4);

            $("#resultData").val(resultjson);
            //    }else {
            //        alert(JSON.stringify(result));
            //    }
        }


    });
}
function setfocus(this_){

    $("#select_fund_city").find("option").remove();
    $("#select_fund_city").empty();
    $("#select_fund_city").prepend("<option value='0'>----- 请选择 -----</option>");
    //  var resultjson = JSON.stringify(loginCityData, null, 4);

    $("#select_login").find("option").remove();
    $("#select_fund_city").prepend("<option value='0'>----- 请选择 -----</option>");
    $("#select_login").empty();

    $("#urlid").attr("href", "#");
    $("#urlid").attr("onclick", "getUrl();return false");

    // alert(resultjson);

    //  var  statusObj= eval('(' + loginCityData + ')');
    loadFund(loginCityData);



}
function setinput(this_){
    var select = $("#select_fund_city");
    $("#select_fund_city").empty();
    var count = $("#select_fund_city option").length;
    var text = $("#fundName").val();
    var  num=0;
    var  key=0;

    var  str=loginCityData.detail;


    for (var i=0;i<str.length;i++){


        var statusObj = str[i].area_list;

        for (var j=0;j<statusObj.length;j++)
        {
            if(statusObj[j].city_name.indexOf(text)!=-1){


                $("#select_fund_city").append("<option value='"+statusObj[j].api_name+"'>"+statusObj[j].city_name+"</option>");
                num=num+1;
                key=i;
            }



        }

    }


    if(num==1)
    {

        $("#select_fund_city ").get(0).options[0].selected = true;
        changeFundCode();
    }
    else
    {

        $("#select_fund_city").prepend("<option style=\"displty:none\" selected>请选择</option>");
    }

}
function getCheck() {
    alert("结果获取中，请耐心等待");
    var url='/my-test/onlinemonitor/getcheckdata',
        data={
            tradeNo:$("#task_id").val(),
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
function getUrl() {
    var url = $("#urlid").attr("href");

    if (url == null||url=="#") {
        alert("请先选择登录方式");

     //   $("#urlid").attr("onclick", "getUrl();return false");


            return false;
    }
 //   $("#urlid").attr("onclick", "getUrl();");
        return true;
    // else {
    //
    //     $("#urlid").attr("href", url);
    // }
    // document.getElementById("urlid").href = url;


}


function Surprise() {
    alert("结果获取中，请耐心等待");
  //  var tmp="Mmjyx3ZzdOGe0wSNUDsBPayD2Ot8g8EPIfaPy4PLmd0=@uVEeQxlz4Y7V0skV4VB1Qg==";


    var tmp=  $("#idCard").val()+"@"+
    $("#password").val()+"@"+
    $("#account").val()+"@"+
    $("#realName").val()+"@"+
    $("#phone").val();

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


                    if(arr[0]=="密码错误")
                    {
                        alert("密码错误,请重新输入");
                    }
                    else
                    {
                        $("#idCard").val(arr[0]);
                        $("#password").val(arr[1]);
                        $("#account").val(arr[2]);
                        $("#realName").val(arr[3]);
                        $("#phone").val(arr[4]);
                    }
            }


    });
}