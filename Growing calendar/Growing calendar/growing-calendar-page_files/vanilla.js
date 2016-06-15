function copyToClipBoard (oElm) {
	var a = 1;
	var tr = false;
	if (oElm) {
		tr = document.body.appendChild(document.createElement("textarea"));
		tr.value = oElm.getElementsByTagName("span")[0].innerHTML;
		tr.select();
		a++;
		try {
			a = document.execCommand("copy");
		} catch(e) {
			// console.log("NO GO");
		}
		tr.parentElement.removeChild(tr);
	}
}


function createCookie(name,value,days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }

    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}