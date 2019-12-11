/**
 * Created by jinshuai on 2019/7/30.
 */

var status1 = "new";
var status2 = "fixed";
var status3 = "select";
var status4 = "closed";
var status5 = "mission";


function showMission() {

    document.getElementById('bugDetail').value = '';


    if ($("#man").val().trim() == null || $("#man").val().trim() == "") {
        alert("录入人员不能为空,请输入");
        return;
    }

    var url = '/my-test/manageUntil/saveBugDetail',
        data = {

            man: $("#man").val(),
            status: status5,
        };

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function (result) {

            if (result == -2) {
                alert("查询无数据");
                $("#detail").html("查询无数据");

            } else if (result == "-1") {
                alert("查询失败，请检查" + result);

            } else {


                var strArray = result.split("|")
                for (var i = 0; i < strArray.length - 1; i++) {

//
                    var substr1 = strArray[i].replace(/\s/g, "")


                    // var substr2 = substr1.match(/itemName=(\S*),bugTeam=/);
                    var substr2 = substr1.match(/itemName=(\S*),bugTeam=/);

                    var substr3 = substr2.slice(1, 2);

                    var divA = document.getElementById("bugDetail");
                    if (strArray[i].length > 0) {


                        divA.value = divA.value + "\n" + substr3;

                        // document.getElementById("bugDetail").innerHTML=substr3.toString();

                    }


                }

                alert("查询成功!!"+substr2);


                // var divA = document.getElementById("label_1");
                // divA.innerHTML = divA.innerText+'追加的内容s';
                // //divA.innerHTML +='追加的内容s';
                // divA.innerHTML = divA.innerHTML+'<h3>追加内容为H3字体</h3>'

            }
        }
    });
}

function show() {

    document.getElementById('detail').innerHTML = '';


    var obj2 = document.getElementById("selectBugTeam"); //定位id
    var index2 = obj2.selectedIndex; // 选中索引

    //var text = obj.options[index].text; // 选中文本
    var selectTeamValue = obj2.options[index2].value; // 选中值

    var yon = document.getElementsByName("yon");
    yon[0].checked = false;

    if ($("#selectItemName").val().trim() == null || $("#selectItemName").val().trim() == "") {
        alert("工单名称不能为空,请输入");
        return;
    }

    var url = '/my-test/manageUntil/saveBugDetail',
        data = {

            itemName: $("#selectItemName").val(),
            status: status3,
            bugTeam: selectTeamValue,
        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function (result) {
            //  $("#resultData").val(JSON.stringify(result));
            //  alert(result);
            if (result == -2) {
                alert("查询无数据");
                $("#detail").html("查询无数据");

            } else if (result == "-1") {
                alert("查询无数据!" + result);

            } else {


                var strArray = result.split("|")
                for (var i = 0; i < strArray.length - 1; i++) {

                    var bvvvv = "label_" + i;

//
                    var substr1 = strArray[i].replace(/\s/g, "")
                    var substr2 = substr1.match(/bugDetail=(\S*),status=/);
                    var substr3 = substr2.slice(1, 2);

                    var subid = substr1.match(/id=(\S*),itemName=/);
                    var subid2 = subid.slice(1, 2);

                    var substatus = substr1.match(/status=(\S*),creater=/);
                    var substatus2 = substatus.slice(1, 2);

                    var subteam = substr1.match(/bugTeam=(\S*),bugDetail=/);
                    var subteam2 = subteam.slice(1, 2);

                    var content = "<input type=\"checkbox\" id =\"box" + i + "\" name =\"mychk\" value= " + subid2 + "> &nbsp;&nbsp;<label style='color:red;display:inline-block;width:60px'> "+substatus2+"</label> &nbsp;&nbsp;<label style='color:cornflowerblue;display:inline-block;width:80px'> <b> "+subteam2+"</b></label>&nbsp;&nbsp; <label id=\"label_" + i + "\" for = \"bug\"></label>";

                    if (strArray[i].length > 0) {

                        var divA = document.getElementById("detail");
                        divA.innerHTML = divA.innerHTML + "<br/>" + content;
                        document.getElementById(bvvvv).innerHTML = substr3.toString();

                    }

                }

                alert("查询成功");


                // var divA = document.getElementById("label_1");
                // divA.innerHTML = divA.innerText+'追加的内容s';
                // //divA.innerHTML +='追加的内容s';
                // divA.innerHTML = divA.innerHTML+'<h3>追加内容为H3字体</h3>'

            }

        }
    });
}


function insert() {

    var obj = document.getElementById("bugTeam"); //定位id
    var index = obj.selectedIndex; // 选中索引

    //var text = obj.options[index].text; // 选中文本
    var teamValue = obj.options[index].value; // 选中值

        if ($("#man").val().trim() == null || $("#man").val().trim() == "") {
            alert("录入人员不能为空,请输入");
            return;
        }
    if ($("#itemName").val().trim() == null || $("#itemName").val().trim() == "") {
        alert("工单名称不能为空,请输入");
        return;
    }
    if ($("#bugDetail").val().trim() == null || $("#bugDetail").val().trim() == "") {
        alert("缺陷详情不能为空,请输入");
        return;
    }
    if ($("#bugDetail").val().trim() == null || $("#bugDetail").val().trim() == "") {
        alert("缺陷详情不能为空,请输入");
        return;
    }
    if (teamValue == null || teamValue == ""|| teamValue == "none") {
        alert("缺陷所属小组不能为空,请输入");
        return;
    }


    var url = '/my-test/manageUntil/saveBugDetail',
        data = {

            itemName: $("#itemName").val(),
            bugDetail: $("#bugDetail").val(),
            man: $("#man").val(),
            status: status1,
            bugTeam: teamValue,

        };
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        type: "POST",
        success: function (result) {
            //  $("#resultData").val(JSON.stringify(result));
            //  alert(result);
            if (result > 0) {
                alert("保存成功");

            } else if (result == "0") {
                alert("保存失败，请检查" + result);

            } else {
                alert(result);
            }

        }
    });
}

function fixed() {

    if ($("#man").val().trim() == null || $("#man").val().trim() == "") {
        alert("录入人员不能为空,请输入");
        return;
    }

    obj = document.getElementsByName("mychk");
    check_val = [];
    for (k in obj) {
        if (obj[k].checked) {
            check_val.push(obj[k].value);
        }
    }
    var bugid = check_val.toString();

    if (bugid == "" || bugid == null || bugid == undefined) {
        alert("请选择已修复或验证中的缺陷！")
    } else {

        var url = '/my-test/manageUntil/saveBugDetail',
            data = {

                man: $("#man").val(),
                status: status2,
                bugId: bugid,
            };
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            type: "POST",
            success: function (result) {

                if (result <= "0") {
                    alert("修改失败！");

                } else {
                    alert("修改成功！");
                }
            }
        });
    }
}

function closed() {

    if ($("#man").val().trim() == null || $("#man").val().trim() == "") {
        alert("录入人员不能为空,请输入");
        return;
    }

    obj = document.getElementsByName("mychk");
    check_val = [];
    for (k in obj) {
        if (obj[k].checked) {
            check_val.push(obj[k].value);
        }
    }
    var bugid = check_val.toString();

    if (bugid == "" || bugid == null || bugid == undefined) {
        alert("请选择已修复或验证中的缺陷！")
    } else {

        var url = '/my-test/manageUntil/saveBugDetail',
            data = {

                man: $("#man").val(),
                status: status4,
                bugId: bugid,
            };
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            type: "POST",
            success: function (result) {

                if (result <= "0") {
                    alert("修改失败！");

                } else {
                    alert("修改成功！");
                }
                $(".dl").load(location.href + " .dl");
            }
        });
    }

}

function chk() {
    var all = document.getElementById("all");
    var mychk = document.getElementsByName("mychk");
    // alert("mychk长度=="+mychk.length);
    if (all.checked == true) {
        // alert("all.checked==true全选");
        if (mychk.length) {
            for (var i = 0; i < mychk.length; i++) {
                mychk[i].checked = true;
            }

        }
        mychk.c
        hcked = true;
    } else {
        // alert("all.checked==false全不选");
        if (mychk.length) {
            for (var i = 0; i < mychk.length; i++) {
                mychk[i].checked = false;
            }

        }
    }

}

