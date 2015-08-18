
var MapLayer = cc.Layer.extend({
	map: null,
	sprite:null,
	ctor: function(_mapsource) {
		this._super();
		var size = cc.director.getWinSize();
		this.map = cc.TMXTiledMap.create(_mapsource);

		this.addChild(this.map, 0);
		
		this.sprite=new Sprite(sprite_Man);
		this.addChild(this.sprite,1);
	}
});

var GameScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new MapLayer(map_zt);
		this.addChild(layer);
		layer.init();
	}
});