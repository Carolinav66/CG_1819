class BallStateFullspeed extends BallState{
    constructor(ball,speed,position){
        super(ball,speed,position);
    }

    moveBall(delta){
        this.updateBall(delta);
        this.speed=0.1
    }

    stopBall(){
        this.ball.setState(new BallStateDecelerating(this.ball,this.speed,this.position));
    }

    startBall(){}
}
