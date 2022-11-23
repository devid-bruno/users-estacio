//limitar a quantidade de vezes que um usuario pode inserir uma pergunta

function limit(){
    var count = 0;
    if(count < 5){
        count++;
        return true;
    }else{
        return false;
    }
}