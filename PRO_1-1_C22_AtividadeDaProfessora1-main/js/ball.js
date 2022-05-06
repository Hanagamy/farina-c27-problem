class Ball{
    constructor(x,y){
        var options = {
            isStatic:true
        }
        this.x = x;
        this.y = y;
        this.r = 30;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("assets/cannonball.png");
        //this.poofimage = loadImage("assets/cannonball.png");
        this.trajectory = []
        World.add(world,this.body);
    }
    remove(index){
        Matter.Body.setVelocity(this.body,{x:0,y:0});
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete balls[index];
        },1000);
    }
    //atirar(definir angulo)
    shoot(){
        var newAngle = cannon.angle-28;
        newAngle = newAngle*(3.14/180);

        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x:velocity.x*(180/3.14),
            y:velocity.y*(180/3.14)
        });
    }
    display(){
        var pos = this.body.position;
        push()
        imageMode(CENTER);
        image(this.image,pos.x,pos.y,this.r,this.r);
        pop();
        //obter a posiçao da bala e colocar ta matriz "trajectory"
        if(this.body.velocity.x>0&&this.body.position.x>300){
            //crair uma matriz de posiçao e guardar posiçoes dentro dela
            var position = [this.body.position.x,this.body.position.y];
            this.trajectory.push(position);
        }
        for(var i=0; i<this.trajectory.length; i++){
            image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5);
        }
    }    
}