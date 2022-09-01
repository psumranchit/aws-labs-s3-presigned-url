function fetchPreSigned(e){ 
    //Getting Values
    var fakepath  = document.getElementById('file').value;
    var filename = fakepath.split("\\").pop()
    
    e.preventDefault();
    var url = "https://964dvf7hjj.execute-api.ap-southeast-1.amazonaws.com/prod/upload";
    var obj = {
        file : filename
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        }
    })
    .then(function fetchPreSigned(response){
    return response.json()
    })
    .then(function fetchPreSigned(data){
        superform=document.getElementById("superform")
        key=document.getElementById("key")
        accid=document.getElementById("accid")
        xamztoken=document.getElementById("xamztoken")
        plc=document.getElementById("plc")
        sig=document.getElementById("sig")
        
        superform.action = data.url
        key.value = data.key
        AWSAccessKeyId.value = data.accid
        xamzsecuritytoken.value = data.xamztoken
        policy.value = data.plc
        signature.value = data.sig
    })
}

function validateForm(){
    //Getting Values
    var fileinput  = document.getElementById('file');
    var accesskey = document.getElementById('AWSAccessKeyId')

    //Check if forms are fully filled.
    if (fileinput.value.length===0){
        alert("Please upload file.");
        return false;
    } else if (accesskey.value.length===0){
        alert("Error getting uploading URL. Please try again.")
        return false;
    }
}
