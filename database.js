/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/11/13
 * Time: 3:09 PM
 * To change this template use File | Settings | File Templates.
 */

//  Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, useremail TEXT,address TEXT,phone INTEGER,gender TEXT,hobbies TEXT,image BLOB)";

var selectAllStatement = "SELECT * FROM Contacts";

var insertStatement = "INSERT INTO Contacts (username, useremail, address, phone,gender, hobbies, image) VALUES (?, ?, ?, ?, ?, ?, ?)";

var updateStatement = "UPDATE Contacts SET username = ?, useremail = ?, address = ?, phone = ?,gender = ?,hobbies = ?, image = ? WHERE id=?";

var deleteStatement = "DELETE FROM Contacts WHERE id=?";

var dropStatement = "DROP TABLE Contacts";

var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database

var dataset;

var DataType;

function initDatabase()  // Function Call When Page is ready.

{

    try {

        if (!window.openDatabase)  // Check browser is supported SQLite or not.

        {

            alert('Databases are not supported in this browser.');

        }

        else {

            createTable();  // If supported then call Function for create table in SQLite

        }

    }

    catch (e) {

        if (e == 2) {

            // Version number mismatch.

            console.log("Invalid database version.");

        } else {

            console.log("Unknown error " + e + ".");

        }

        return;

    }

}

function createTable()  // Function for Create Table in SQLite.

{

    db.transaction(function (tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });

}


function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..

{

    var iddelete = id.toString();

    db.transaction(function (tx) {
        tx.executeSql(deleteStatement, [id], showRecords, onError);
        alert("Deleted record Sucessfully");
    });

    resetForm();

}

function updateRecord() // Get id of record . Function Call when Delete Button Click..

{


}

function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.

{

    db.transaction(function (tx) {
        tx.executeSql(dropStatement, [], showRecords, onError);
    });

    resetForm();

    initDatabase();

}

function loadRecord(i) // Function for display records which are retrived from database.

{

    var item = dataset.item(i);

    $("#username").val((item['username']).toString());

    $("#useremail").val((item['useremail']).toString());

    $("#address").val((item['address']).toString());

    $("#phone").val((item['phone']).toString());

    //  var image = item.image;
    //$("#image").val(image);

    $("#id").val((item['id']).toString());

}

function resetForm() // Function for reset form input values.

{

    $("#username").val("");

    $("#useremail").val("");

    $("#address").val("");

    $("#phone").val("");

    $("#gender").val("");

    $('input[type=checkbox]').attr('checked',false);

    $("#image").val("");

    $("#id").val("");

}

function loadAndReset() //Function for Load and Reset...

{

    resetForm();

    showRecords();


}

function onError(tx, error) // Function for Hendeling Error...

{

    alert(error.message);

}

function showRecords() // Function For Retrive data from Database Display records as list

{

    $("#results").html('')

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var linkeditdelete = '<tr><td><li>' + item['username'] + ' , ' + item['useremail'] + ' , ' + item['address'] + ' , ' + item['phone'] + ' , ' + '<img class="thumb" src="' + item['image'] + '"/>' + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +

                    '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li></td></tr>';

                $("#results").append(linkeditdelete);

            }
            createOption();

        });

    });

}
function handleFileSelect(evt) {
    console.log('inside event');
    //   alert("hello");
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
//            alert(f);
//        // Only process image files.
//        if (!f.type.match('image.*')) {
//            continue;
//        }


        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function (f) {
            return function (e) {
                // Render thumbnail.

//                var span = document.createElement('span');
//                span.innerHTML = ['<img class="thumb" src="', e.target.result,
//                    '" title="', escape(theFile.name), '"/>'].join('');
//                document.getElementById('list').insertBefore(span, null);

                var imagetemp = e.target.result;
                $('#image').attr('target', imagetemp);
                //   db.transaction(function (tx) { tx.executeSql(insertStatement, [imagetemp],onError); });

                // function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..

                //{

                // var imagetemp = $('input:file[id=image]').val();


                //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );

                //}


            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function initialLoad() {


    $("body").fadeIn(2000); // Fede In Effect when Page Load..

    initDatabase();
    $('#image').change(function (event) {
        handleFileSelect(event);
    });

    $(document).on('change','#color', function() {
     // fires only after clicking OK
        $('#mycontact').css('background-color', jQuery(this).val());
            });

    $(document).on('change', '#detail', function () {


//                var dataset = result.rows;
//                var it=dataset.item($(this).val());
//                console.log(it);
//                alert("welcome"+it.username+" "+it.phone+" ");
        console.log(dataset);
        for (var i = 0, item = null; i < dataset.length; i++) {
            item = dataset.item(i);
            if (item.id == $(this).val()) {
                alert("welcome  :" + item.username + " " + item.phone + " ");
                // console.log(item);
            }

        }
    });

    $(document).on('click', '#submitButton', function () {
        alert("in here");
        var usernametemp = $('input:text[id=username]').val();

        var useremailtemp = $('input:text[id=useremail]').val();

        var useraddresstemp = $('input:text[id=address]').val();

        var phonetemp = $('input:text[id=phone]').val();

        var gender = $('input[name=gender]:checked').val();
        var hobbies = [];
        $('input[name=hobbies]:checked').each(function () {
            hobbies.push($(this).val());
        });
        var imagetemp = $('#image').attr('target');
        db.transaction(function (tx) {
            tx.executeSql(insertStatement, [usernametemp, useremailtemp, useraddresstemp, phonetemp,gender,hobbies, imagetemp], loadAndReset, onError);
        });
        return false;
    });

    $(document).on('click', '#btnUpdate', function () {

        $('#image').change(function (event) {
            handleFileSelect(event);
        });

        var usernameupdate = $('input:text[id=username]').val().toString();

        var useremailupdate = $('input:text[id=useremail]').val().toString();

        var addressupdate = $('input:text[id=address]').val().toString();

        var phoneupdate = $('input:text[id=phone]').val().toString();

        var imageupdate = $('#image').attr('target');

        var gender = $('input[name=gender]:checked').val();
        var hobbies = [];
        $('input[name=hobbies]:checked').each(function () {
            hobbies.push($(this).val());
        });
        console.log(hobbies);

       // $('input[name=hobbies]').attr('target', hobbies);
        // var imageupdate = $('#image').val();

        var useridupdate = $("#id").val();
        // db.transaction(function (ts){ ts.executeSql(deletes,[],loadAndReset(),onError())})
        db.transaction(function (tx) {
            tx.executeSql(updateStatement, [usernameupdate, useremailupdate, addressupdate, phoneupdate, gender, hobbies, imageupdate, useridupdate], loadAndReset, onError);
        });


    });


//    $("#submitButton").bind('click',alert("hello"));  // Register Event Listener when button click.

    //  $("#btnUpdate").click(updateRecord);

    $("#btnReset").click(resetForm);

    $("#btnDrop").click(dropTable);


}

function createOption() {

    db.transaction(function (tx) {

        tx.executeSql(selectAllStatement, [], function (tx, result) {

            dataset = result.rows;

            for (var i = 0, item = null; i < dataset.length; i++) {

                item = dataset.item(i);

                var opt = new Option(item.id, item.id);
                //   $(opt).html(item.id);

                $("#detail").append(opt);

            }

        });

    });

}

/*function alertdata()
 {
 var i=$("#detail").value;
 alert(i);

 }        */

//initialLoad();