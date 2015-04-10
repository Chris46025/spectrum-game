#pragma strict
var timer = 0.0;
     
function Update(){
    timer += Time.deltaTime;
    if(timer > 35)
		Destroy();
}
     
function Destroy(){
    Destroy(gameObject);
}