import WebGL = Laya.WebGL;
import Loader = laya.net.Loader;
import Handler = laya.utils.Handler;
import Events = Laya.Event;
import Point = Laya.Point;
// 程序入口
class GameMain{
    public static mainPanel:MainPanel = null;
    public static gameStart:GameStart;
    public static gameOver:GameOver = null;
    constructor()
    {
        Laya.init(800,1400, WebGL);
        laya.utils.Stat.show(0,0);
        //设置适配模式
        Laya.stage.scaleMode = "showall";
        Laya.stage.alignH = "center";
        Laya.stage.alignV = "center";
        //设置横竖屏
        Laya.stage.screenMode = "vertical";
        fairygui.UIConfig.packageFileExtension = "xml";

        Laya.loader.load([{ url: "res/test_atlas0.png", type: Loader.IMAGE },
            { url: "res/test.xml", type: Loader.BUFFER }
        ], Handler.create(this, this.onLoaded));
    }


    onLoaded(res): void {
        console.log(res);
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        fairygui.GRoot.inst.displayObject.zOrder = 1000;

        fairygui.UIPackage.addPackage("res/test");
        GameMain.gameStart = new GameStart();
        GameMain.gameStart.addView();
    }
}

new GameMain();