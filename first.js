function EventUtil(obj,event,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+event,fn);
	}else if(obj.addEventListener){
		obj.addEventListener(event,fn,false);
	}else{
		return false;
	}
}
/*this is for the circle picture*/
EventUtil(window,'load',function(){
	//click ths input and then get the email
	var oMail = document.getElementById('mail');
	oMail.onclick = function(){
		this.value = '970820777@qq.com';
	}

	/* make the picture sroll */
	var oPicContain1 = document.getElementById('picContain1');
	var oPicContain2 = document.getElementById('picContain2');
	var aImg = oPicContain2.getElementsByTagName('img');
	oPicContain2.innerHTML += oPicContain2.innerHTML;
	var timer = null;
	var iSpeed = 1; /*positive number is to left  || negative number is to right*/
	var leftSpeed = 1, rightSpeed = -1;
	/*setTimeout can ensure this loop must be execute; 
		while setInterval can't always be like this ! */
	function pictureScroll(speed){
		timer=setTimeout(function(){
			var leftLimit = -oPicContain1.offsetWidth,
				rightLimit = 0;
			var leftDis = oPicContain2.offsetLeft - speed;
			/*to left and half srolled, then return to previous position*/
			if(leftDis <= leftLimit ){ 
				leftDis = rightLimit;
			}
			/*to right and start at zero, then move to position where half srolled*/
			else if(leftDis >=rightLimit){
				leftDis = leftLimit;
			}
			oPicContain2.style.left =  leftDis + 'px';
			timer = setTimeout(arguments.callee,10);
		},10);
	}

  /*when mouse is over the pictures , they stop ; and when out, they continue moving*/
	pictureScroll(iSpeed);
	oPicContain2.onmouseover = oPicContain2.onmousemove = function(){
		clearTimeout(timer);
	}
	oPicContain2.onmouseout = function(){
		pictureScroll(iSpeed);
	}

	/*this is for toLeft and toRight button*/
	var oToLeft = document.getElementById('toLeft');
	var oToRight = document.getElementById('toRight');

	 function toWhere(speed){
		clearTimeout(timer);
		iSpeed = speed;
		pictureScroll(iSpeed);
	};
	oToLeft.onclick = function(){
		toWhere(leftSpeed);
	};
	oToRight.onclick = function(){
		toWhere(rightSpeed);
	};
});
/*this is for the moving window*/
EventUtil(window,'load',function(){
	var oMoveWin = document.getElementById('moveWin');
	var oWin = document.getElementById('win');
	var timer1 = null;

	var xSpeed=1,ySpeed=1;
	move(oWin,xSpeed,ySpeed);

	oWin.onmouseover = oWin.onmousemove = function(){
		clearInterval(timer1);
	}
	oWin.onmouseout = function(){
		move(oWin,xSpeed,ySpeed);
	}
	function move(obj,speedX,speedY){
		timer1 = setInterval(function(){
			var leftLimit = 0,
				rightLimit =  oMoveWin.offsetWidth - obj.offsetWidth,
				topLimit = 0,
				bottomLimit =  oMoveWin.offsetHeight - obj.offsetHeight;
			var leftDis = obj.offsetLeft + speedX,
				topDis = obj.offsetTop + speedY;
				/*when it comes to the limit, the speed turns another direction*/
			if(leftDis < leftLimit ){
				leftDis = leftLimit;
				speedX *= -1;
			}else if(leftDis > rightLimit ){
				leftDis = rightLimit;
				speedX *= -1;
			}
			if(topDis < topLimit ){
				topDis = topLimit;
				speedY *= -1;

			}else if(topDis > bottomLimit ){
				topDis = bottomLimit;
				speedY *= -1;
			}
			xSpeed = speedX;
			ySpeed = speedY;
			obj.style.left = leftDis + 'px';
			obj.style.top = topDis + 'px';
		},10); 
	}

	oWin.onclick = function(){
		var oNewWin = window.open('input.html','_blank');
	}
});
/*this is for the impacting ball*/
EventUtil(window,'load',function(){
	var oMiddle =document.getElementById('middle');
	var oMoveBall = document.getElementById('moveBall');
	var oBall = document.getElementById('ball');
	var xDis = 0,
		yDis = 0, // xDis and yDis is for making the ball move follow the mouse
		oldClientX = 0,
		oldClientY = 0, // oldClientx and oldClientY is for calculate the start speed
		xSpeed = 0,
		ySpeed = 0;//xSpeed and ySpeed is for when mouseup , get the speed
	var leftLimit = 0,
		rightLimit = oMoveBall.offsetWidth - oBall.offsetWidth -2,
		topLimit = 0,
		bottomLimit = oMoveBall.offsetHeight - oBall.offsetHeight -2;
	var moveBallLeft = oMiddle.offsetLeft + oMoveBall.offsetLeft ,
		moveBallTop = oMiddle.offsetTop + oMoveBall.offsetTop ;
		/*when mousedown , collect the distance*/
	var timer2 = null;
	oBall.onmousedown = function(ev){
		var oEv = event || ev;
		
		xDis = oEv.clientX - (moveBallLeft + oBall.offsetLeft);
		yDis = oEv.clientY - (moveBallTop + oBall.offsetTop);
		document.onmousemove = function(ev){
			var oEv = event || ev;
			/*make sure the ball is between the limit when you move it*/
			var leftDis = oEv.clientX - moveBallLeft - xDis,
				topDis = oEv.clientY - moveBallTop - yDis;
			if(leftDis < leftLimit){
				leftDis = leftLimit;
			}else if(leftDis >rightLimit){
				leftDis = rightLimit;
			}
			if(topDis < topLimit){
				topDis = topLimit;
			}else if(topDis > bottomLimit){
				topDis = bottomLimit;
			}
			oBall.style.left = leftDis + 'px';
			oBall.style.top = topDis + 'px';

			xSpeed = oEv.clientX - oldClientX;
			ySpeed = oEv.clientY - oldClientY;

			oldClientX = oEv.clientX;
			oldClientY = oEv.clientY;
		}
		document.onmouseup =function(){
			this.onmousemove = null;
			this.onmouseup = null;
			move();
		}
		clearInterval(timer2);
	}
	 function move(){
	 	var leftDis,topDis;
		timer2 = setInterval(function(){
			if(Math.abs(xSpeed) < 1 ){
				xSpeed = 0;
			}
			if(Math.abs(ySpeed + 1) < 0.35 && Math.abs(oBall.offsetTop - bottomLimit) <1 && xSpeed ===0){
				clearInterval(timer2);
			}
			ySpeed += 3;/*just like the ball is on earth*/
			leftDis = oBall.offsetLeft + xSpeed;
			topDis = oBall.offsetTop + ySpeed;
			/*ensure if the ball contact the limit, if it's ,then speed lower and become another direction*/ 
			if(leftDis < leftLimit){
				leftDis = leftLimit;
				xSpeed *= -0.8;
			}else if(leftDis > rightLimit){
				leftDis = rightLimit;
				xSpeed *= -0.8;
			}
			if(topDis < topLimit){
				topDis = topLimit;
				ySpeed *= -0.8;
				xSpeed *= 0.9
			}else if(topDis > bottomLimit){
				topDis = bottomLimit;
				ySpeed *= -0.8;
				xSpeed *= 0.9
			}

			oBall.style.left = leftDis + 'px';
			oBall.style.top = topDis + 'px';
		},30);
	}
})
EventUtil(window,'load',function(){
	
})