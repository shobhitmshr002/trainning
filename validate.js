
function validate()
    {   console.log("here");
        try{
        var x=document.forms["f1"]["fname"].value;
        var y=document.forms["f1"]["lname"].value;
        var z=document.forms["f1"]["no"].value;
        if(x=="")    throw "empty fname";
        if(y=="")    throw "empty lname";
        if(z=="")    throw "empty no";
        if(isNaN(z)) throw "not a number";
        if(z>10)     throw "too high";
        if(z<5)      throw "too low";
        }
catch(err)
        {
            alert(err);
            }
}