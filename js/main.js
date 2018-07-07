var a=5;
var time=0;
var min=0,sec=0,msec=0;
var zmin="0",zsec="0",zmsec="0";
var dp=":";
var mode="chrono",run=0,work=0;
var input;
var list=new Array(100);
var laps=0;
var first=1,last=5;
var d=0;
//time mode / Chronometer mode

reset();


function affiche()
{
	//document.getElementById("output").innerHTML=(time);
	$(document).ready(function(){
		$("#output").html(zmin+min+dp+zsec+sec+dp+zmsec+msec);
	});

}

function test()
{
	if(time<0){reset();}
	min=Math.trunc(time/6000);
	sec=Math.trunc((time%6000)/100);
	msec=(time%6000)%100; //msec = 10 real msec
	
	if(min>9)
	{zmin="";}
	else{zmin="0";}

	if(sec>9)
	{zsec="";}
	else{zsec="0";}	

	if(msec>9)
	{zmsec="";}
	else{zmsec="0";}
}


function count()
{
	if(run&&work&&(mode=="chrono"))
	{
		time++;
		test();
		affiche();
	}
	else if(run&&work&&(mode=="timer"))
	{
		time--;
		test();
		affiche();
		$(document).ready(function()
		{
			$("#blanck").css("width", ((1- time/(input*100))*100+"%"));
		});
	}	

	

}

function start()
{
	if(!work)
	{
		run=1;
		work=1;
		$(document).ready(function(){
			$("#stop_resume_button").html("stop");
		});	
	}
}

function reset()
{
	run=0;
	work=0;
	time=0;
	test();
	affiche();
	$(document).ready(function(){
		$("#stop_resume_button").html("stop/resume");
	});
	for(d=1; d<100; d++)
	{
		list[d]="00:00:00";
	}
	affichelaps(1,5);

}

function stopresume()
{
	if(run)
	{
		run=0;
		$(document).ready(function(){
			$("#stop_resume_button").html("resume");
		});
	}
	else
	{
		run=1;
		$(document).ready(function(){
			$("#stop_resume_button").html("stop");
		});		
	}
}

function switchmode()
{	

	if(mode=="chrono")
	{	


		input=prompt("set timer(seconds)");
		if(Number(input)!="NaN")
		{
			time=input*100;
			mode="timer";
			test();
			affiche();
			$(document).ready(function(){
				$("#mode_button").html("chrono");
				$("#blanck").css("background-color","#333333");
				$("#blanck").css("width","0%");
				$("#blanck").css("opacity","1");
			});
		
		}
		
		
	}
	else if(mode=="timer")
	{
		mode="chrono";
		$(document).ready(function(){
			$("#mode_button").html("timer");
			$("#blanck").css("background-color","white");
			$("#blanck").css("width","100%");
		});
	}
}

function affichelaps(a,b)
{	
	first=a;
	last=b;
	var i,j=1;
	for(i=a; i<=b; i++)
	{
		document.getElementById("lap"+j).innerHTML=(i+". ")+list[i];
		j++;
	}
}

function lapit()
{
	if(laps<95)
	{
	laps++;
	list[laps]=document.getElementById("output").innerHTML;
	affichelaps(laps,laps+4);	
	}
}

function godown()
{
	if(last<99)
	{
	first++;
	last++;
	affichelaps(first,last);		
	}
}

function goup()
{
	if(first>1)
	{
	first--;
	last--;
	affichelaps(first,last);		
	}
}

setInterval(count,10);

for(d=1; d<100; d++)
{
	list[d]="00:00:00";
}