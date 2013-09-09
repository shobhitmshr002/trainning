function find()
{
    var a=document.getElementById("txtf").value;
    var b=document.getElementById("ta").value;
    var c="";
    for(var i=0;i<b.length;i++)
    {
        var d=b.substr(i,a.length)
        if (d.indexOf(a) != -1)
            c=c +" " + (d.indexOf(a)+i);
    }
    if (c!="")
    {
        alert(c);
    }
    else
    {
        alert("not find");
    }
}
function replace()
{
    var a=document.getElementById("txtf").value;
    var b=document.getElementById("ta").value;
    var c="";
    for(var i=0;i<b.length;i++)
    {
        var d=b.substr(i,a.length)
        if (d.indexOf(a) > -1)
        {
            c=c + document.getElementById("txtr").value;
            i=i+a.length-1;
        }
        else
            c=c + b.charAt(i);
    }
    document.getElementById("ta").value=c;
}