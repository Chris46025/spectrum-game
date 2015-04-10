#pragma strict
var timer = 0.0;
var left : boolean;
var move : int;

function Start () {
	var a = Random.Range(0,7);
	if(a == 0)
		gameObject.renderer.material.color = Color.red;
	else if(a == 1)
		gameObject.renderer.material.color = Color.blue;
	else if(a == 2)
		gameObject.renderer.material.color = Color.yellow;
	else if(a == 3)
		gameObject.renderer.material.color = Color.green;
	else if(a == 4)
		gameObject.renderer.material.color = Color.magenta;
	else if(a == 5)
		gameObject.renderer.material.color = Color.white;
	else
		gameObject.renderer.material.color = Color.black;
	left = true;
	move = Random.Range(0,50);
}
function left_right()
{
	if(left == true)
	{
		if(gameObject.transform.position.z < 6)
			gameObject.transform.position.z+=.2;
		else
			left = false;
	}
	else
	{
		if(gameObject.transform.position.z > -6)
			gameObject.transform.position.z-=.2;
		else
			left = true;
	}
		
}    
function Update(){
    timer += Time.deltaTime;
    if(move == 25)
    	left_right();
    if(timer > 25)
		Destroy(gameObject);
}
function OnCollisionEnter(col : Collision){
    if(col.gameObject.tag == "terrain" || col.gameObject.tag == "obstacle")
    	Destroy(gameObject);
}