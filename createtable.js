/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/10/13
 * Time: 5:57 PM
 * To change this template use File | Settings | File Templates.
 */

var aa = 0;
function addcoll() {
    if (aa < 10) {
        var bb = document.createElement("tr");
        var cc = document.createElement("td");
        var br = document.createElement("br");
        var input = document.createElement("input");
        input.type = "text";
        input.id = "n" + aa;
        var sel = document.createElement("select");
        sel.id = "opt1_" + aa;
        var sel1 = document.createElement("select");
        sel1.id = "opt2_" + aa;
        var opt1 = document.createElement("option");
        var opt2 = document.createElement("option");
        var opt3 = document.createElement("option");
        var opt4 = document.createElement("option");
        var opt5 = document.createElement("option");
        var opt6 = document.createElement("option");
        opt1.value = "NUMBER";
        opt2.value = "TEXT";
        opt3.value = "NOT NULL";
        opt4.value = "UNIQUE";
        opt5.value = "PRIMARY KEY";
        opt6.value = " ";
        var txt1 = document.createTextNode("NUMBER");
        var txt2 = document.createTextNode("TEXT");
        var txt3 = document.createTextNode("NOT NULL");
        var txt4 = document.createTextNode("NUMBER");
        var txt5 = document.createTextNode("PRIMARY KEY");
        var txt6 = document.createTextNode("Select");
        opt1.appendChild(txt1);
        opt2.appendChild(txt2);
        opt3.appendChild(txt3);
        opt4.appendChild(txt4);
        opt5.appendChild(txt5);
        opt6.appendChild(txt6);
        sel.appendChild(opt1);
        sel.appendChild(opt2);
        sel1.appendChild(opt6);
        sel1.appendChild(opt3);
        sel1.appendChild(opt4);
        sel1.appendChild(opt5);
        cc.appendChild(br);
        cc.appendChild(input);
        cc.appendChild(sel);
        cc.appendChild(sel1);
        bb.appendChild(cc);
        document.getElementById("area").appendChild(bb);


        aa++;
    }
}
function create() {
    var tab="CREATE TABLE IF NOT EXISTS TABLEname(T_NAME TEXT PRIMARY KEY)";
    var flag = false , flag1 = 0;
    var arr = new Array();
    var name = document.getElementById("in1").value;
    var sql = "CREATE TABLE IF NOT EXISTS " + name + " ( ";
    for (var i = 0; i < aa; i++) {
        var a1 = document.getElementById("n" + i + "").value;
        arr[i] = a1;
        var a2 = document.getElementById("opt1_" + i + "").value;
        var a3 = document.getElementById("opt2_" + i + "").value;
        if (a3.match("PRIMARY KEY")) {
            flag1++;
        }

        if (i < aa - 1) sql = sql + a1 + " " + a2 + " " + a3 + " , ";
        else   sql = sql + a1 + " " + a2 + " " + a3;
    }
    sql = sql + ");";
    if (name != "") {

        for (var k = 0; k < arr.length; k++) {
            for (var l = 0; l < arr.length; l++) {
                if (k != l && arr[k] === arr[l]) {
                    document.getElementById("n" + k + "").value = "";
                    arr[k] = "";
                    flag = true;
                }
            }
        }

        if (flag)
            alert("Enter the column name again ")
        if (flag1 != 1) {
            alert("Make one column Primary key");

        }

    }

    else {
        alert("Enter table name");
    }
    if (!flag) {
        var db = openDatabase('TEST', '1.1', 'TEST NAME', 65536);
        db.transaction(function (tx) {
            tx.executeSql(sql);
            //ts.executeSql(tab);


        });
        db.transaction(function (ts){
            ts.executeSql(tab);
        });
        db.transaction(function (tr){
            tr.executeSql("INSERT INTO TABLEname (T_NAME) VALUES ("+name+");");
        });
    }

}

function db_retrive() {
    var sql = "select * from " + document.getElementById("in1").value + " ;";
    var resultContainer;
    resultContainer = document.getElementById("area");
    resultContainer.innerHTML = "";
    db.transaction(function (tx) {
            tx.executeSql(sql, [], function (tx, results) {
                    var len = results.rows.length, i, j, m, txt, columns = [];
                    if (len > 0) {
                        txt = "";
                        txt = txt + "<div style='padding:10px;'><div style='margin-bottom:10px;'>Number of Records: " + len + "</div>";
                        txt = txt + "<table><tr>";
                        for (m in results.rows.item(0)) {
                            columns.push(m);
                        }
                        for (j = 0; j < columns.length; j++) {
                            txt = txt + "<th>" + columns[j] + "</th>";
                        }
                        txt = txt + "</tr>";
                        for (i = 0; i < len; i++) {
                            txt = txt + "<tr>";
                            for (j = 0; j < columns.length; j++) {
                                txt = txt + "<td>" + results.rows.item(i)[columns[j]] + "</td>";
                            }
                            txt = txt + "</tr>";
                        }
                        resultContainer.innerHTML = txt + "</table></div>";
                    }


                }
            );
        }
        , function (err) {
            window.alert("Error 1: " + err.message);
        }
    );
}
;
