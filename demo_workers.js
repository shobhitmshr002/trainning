/**
 * Created with JetBrains WebStorm.
 * User: manusis
 * Date: 8/30/13
 * Time: 6:19 PM
 * To change this template use File | Settings | File Templates.
 */
var i=0;

function timedCount()
{
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();