let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let boardBounds=board.getBoundingClientRect();
let x=true;
let y=true;
let leftPaddle=document.querySelector(".left");
let rightPaddle=document.querySelector(".right");
let leftPlayerLife=3;
let rightPlayerLife=3;

//user inputlisten

document.addEventListener("keydown",function(e){
  
    if(e.key=="w"){
       movePaddle(leftPaddle,-window.innerHeight*0.1);
    }
    else if(e.key=="s"){
        movePaddle(leftPaddle,window.innerHeight*0.1)
    }
    else if(e.key=="ArrowUp"){
        movePaddle(rightPaddle,-window.innerHeight*0.1)
    }
    else if(e.key=="ArrowDown"){
        movePaddle(rightPaddle,window.innerHeight*0.1)
    }
})

function setColor(idx){
   let allicons= document.querySelectorAll(".fas.fa-circle");
    allicons[idx].style.color="#686de0";
}

function movePaddle(cPaddle,change){
  let cPaddleBounds=cPaddle.getBoundingClientRect();
  if(cPaddleBounds.top+change>=boardBounds.top && cPaddleBounds.bottom+change<=boardBounds.bottom){
      
    cPaddle.style.top=cPaddleBounds.top+change+"px";
  }
}

function moveBall(){
   let ballcord=ball.getBoundingClientRect();
   let ballTop=ballcord.top;
   let ballLeft=ballcord.left;
   let ballBottom=ballcord.bottom;
   let ballRight=ballcord.right;
   let leftPaddleBounds=leftPaddle.getBoundingClientRect();
   let rightPaddleBounds=rightPaddle.getBoundingClientRect();

  //check if collided with any players horzontailly
  let hasTouchedLeft=ballLeft<boardBounds.left;
  let hasTouchedRight=ballRight>boardBounds.right;

if(hasTouchedLeft || hasTouchedRight){
  if(hasTouchedLeft){
    leftPlayerLife--;
    setColor(leftPlayerLife);
      if(leftPlayerLife==0){
        alert("Game Over Player B Won!!💰")
        document.location.reload();
      }
      else{
        return resetGame();
    }
  }else{
    rightPlayerLife--;
    setColor(3+rightPlayerLife);
    if(rightPlayerLife==0){
      alert("Game Over Player A Won!!💰")
      document.location.reload();
    }else{
      return resetGame();
    }
  }
}

if(ballTop<=boardBounds.top|| ballBottom>=boardBounds.bottom){
  y=!y;
}

if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop>=leftPaddleBounds.top-15 && ballBottom<=leftPaddleBounds.bottom+15){
    x=!x;
}

if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop-15>=rightPaddleBounds.top && ballBottom<=rightPaddleBounds.bottom+15){
    x=!x;
}

   ball.style.top= y == true?(ballTop-4)+"px": (ballTop+4)+"px";
   ball.style.left= x == true?(ballLeft-6)+"px": (ballLeft+6)+"px";

   requestAnimationFrame(moveBall);
};

function resetGame(){
  ball.style.top=window.innerHeight*0.45+"px";
  ball.style.left=window.innerHeight*0.45+"px";
  requestAnimationFrame(moveBall);
}

requestAnimationFrame(moveBall);