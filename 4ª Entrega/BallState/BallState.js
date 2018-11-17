class BallState{
    constructor(ball,speed,position){
        this.ball=ball;
        this.speed=speed;
        this.position=position
    }

    updateBall(delta){
        this.position += this.speed;
        this.position %= 2*Math.PI;
        this.ball.position.x=10*Math.cos(this.position)
        this.ball.position.z=10*Math.sin(this.position)
    }
    moveBall(delta){}

    stopBall(){}

    startBall(){}
}
