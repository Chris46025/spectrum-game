#pragma strict
var timer = 0.0;

function OnCollisionEnter(col : Collision){
    if(col.gameObject.tag == "Player"|| col.gameObject.tag == "obstacle")
    	Destroy(gameObject);
}
function Update(){
    timer += Time.deltaTime;
    if(timer > 25)
		Destroy(gameObject);
}