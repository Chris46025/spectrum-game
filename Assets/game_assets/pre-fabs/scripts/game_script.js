#pragma strict
var score_style : GUIStyle;
var font : Font;
var collect : AudioClip;
var up_down : AudioClip;
var start_title : GameObject;
var red : GameObject;
var orange : GameObject;
var yellow : GameObject;
var green: GameObject;
var blue : GameObject;
var obstacle : GameObject;
var level_multiplyer : GameObject;
var reverse_gravity : boolean;
var level: int;
var timer = 0.0;
var timer_two = 0.0;
var playing : boolean;
var game_over : boolean;
var move : float ;

function Start () {
	playing = false; 
	game_over = false;
	reverse_gravity = false;
	var a = Random.Range(0,6);
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
	else
		gameObject.renderer.material.color = Color.white;
	Instantiate(start_title, Vector3(0.5,.75,2), Quaternion.identity);
	level = 0;
	move = .35;
}
function base_terrain() {
	for(var i = -4; i<=4;)
	{
		if(playing == true)
			i += Random.Range(0,4);
		var spawn_terrain_position = Vector3(gameObject.transform.position.x +200,-4.5,i);
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
 		if(playing == false)
 			i += 2;
	}
	for(var i2 = -4; i2<=4;)
	{
		if(playing == true)
			i2 += Random.Range(0,4);
		var spawn_terrain_top_position = Vector3(gameObject.transform.position.x +200,5.5,i2);
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
 		if(playing == false)
 		i2 += 2;
	}
}
function spawn_obstacle()
{
	var a = level%6;
	var i2 = -4;
	for(var i = 0; i<a+4; i++)
	{
		var spawn_obstacle_position = Vector3(gameObject.transform.position.x +((a*5)+50),Random.Range(-3,3),i2);
 		Instantiate(obstacle, spawn_obstacle_position, Quaternion.identity);
 		 if(i2<4)
 			i2 += 2;
 		else
 			i2 = -4;
	}
}
function spawn_stars()
{
	var a = level%2;
	var i2 = -4;
	for(var i = 0; i<a+6; i++)
	{
		var spawn_star_position = Vector3(gameObject.transform.position.x +((a*5)+50),Random.Range(-3,3),i2);
 		Instantiate(level_multiplyer, spawn_star_position, Quaternion.identity);
 		if(i2<4)
 			i2 += 2;
 		else
 			i2 = -4;
 	}
}
function OnCollisionEnter(col : Collision){
    if(col.gameObject.tag == "star")
    {
    	level +=1;
    	audio.PlayOneShot(collect);
    	if(level/3 == 1)
    	{
    		if(move <= 0.899)
    			move += 0.05;
    	}
    }
    if(col.gameObject.tag == "obstacle")
    {
    	playing = false;
    	game_over = true;
	}
}
function OnGUI(){
	if(playing == false && game_over == false)//home screen
	{
		GUI.Label(Rect((Screen.width / 2-50),(Screen.height / 2-20), 100, 100), "High Score: " + PlayerPrefs.GetInt("High Score") ,score_style);
		GUI.skin.font = font;
		if(GUI.Button(Rect((Screen.width /2.6),(Screen.height /1.5), (Screen.width/4.5), (Screen.height/4)), "Play",score_style))
		{
			Destroy(GameObject.FindGameObjectWithTag("start"));
			playing = true;
			timer_two = 0;
		}
	}
	else if(playing == true && game_over == false)
	{
		GUI.Label(Rect((Screen.width / 2)-100,80, 200, 30), "Score: " + level,score_style);
		//ball controls
		if (GUI.Button(Rect(0,(Screen.height/2), (Screen.width/4), (Screen.height/4)),"Left",score_style) && gameObject.transform.position.z<=2)
	 		gameObject.transform.position.z+=2;	
		if (GUI.Button(Rect((Screen.width - (Screen.width/4)),(Screen.height/2), (Screen.width/4), (Screen.height/4)),"Right",score_style) && gameObject.transform.position.z>=-2)
			gameObject.transform.position.z-=2;
		if(GUI.Button(Rect(0,(Screen.height-(Screen.height/4)), (Screen.width/4), (Screen.height/4)),"Gravity",score_style)|| GUI.Button(Rect((Screen.width-(Screen.width/4)),(Screen.height-(Screen.height/4)), (Screen.width/4), (Screen.height/4)),"Gravity",score_style))
		{
			audio.PlayOneShot(up_down);
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
	else	
	{
		save();
		Application.LoadLevel ("end_menu");
	}
}
function Update () {
	gameObject.transform.position.x += move;
	if(playing == false)
	{
		timer_two += Time.deltaTime;
		if(timer_two > 25)
		{
			base_terrain();
			timer_two = 0;
		}
	}
	else
	{
	timer += Time.deltaTime;
	timer_two += Time.deltaTime;
	if(timer > 3)
	{
		spawn_obstacle();
		spawn_stars();
		timer = 0.0;
	}
	timer_two += Time.deltaTime;
	if(timer_two > 15)
	{
		base_terrain();
		timer_two = 0;
	}
	if(gameObject.transform.position.y >= 10 || gameObject.transform.position.y <=-10)
	{	
		playing = false;
		game_over = true;
	}
	}
}
function save()
{
	PlayerPrefs.SetInt("Your Score",level);
	if(level > PlayerPrefs.GetInt("High Score"))
	{
		PlayerPrefs.SetInt("High Score",level);
	}
}