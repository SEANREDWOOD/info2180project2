"use strict";
var sec;
var bspac;
var aspac;

window.onload = function ()
{
	var puzzlearea = document.getElementById('puzzlearea');
	
	sec = puzzlearea.getElementsByTagName('div');

	for (var i=0; i<sec.length; i++)
	{
		sec[i].style.backgroundImage="url('background.jpg')"
		sec[i].className = 'puzzlepiece';
		sec[i].style.left = (i%4*100)+'px';
		sec[i].style.top = (parseInt(i/4)*100) + 'px';
		sec[i].style.backgroundPosition= '-' + sec[i].style.left + ' ' + '-' + sec[i].style.top;
		sec[i].onmouseover = function()
		{
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		};
		sec[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};

		sec[i].onclick = function()
		{
			if (checkCanMove(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
				{
					youWin();
				}
				return;
			}
		};
	}

	aspac = '300px';
	bspac = '300px';

	var shufflebutton = document.getElementById('shufflebutton');
	shufflebutton.onclick = function()
	{

		for (var i=0; i<250; i++)
		{
			var rdm = parseInt(Math.random()* 100) %4;
			if (rdm == 0)
			{
				var tm = calcUp(aspac, bspac);
				if ( tm != -1)
				{
					swap(tm);
				}
			}
			if (rdm == 1)
			{
				var tm = calcDown(aspac, bspac);
				if ( tm != -1) 
				{
					swap(tm);
				}
			}

			if (rdm == 2)
			{
				var tm = calcLeft(aspac, bspac);
				if ( tm != -1)
				{
					swap(tm);
				}
			}

			if (rdm == 3)
			{
				var tm = calcRight(aspac, bspac);
				if (tm != -1)
				{
					swap(tm);
				}
			}
		}
	};
};

function checkCanMove(pos)
{
	if (calcLeft(aspac, bspac) == (pos-1))
	{
		return true;
	}

	if (calcDown(aspac, bspac) == (pos-1))
	{
		return true;
	}

	if (calcUp(aspac, bspac) == (pos-1))
	{
		return true;
	}

	if (calcRight(aspac, bspac) == (pos-1))
	{
		return true;
	}
}


function youWin()
{
	alert('Y O U  W O N !');
}

function checkFinish()
{
	var flg = true;
	for (var i = 0; i < sec.length; i++) {
		var y = parseInt(sec[i].style.top);
		var x = parseInt(sec[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			flg = false;
			break;
		}
	}
	return flg;
}

function calcLeft(x, y)
{
	var a = parseInt(x);
	var b = parseInt(y);

	if (a > 0)
	{
		for (var i = 0; i < sec.length; i++) 
		{
			if (parseInt(sec[i].style.left) + 100 == a && parseInt(sec[i].style.top) == b)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}

function calcRight (x, y) {
	var a = parseInt(x);
	var b = parseInt(y);
	if (a < 300)
	{
		for (var i =0; i<sec.length; i++){
			if (parseInt(sec[i].style.left) - 100 == a && parseInt(sec[i].style.top) == b) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function calcUp (x, y) {
	var a = parseInt(x);
	var b = parseInt(y);
	if (b > 0)
	{
		for (var i=0; i<sec.length; i++)
		{
			if (parseInt(sec[i].style.top) + 100 == b && parseInt(sec[i].style.left) == a) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}

function calcDown (x, y)
{
	var a = parseInt(x);
	var b = parseInt(y);
	if (b < 300)
	{
		for (var i=0; i<sec.length; i++)
		{
			if (parseInt(sec[i].style.top) - 100 == b && parseInt(sec[i].style.left) == a) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function swap (pos) {
	var tmp = sec[pos].style.top;
	sec[pos].style.top = bspac;
	bspac = tmp;

	tmp = sec[pos].style.left;
	sec[pos].style.left = aspac;
	aspac = tmp;
}