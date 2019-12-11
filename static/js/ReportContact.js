/**
 * Created by yanghao on 2018/11/26.
 */
var NewxinqixiangData


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



function submitForm() {
    var url='/my-test/xinqixiang/submitReportContactForm',
        data={

            testType:$("#project_select").val(),
            ntxType:$("#reportinfo").val(),
        };
    $.ajax({
        url:url,
        data:JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType:"json",
        type:"POST",
        success:function(result){
            var y = JSON.stringify(result, null, 4);
           alert(y);

        }
    });
}

function getDemo() {
    $("#reportinfo").val("{\n" +
        "\"apiUser\":\"8013933867\", \n" +
        "\"apiEnc\":\"B8180C11F4C52F142B446CD7D37D9274\", \n" +
        "\"token\":\"0078389353709481984\",\n" +
        "  \"contacts\": {\n" +
        "    \"18187505668\": \"张三\",\n" +
        "    \"15340679357\": \"李四\",\n" +
        "        \"17365743806\": \"李333\"\n" +
        "  },\n" +
        "  \"emergContacts\": {\n" +
        "    \"15340679357\": \"张三\",\n" +
        "    \"17365743806\": \"李四\",\n" +
        "        \"18187505668\": \"李222\"\n" +
        "  }\n" +
        "}");
}
