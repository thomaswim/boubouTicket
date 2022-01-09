
  function delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

function lydia(){
    window.open('https://lydia-app.com/collect/53275-conso-soiree/fr', '_blank');
    document.location.href="Validation.html";
}

function back(){
    document.location.href="monCompte.html";
}