class BallStateDecelerating extends BallState{
    constructor(ball,speed,position){
        super(ball,speed,position);
    }

    moveBall(delta){
        this.updateBall(delta);
        this.speed-=delta * 1;
        if (this.speed<0){
            this.ball.setState(new BallStateStopped(this.ball,this.speed,this.position));
        }
    }

    changeMovement(){
        this.ball.setState(new BallStateAccelerating(this.ball,this.speed,this.position));
    }
}
