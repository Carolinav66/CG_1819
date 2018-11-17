class BallStateStopped extends BallState{
    constructor(ball,speed,position){
        super(ball,speed,position);
    }

    moveBall(delta){
        this.speed=0;
    }

    stopBall(){}

    startBall(){
        this.ball.setState(new BallStateAccelerating(this.ball,this.speed,this.position));
    }
}
