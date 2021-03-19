var jahr = {
            "1":{"id":1,"name":"fruehling","bild":["bluete.png"],"falling":false},
            "2":{"id":2,"name":"sommer","bild":["kirschen.png"],"falling":false},
            "3":{"id":3,"name":"herbst","bild":["laub_1.png","laub_2.png","laub_3.png","laub_4.png"],"falling":true},
            "4":{"id":4,"name":"winter","bild":["flocke.png"],"falling":true}
            };

var icon_nr = 1;

var image = new Image;
//setJahr(icon_nr);

var canvas = document.createElement("canvas");

var ctx = canvas.getContext("2d");
canvas.style.position = "absolute";
canvas.style.top = "0px";
canvas.style.left = "0px";
document.body.appendChild(canvas);
var w,h;
function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight;}
resize();
window.addEventListener("resize",resize);
function rand(min,max){return Math.random() * (max ?(max-min) : min) + (max ? min : 0) }
function DO(count,callback){ while (count--) { callback(count) } }
var sprites = [];

writeSprites(icon_nr);

canvas.addEventListener('click', function() {
    if(icon_nr < 4) {
        icon_nr++;
    }
    else {
        icon_nr = 1;  
    }
    //setJahr(icon_nr);
    writeSprites(icon_nr);
}, false);
/*
function setJahr(id) {
    falling = jahr[id].falling;
    image.src = jahr[id].bild[0];
}
*/

function writeSprites(id) {
    falling = jahr[id].falling;
    var image_id = 0;
    sprites = [];
    DO(20,()=>{
        image.src = jahr[id].bild[image_id];
        if(falling) {
            dx = rand(-1,1);
            dy = rand(0.5,1.5); 
        }
        else {
            dx = rand(-0.5,0.5);
            dy = rand(-0.5,0.5);
        }
        sprites.push({
           x : rand(w), 
           y : rand(h),
           xr : 0, yr : 0, // actual position of sprite
           r : rand(Math.PI * 2),
           scale : rand(0.25,0.5),
           dx : dx, dy : dy,
           dr : rand(-0.01,0.01),
        });
    });
}

function drawImage(image, spr){
    ctx.setTransform(spr.scale, 0, 0, spr.scale, spr.xr, spr.yr); // sets scales and origin
    ctx.rotate(spr.r);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
}
function update(){
    var ihM,iwM;
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,w,h);
    if(image.complete){
      var iw = image.width;
      var ih = image.height;
      for(var i = 0; i < sprites.length; i ++){
          var spr = sprites[i];
          spr.x += spr.dx;
          spr.y += spr.dy;
          spr.r += spr.dr;
          iwM = iw * spr.scale * 2 + w;
          ihM = ih * spr.scale * 2 + h;
          spr.xr = ((spr.x % iwM) + iwM) % iwM - iw * spr.scale;
          spr.yr = ((spr.y % ihM) + ihM) % ihM - ih * spr.scale;
          drawImage(image,spr);
      }
    }    
    requestAnimationFrame(update);
}
requestAnimationFrame(update);