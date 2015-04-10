#pragma strict
var title_style : GUIStyle;

function OnGUI () {
	GUI.Label(Rect((Screen.width/3.3),(Screen.height/3),(Screen.width/4),(Screen.height/4)), "Welcome to Spectrum. Adjust your eyes and ears as neccessary. "+
	"Not everything you see and hear is right, but what you do see will help your score, and what you do hear will amaze you. " +
	"Use diection, gravity and watch for misdirection to get the highest score, click Game to have fun and to jump into the Spectrum!",title_style);
	if(GUI.Button(Rect((Screen.width/3.3),(Screen.height-(Screen.height/5)), (Screen.width/4), (Screen.height/4)),"Game",title_style))
		Application.LoadLevel ("game");
}


