class GameOver {
    private _view:fairygui.GComponent;
    constructor(){
        this._view = fairygui.UIPackage.createObject("test","GameOverUI").asCom;
        //this._view.setSize(fairygui.GRoot.inst.width,fairygui.GRoot.inst.height);
        //this._view.getChild("ReStart").setXY(150,700);
        this._view.getChild("BackHome").asButton.on(Laya.Event.CLICK, this, this.reHome);
        this._view.getChild("ReStart").asButton.on(Laya.Event.CLICK,this,this.reGame);
    }
    addView(){
        fairygui.GRoot.inst.addChild(this._view);
    }
    //重新开始游戏
    reGame(){
        fairygui.GRoot.inst.removeChildren();
        if(GameMain.mainPanel){
            GameMain.mainPanel = new MainPanel();
        }
        GameMain.mainPanel.addView();
        GameMain.mainPanel.startGame();
    }
    reHome(){
        fairygui.GRoot.inst.removeChildren();
        if(GameMain.gameStart){
            GameMain.gameStart = new GameStart();
        }
        GameMain.gameStart.addView();
    }
}