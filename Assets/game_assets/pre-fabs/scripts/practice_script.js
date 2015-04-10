#pragma strict

var practice_style : GUIStyle;
var font : Font;
var ball : GameObject;
var red : GameObject;
var orange : GameObject;
var yellow : GameObject;
var green: GameObject;
var blue : GameObject;
var obstacle : GameObject;
var level_multiplyer : GameObject;
var reverse_gravity : boolean;
var timer = 0.0;
var timer_two = 0.0;
var practice_score = 0.0;
var screen_number : int;
var show_message: float;

function Start () {
	screen_number = 0;
	practice_score = 0.0;
	reverse_gravity = false;
	var a = Random.Range(0,7);
	if(a == 0)
		ball.renderer.material.color = Color.red;
	else if(a == 1)
		ball.renderer.material.color = Color.blue;
	else if(a == 2)
		ball.renderer.material.color = Color.yellow;
	else if(a == 3)
		ball.renderer.material.color = Color.green;
	else if(a == 4)
		ball.renderer.material.color = Color.magenta;
	else if(a == 5)
		ball.renderer.material.color = Color.white;
	else
		ball.renderer.material.color = Color.black;
	Instantiate(ball, Vector3(-200,1.5,0), Quaternion.identity);
	ball = GameObject.FindGameObjectWithTag("Player");
	show_message = 0;
}
function base_terrain(begin : boolean) {
	for(var i = -4; i<=4;)
	{
		if(begin == false)
			i += Random.Range(0,2);
		var spawn_terrain_position = Vector3(ball.transform.position.x +300,-4.5,i);
		if(i == 4)
 			Instantiate(red, spawn_terrain_position, Quaternion.identity);
 		else if(i == 2)
 			Instantiate(orange, spawn_terrain_position, Quaternion.identity);
 		else if(i == 0)
 			Instantiate(yellow, spawn_terrain_position, Quaternion.identity);
 		else if(i == -2)
 			Instantiate(green, spawn_terrain_position, Quaternion.identity);
 		else if(i == -4)
 			Instantiate(blue, spawn_terrain_position, Quaternion.identity);
 		if(begin == true)
 			i += 2;
 		
 		
	}
	for(var i2 = -4; i2<=4;)
	{
		if(begin == false)
			i2 += Random.Range(0,2);
		var spawn_terrain_top_position = Vector3(ball.transform.position.x +300,5.5,i2);
		if(i2 == 4)
 			Instantiate(red, spawn_terrain_top_position, Quaternion.identity);
 		else if(i2 == 2)
 			Instantiate(orange, spawn_terrain_top_position, Quaternion.identity);
 		else if(i2 == 0)
 			Instantiate(yellow, spawn_terrain_top_position, Quaternion.identity);
 		else if(i2 == -2)
 			Instantiate(green, spawn_terrain_top_position, Quaternion.identity);
 		else if(i2 == -4)
 			Instantiate(blue, spawn_terrain_top_position, Quaternion.identity);
 		if(begin == true)
 			i2 += 2;
	}
}

function spawn_obstacle()
{
	var a = 0;
	for(var i = 0; i<a+3; i++)
	{
		var spawn_obstacle_position = Vector3(ball.transform.position.x +((a*5)+50),Random.Range(-3,3),Random.Range(-4,4));
 		Instantiate(obstacle, spawn_obstacle_position, Quaternion.identity);
	}
}
function spawn_stars()
{
	var a = 0;
	var i2 = -4;
	for(var i = 0; i<a+6; i++)
	{
		var spawn_star_position = Vector3(ball.transform.position.x +((a*5)+50),Random.Range(-3,3),i2);
 		Instantiate(level_multiplyer, spawn_star_position, Quaternion.identity);
 		if(i2<4)
 			i2 += 2;
 		else
 			i2 = -4;
 	}
}
function OnCollisionEnter(col : Collision){
    if(col.gameObject.tag == "obstacle")
    	Application.LoadLevel ("game");
	if(col.gameObject.tag == "star")
    	practice_score +=1;
}
function OnGUI(){
	GUI.skin.font = font;
	if(GUI.Button(Rect((Screen.width-150),(Screen.height-75), 150, 75),"Next"))
	{
		show_message = 0;
		screen_number += 1;
	}
	if(screen_number == 0)
	{
		GUI.Label(Rect((Screen.width/2-100),(Screen.height/4), 200, 100),"This mode is a relaxed mode to get you to understand the mechanics of the game so you will be all set to set the next high score.",practice_style);
	}
	if(screen_number >= 1)
	{
	 if (GUI.Button(Rect(0,(Screen.height/2), (Screen.width/4), (Screen.height/4)),"Left",practice_style) && gameObject.transform.position.z<=2)
	 		gameObject.transform.position.z+=2;	
		if (GUI.Button(Rect((Screen.width - (Screen.width/4)),(Screen.height/2), (Screen.width/4), (Screen.height/4)),"Right",practice_style) && gameObject.transform.position.z>=-2)
			gameObject.transform.position.z-=2;
		if(GUI.Button(Rect(0,(Screen.height-(Screen.height/4)), (Screen.width/4), (Screen.height/4)),"Gravity",practice_style))
		{
			if(reverse_gravity == false)
				{
					Physics.gravity = Vector3(0,gameObject.transform.position.y + 20,0);
					reverse_gravity = true;
				}
				else
				{
					Physics.gravity = Vector3(0,gameObject.transform.position.y - 20,0);
					reverse_gravity = false;
				}
		}
	}
	if(screen_number == 2)
	{	
		GUI.Label(Rect((Screen.width / 2)-100,10, 200, 30), "Stars: " + practice_score,practice_style);
		if(show_message <5)
			GUI.Label(Rect((Screen.width/2-100),(Screen.height/4), 200, 200),"Main objective : collect stars.",practice_style);

	}
	else if(screen_number == 3)
	{
		if(show_message <4)
			GUI.Label(Rect((Screen.width/2-100),(Screen.height/4), 200, 100),"Other objectives: AVOID ALL OBSTACLES, and STAY ON SCREEN.",practice_style);
	}
	else if(screen_number >=4)
	{
		Destroy(ball);
		Application.LoadLevel ("game");
	}
}
function Update () {
	transform.position.x = ball.transform.position.x;
	transform.position.y = ball.transform.position.y;
	transform.position.z = ball.transform.position.z;

	timer += Time.deltaTime;
	timer_two += Time.deltaTime;
	show_message += Time.deltaTime;
	if(screen_number >= 2)
	{
		if(screen_number == 3)
		{	
			if(timer > 3)
				spawn_obstacle();
		}
		if(timer > 3)
		{
			spawn_stars();
			timer = 0.0;
		}
	}
	if(timer_two > 13)
	{
		base_terrain(true);
		timer_two = 0.0;
	}
	ball.transform.position.x += .1;
}