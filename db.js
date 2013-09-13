/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/10/13
 * Time: 6:04 PM
 * To change this template use File | Settings | File Templates.
 */

var db;

function tablename(){

    db = openDatabase('TEST', '1.1', 'TEST NAME', 65536);
    db.transaction(function (tx) {

            tx.executeSql("SELECT name FROM sqlite_master WHERE type='table';" ,[],function (tx, results) {
                var len = results.rows.length, i;

                for (i = 0; i < len; i++) {
                    var opt1 = document.createElement("option");
                    opt1.value = results.rows.item(i).name;
                    var txt1 = document.createTextNode(results.rows.item(i).name);
                    opt1.appendChild(txt1);
                    document.getElementById("in1").appendChild(opt1);

                }
            });


        }
        ,function (err) {
            window.alert("Error 1: " + err.message);
        });
}