class Cannon{
    constructor(x,y,width,height,angle){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.angle=angle;
        this.timg = loadImage('assets/canon.png');
        this.bimg = loadImage('assets/cannonBase.png');
    }
    display(){
        //controle do cannon
        if(keyIsDown(RIGHT_ARROW) && this.angle<70){ this.angle+=1; }
        if(keyIsDown(LEFT_ARROW) && this.angle>-30){ this.angle-=1; }
        //codigo para criar top cannon
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.timg,0,0,this.width,this.height);
        pop();    

        //codigo para criar botton cannon
        image(this.bimg,70,20,200,200);
        noFill();
    }
}