#pragma strict

    var ball : GameObject;
     
    function Update()
    {
    	ball = GameObject.FindGameObjectWithTag("Player");
    	transform.position.x= ball.transform.position.x-8.5;
    }