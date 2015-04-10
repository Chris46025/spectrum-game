#pragma strict
var score_style : GUIStyle;
var end_title : GameObject;

function Start () {
	Instantiate(end_title, Vector3(0.48,0.75,2), Quaternion.identity);
}
function OnGUI() {
	GUI.Label(Rect(0,(Screen.height / 2), (Screen.width/2), 200), "Your Score: " + PlayerPrefs.GetInt("Your Score"),score_style);
	GUI.Label(Rect((Screen.width/2 + 325),(Screen.height / 2), (Screen.width/15), 200), "High Score: " + PlayerPrefs.GetInt("High Score"),score_style);
	if(GUI.Button(Rect((Screen.width /2.5),(Screen.height / 1.3), (Screen.width/5), (Screen.height/5)), "Play Again"))
		Application.LoadLevel ("game");
}