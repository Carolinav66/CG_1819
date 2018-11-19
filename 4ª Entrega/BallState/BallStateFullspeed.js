class BallStateFullspeed extends BallState{
    constructor(ball,speed,position){
        super(ball,speed,position);
    }

    moveBall(delta){
        this.updateBall(delta);
        this.speed=2.5;
    }

    changeMovement(){
        this.ball.setState(new BallStateDecelerating(this.ball,this.speed,this.position));
    }

}
