class GameStart{
    private _view:fairygui.GComponent;
    constructor(){
        this._view = fairygui.UIPackage.createObject("test","MainUI").asCom;
        this._view.getChild("startBtn").asButton.on(Laya.Event.CLICK,this,this.startGame);
    }
    //加载界面
    addView():void{
        fairygui.GRoot.inst.addChild(this._view);
    }
    //开始游戏
    startGame():void{
        fairygui.GRoot.inst.removeChildren();
        GameMain.mainPanel = new MainPanel();

        GameMain.mainPanel.addView();
        GameMain.mainPanel.startGame();
    }
}