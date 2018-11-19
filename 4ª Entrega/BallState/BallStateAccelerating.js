class BallStateAccelerating extends BallState{
    constructor(ball,speed,position){
        super(ball,speed,position);
    }

    moveBall(delta){
        this.updateBall(delta);
        this.speed+=delta*1;
        if (this.speed>=2.5){
            this.ball.setState(new BallStateFullspeed(this.ball,this.speed,this.position));
        }
    }

    changeMovement(){
        this.ball.setState(new BallStateDecelerating(this.ball,this.speed,this.position));
    }
}
