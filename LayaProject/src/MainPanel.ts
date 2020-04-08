enum MoveDir {
    UP,
    DOWN,
    LEFT,
    RIGHT
}
enum MapPoint {
    FOOD,
    SNAKE,
    WALL,
    OBSTACLE
}
        
class MainPanel{
    private _view:fairygui.GComponent;
    private score:number = 0;
    private vx: number = 400;
    private vy: number = 1000;
    private px: number = 0;
    private py: number = 0;
    private keyDownList: Array<boolean>;
    private keyDir: number;
    private food: boolean = false;
    private body:SnakeBody[];
    private foodsp:fairygui.GGraph;

    private gridXNum:number;
    private gridYNum:number;
    private isRunning;
    private isPause;
    constructor()
    {
        this.body = [];

        this.gridXNum = Math.floor(Laya.stage.width / Utils.BODY_SIZE);
        this.gridYNum = Math.floor(Laya.stage.height / Utils.BODY_SIZE);

        this._view = fairygui.UIPackage.createObject("test","GameUI").asCom;
        this._view.setSize(fairygui.GRoot.inst.width,fairygui.GRoot.inst.height);
        this.foodsp = this._view.getChild("food").asGraph;
        this.foodsp.setSize(Utils.BODY_SIZE, Utils.BODY_SIZE);
        
        //处理事件
        //var hitCallBack:Laya.Handler = Laya.Handler.create(this,this.setScore,null,false);
        this.setup()
        this.init();
    }
    
    //初始化蛇头
    init(): void {
        let head = new SnakeBody(0);
        this.body.push(head);
        head.zOrder = 100;
        Laya.stage.addChild(head);
        head.x = this.vx;
        head.y = this.vy;
    }
    
    //显示游戏界面
    addView():void{
        fairygui.GRoot.inst.addChild(this._view);
        Laya.timer.loop(Utils.MOVE_SPEED, this, this.moveLoop);                    
    }

    //键盘监听
    private setup(): void {
        this.listenKeyboard();

    }
    
    //检测键盘按下
    private listenKeyboard() {
            this.keyDownList = [];

            //添加键盘按下事件,一直按着某按键则会不断触发
            Laya.stage.on(Events.KEY_DOWN, this, this.onKeyDown);
            //添加键盘抬起事件
            //Laya.stage.on(Events.KEY_UP, this, this.onKeyUp);
    }
    
    //移动循环，移动边界判断和头部判断
    moveLoop() {
        if (this.isPause)
            return;

        if (!this.isRunning)
            return;

        for(let i = 0; i < this.body.length; i++) {
     
            if (!this.body[i].Move(this.keyDir)) {
                this.gameOver();
                break;
            }
            if(i!=0 && this.body[i].x == this.body[0].x  && this.body[i].y == this.body[0].y) {
                this.gameOver();
             }

        }
        
        if (this.isRunning)
            this.checkEatfood();
    }
    /**键盘按下处理*/
    private onKeyDown(e: Events): void {
            let key = e.nativeEvent.key;
            var keyCode = e["keyCode"];
            switch (key) {
                case 'a':{
                    if (this.keyDir != MoveDir.RIGHT)
                        this.keyDir = MoveDir.LEFT;
                    break;
                }
                case 'd': {
                    if (this.keyDir != MoveDir.LEFT)
                        this.keyDir = MoveDir.RIGHT;
                    break;
                }
                case 'w': {
                    if (this.keyDir != MoveDir.DOWN)
                        this.keyDir = MoveDir.UP;
                    break;
                }
                case 's': {
                    if (this.keyDir != MoveDir.UP)
                        this.keyDir = MoveDir.DOWN;
                    break;
                }
                case 'Escape':
                    this.isPause = !this.isPause;
                    break;
            }
    
    }

    //开始游戏
    startGame():void{
        this.score = 0;
        this.isPause = false;
        this.isRunning = true;
    }
    


    //游戏结束
    gameOver():void{
        console.log("gemeover");
        for(let i = 0; i < this.body.length; i++) {
            Laya.stage.removeChild(this.body[i])
        }    
        GameMain.gameOver = new GameOver();
        GameMain.gameOver.addView();
        this.isRunning = false;
        
    }
    //食物随机数
    public getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; 
    }
    //食物生成
    private produceFood():void {
			// 最多一个食物同屏
            this.px = this.getRandomIntInclusive(0, this.gridXNum) * Utils.BODY_SIZE;
            this.py = this.getRandomIntInclusive(0, this.gridYNum) * Utils.BODY_SIZE;
            this.foodsp.setXY(this.px,this.py);
		}
    //吃到食物检测    
    private checkEatfood() {
        if (!this.food) {
            this.produceFood();
            this.food = true;
        }
        if(this.px == this.body[0].x  && this.py == this.body[0].y){
            this.food = false;
            this.setScore(1);
        }
    }
    //记录分数并且生成身体节点
    setScore(type:number):void{
        this.score += type;
        let subbody = new SnakeBody(this.body.length);
        subbody.setPrebody(this.body[this.body.length - 1]);
        subbody.zOrder = 100 + this.body.length;
        this.body.push(subbody);
        Laya.stage.addChild(subbody);
        this.updateScoreUI();
    }

    //刷新总分
    updateScoreUI():void{
        this._view.getChild("score").text = "得分："+this.score;
    }
    
}