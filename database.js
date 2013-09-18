/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 9/11/13
 * Time: 3:09 PM
 * To change this template use File | Settings | File Templates.
 */

//  Declare SQL Query for SQLite

var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, useremail TEXT,address TEXT,phone INTEGER,gender TEXT,hobbies TEXT,img TEXT,image BLOB)";

var selectAllStatement = "SELECT * FROM Contacts";

var insertStatement = "INSERT INTO Contacts (username, useremail, address, phone,gender, hobbies, img, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

var updateStatement = "UPDATE Contacts SET username = ?, useremail = ?, address = ?, phone = ?,gender = ?,hobbies = ?, img = ?, image = ? WHERE id=?";

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

        return e;

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

    $("#submitButton").attr("disabled", "disabled");
    var item = dataset.item(i);

    $("#username").val((item['username']).toString());

    $("#useremail").val((item['useremail']).toString());

    $("#address").val((item['address']).toString());

    $("#phone").val((item['phone']).toString());

    $("#gender").val((item['gender']).toString());

   // $("#hobbies").val((item['hobbies']).toString());

  //  $("#image").val(item['img']);

    $("#id").val((item['id']).toString());

}

function resetForm() // Function for reset form input values.

{

    $("#username").val("");

    $("#useremail").val("");

    $("#address").val("");

    $("#phone").val("");

    $("#gender").val("");

    $('input[type=checkbox]').attr('checked', false);

    $("#image").val("");

    $("#id").val("");

}

function loadAndReset() //Function for Load and Reset...

{
    $('#preview').attr('src','NULL');
    $('#preview').hide();

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

                var linkeditdelete = '<tr><td><li><b>Name:</b>' + item['username'] + ' ,<b>Email:</b> ' + item['useremail'] + ' ,<b>Address:</b> ' + item['address'] + ' ,<b>Phone:</b> ' + item['phone'] + ' , <b>Gender:</b>' + item['gender']+ ' , ' +'<b>his hobbies:</b>'+ item['hobbies'] + ' , ' + '<img class="thumb" src="' + item['image'] + '"/>' + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +

                    '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li></td></tr>';

                $("#results").append(linkeditdelete);

            }
            createOption();

        });

    });

}
function handleFileSelect(evt) {
    console.log('inside event');



    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {



        var reader = new FileReader();

        reader.onload = function (evt) {
          //  $('#preview').attr('src', evt.target.result);
        }
        // Closure to capture the file information.
        reader.onload = (function (f) {
            return function (e) {




        var imagetemp = e.target.result;
                $('#image').attr('target', imagetemp);

                $('#preview').attr('src',imagetemp);
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
        $('#preview').show();
        //$('#preview').attr('src',$('#image').attr('target'));
    });

    $(document).on('change', '#color', function () {
        // fires only after clicking OK
        $('#mycontact').css('background-color', $(this).val());
    });



    $(document).on('click', '#submitButton', function () {
        alert("in here");

        var usernametemp = $('input:text[id=username]').val();

        var useremailtemp = $('input:text[id=useremail]').val();

        var useraddresstemp = $('input:text[id=address]').val();

        var phonetemp = $('input:text[id=phone]').val();

            var path = $('input[name=files]').val();
                console.log(path);
            var gender = $('input[name=gender]:checked').val();
        var hobbies = [];
        $('input[name=hobbies]:checked').each(function () {
            hobbies.push($(this).val());
        });
        var imagetemp = $('#image').attr('target');
        db.transaction(function (tx) {
            tx.executeSql(insertStatement, [usernametemp, useremailtemp, useraddresstemp, phonetemp, gender, hobbies, path, imagetemp], loadAndReset, onError);

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

        var path= $('#image').val();

        var imageupdate = $('#image').attr('target');

        var gender = $('input[name=gender]:checked').val();
        var hobbies = [];
        $('input[name=hobbies]:checked').each(function () {
            hobbies.push($(this).val());
        });
        console.log(hobbies);

        var useridupdate = $("#id").val();
        db.transaction(function (tx) {
            tx.executeSql(updateStatement, [usernameupdate, useremailupdate, addressupdate, phoneupdate, gender, hobbies, path, imageupdate, useridupdate], loadAndReset, onError);
        });


    });



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

function valid()
{   console.log("here");

        var x=$("#username").val();
        var y=$("#useremail").val();
        var z=$("#address").val();
        var p=$("#phone").val();
        if(x=="")    alert( "empty fname");
            else
        if(x!="" && y=="")    alert( "empty email");
    else
        if(y!="" && z=="")    alert( "empty address");
    else
        if(z!="" && p=="")    alert( "empty no.");
    else
        if(isNaN(p)) alert( "input a no.");
    return false;


       }



