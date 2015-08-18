cc.game.onStart = function() {
	if (!cc.sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
		document.body.removeChild(document.getElementById("cocosLoading"));

	var screenSize = cc.view.getFrameSize();
	cc.loader.resPath = "res";
	cc.view.resizeWithBrowserSize(true);
	cc.view.setDesignResolutionSize(800, 600, cc.ResolutionPolicy.SHOW_ALL);

	//load resources
	cc.LoaderScene.preload(g_resources, function() {
		cc.director.runScene(new GameScene());
	}, this);
};
cc.game.run();