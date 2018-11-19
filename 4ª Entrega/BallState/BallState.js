class BallState{
    constructor(ball,speed,position){
        this.ball=ball;
        this.speed=speed;
        this.position=position
    }

    updateBall(delta){
        this.position += this.speed*delta;
        this.position %= 2*Math.PI;
        this.ball.position.x=10*Math.cos(this.position);
        this.ball.position.z=10*Math.sin(this.position);
        this.ball.rotation.y=-this.position;
        this.ball.ballMesh.rotation.y=this.position;
        this.ball.ballMesh.rotation.x+=this.speed*delta*2*Math.PI;
    }
    moveBall(delta){}

    changeMovement(){}
}
