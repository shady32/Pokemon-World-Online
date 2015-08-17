var map_zt = "Maps/zt.tmx";
var map_zt_res = "Maps/zt.png";
var sprite_Man = "Sprites/SpriteMan.png";

var g_resources = [
	//image

	map_zt_res,
	sprite_Man,
	//plist

	//fnt

	//tmx

	map_zt

	//bgm

	//effect
];
var direction = {
	"UP": 0,
	"RIGHT": 1,
	"DOWN": 2,
	"LEFT": 3
};

function GetSpriteAnimation(_sprite, _direction, _move) {
	var texture = cc.textureCache.addImage(_sprite);
	var frames1 = cc.SpriteFrame.createWithTexture(texture, cc.rect(30 * 0, 44 * _direction, 30, 44));
	var frames2 = cc.SpriteFrame.createWithTexture(texture, cc.rect(30 * 1, 44 * _direction, 30, 44));
	var frames3 = cc.SpriteFrame.createWithTexture(texture, cc.rect(30 * 2, 44 * _direction, 30, 44));
	var animFrames = [];
	animFrames.push(frames1);
	animFrames.push(frames2);
	animFrames.push(frames3);
	animFrames.push(frames2);
	var animation = cc.Animation.create(animFrames, 0.5);
	return _move ? cc.animate(animation).repeatForever() : frames2;
}