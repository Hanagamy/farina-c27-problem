class Boat{
    constructor(x,y,width,height,boatpos,boatAnimation){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.boatposition = boatpos;
        this.body = Bodies.rectangle(x,y,width,height);
        this.image = loadImage("assets/boat.png");
        this.animation = boatAnimation;
        World.add(world,this.body);
    }
    animate(){
        this.speed+=0.05;
    }
    remove(index){
        setTimeout(()=>{
            Matter.World.remove(world,boats[index].body);
            delete boats[index];
        },1500);
    }
    display(){
        //obter angulo
        var angle = this.body.angle;
        //
        var index = floor(this.speed %this.animation.length)
        //obter posiçao
        var pos = this.body.position;
        //chamar push para salvar configs
        push();
        //chamar funçao de translaçao
        translate(pos.x,pos.y);
        //chamar funçao de rotaçao
        rotate(angle);
        //definir mode de imagem
        imageMode(CENTER);
        //desenhar imagem
        image(this.animation[index],0,this.boatposition,this.width,this.height);
        //chame o pop para redefinir estilos
        pop();
    }
}