class SnakeBody extends Laya.Sprite {

    public preBody:SnakeBody;
    public dir:number;
    public preX:number;
    public preY:number;
    public index:number;

    constructor(idx:number) {
        super();
        this.preBody = null;
        this.graphics.drawRect(0,0, Utils.BODY_SIZE, Utils.BODY_SIZE, "00ff33");
        
        this.index = idx;
        let text = new Laya.Label();
        text.fontSize = Utils.BODY_SIZE - 5;
        text.text = "" + idx;
        this.addChild(text);
    }

    public setPrebody(pre:SnakeBody) {
        this.preBody = pre;
        if (pre != null) {
            switch(pre.dir) {
                case MoveDir.LEFT:
                    this.x = pre.x + Utils.BODY_SIZE;
                    this.y = pre.y;
                    this.dir = pre.dir;
                    break;

                case MoveDir.RIGHT:
                    this.x = pre.x - Utils.BODY_SIZE;
                    this.y = pre.y;
                    this.dir = pre.dir;
                    break;
                
                case MoveDir.DOWN:
                    this.x = pre.x;
                    this.y = pre.y - Utils.BODY_SIZE;
                    this.dir = pre.dir;
                    break;
                
                case MoveDir.UP:
                    this.x = pre.x;
                    this.y = pre.y + Utils.BODY_SIZE;
                    this.dir = pre.dir;
                    break;
            }

            this.preX = this.x;
            this.preY = this.y;
            this.Move(pre.dir);
        }
    }

    public Move(dir:number =  MoveDir.UP):boolean {
        // 部位判断

        // 移动头部
        if (this.preBody == null) {
            switch (dir) {
                case MoveDir.LEFT:{
                    if(this.x > 0) {
                        this.setPosX(-Utils.BODY_SIZE);
                        return true;
                    }
                    break;
                }

                case MoveDir.RIGHT: {
                    if (this.x < Laya.stage.width - Utils.BODY_SIZE) {
                        this.setPosX(Utils.BODY_SIZE);
                        return true;
                    }
                    
                    break;
                }
                case MoveDir.UP: {
                    if(this.y > 0) {
                        this.setPosY(-Utils.BODY_SIZE);
                        return true;
                    }
                    break;
                }
                case MoveDir.DOWN: {
                    if (this.y < Laya.stage.height - Utils.BODY_SIZE) {
                        this.setPosY(Utils.BODY_SIZE);
                        return true;
                    }
                    
                    break;
                }
            }
        }

        // 移动身体
        else {
            if (this.preBody.preX - this.x != 0) {
                this.setPosX(this.preBody.preX - this.x);
            } else if (this.preBody.preY - this.y != 0)  {
                this.setPosY(this.preBody.preY - this.y);
            }
            return true;
        }

        return false;
    }

    public setPosX(deltaX:number):void {
        this.preX = this.x;
        this.preY = this.y;
        this.x += deltaX;

        if (deltaX > 0)
            this.dir = MoveDir.RIGHT;
        else
            this.dir = MoveDir.LEFT;
    }

    public setPosY(deltaY:number):void {
        this.preX = this.x;
        this.preY = this.y;
        this.y += deltaY;

        if (deltaY > 0)
            this.dir = MoveDir.DOWN;
        else
            this.dir = MoveDir.UP;
    }
}