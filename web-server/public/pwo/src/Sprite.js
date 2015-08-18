//人物角色 显示 行走
var Sprite = cc.Layer.extend({
	location: null,
	name: null,
	sex: null,
	pid: null,
	sprite: null,
	moving: false,
	point: null,
	ctor: function(_sex) {
		this._super();
		this.sprite = cc.Sprite.createWithSpriteFrame(GetSpriteAnimation(_sex, direction.DOWN, null, false));
		this.sprite.setPosition(200, 200);
		this.point = cc.p(200, 200);
		this.addChild(this.sprite);
		this.sex = _sex;
		MainSprite = this;

		if ('keyboard' in cc.sys.capabilities) {
			cc.eventManager.addListener({
				event: cc.EventListener.KEYBOARD,
				onKeyPressed: function(key, event) {
					switch (key) {
						case cc.KEY.left:
							MainSprite.onMove(direction.LEFT);
							break;
						case cc.KEY.up:
							MainSprite.onMove(direction.UP);
							break;
						case cc.KEY.right:
							MainSprite.onMove(direction.RIGHT);
							break;
						case cc.KEY.down:
							MainSprite.onMove(direction.DOWN);
							break;
					}
				},
				onKeyReleased: function(key, event) {
					switch (key) {
						case cc.KEY.left:
							MainSprite.onStopMove(direction.LEFT);
							break;
						case cc.KEY.up:
							MainSprite.onStopMove(direction.UP);
							break;
						case cc.KEY.right:
							MainSprite.onStopMove(direction.RIGHT);
							break;
						case cc.KEY.down:
							MainSprite.onStopMove(direction.DOWN);
							break;
					}
				}
			}, this);
		} else {
			cc.log("KEYBOARD Not supported");
		}
	},
	onMove: function(_direction) {
		switch (_direction) {
			case direction.DOWN:
				this.point.y -= 2;
				break;
			case direction.UP:
				this.point.y += 2;
				break;
			case direction.LEFT:
				this.point.x -= 2;
				break;
			case direction.RIGHT:
				this.point.x += 2;
				break;
		}
		var act = cc.moveTo(0.0001, this.point);
		this.sprite.runAction(act);
		if (!this.moving) {
			this.sprite.runAction(GetSpriteAnimation(this.sex, _direction, null, true));
			this.moving = true;
		}
	},
	onStopMove: function(_direction) {
		if (this.moving) {
			var nextframe = this.sprite.actionManager._arrayTargets[0].actions[0]._nextFrame;
			this.sprite.stopAllActions();
			this.sprite.runAction(GetSpriteAnimation(this.sex, _direction, nextframe, true));
			this.moving = false;
		}
	}
});


var direction = {
	"UP": 0,
	"RIGHT": 1,
	"DOWN": 2,
	"LEFT": 3
};

function GetSpriteAnimation(_sprite, _direction, _start, _move) {
	var texture = cc.textureCache.addImage(_sprite);
	var frames1 = cc.SpriteFrame.createWithTexture(texture, cc.rect(30 * 0, 44 * _direction, 30, 44));
	var frames2 = cc.SpriteFrame.createWithTexture(texture, cc.rect(30 * 1, 44 * _direction, 30, 44));
	var frames3 = cc.SpriteFrame.createWithTexture(texture, cc.rect(30 * 2, 44 * _direction, 30, 44));
	if (!_move) {
		return frames2;
	}
	var animFrames = [];
	var animation;
	var animate;
	var animateTime = 0.1;
	switch (_start) {
		case 1:
			animFrames.push(frames1);
			animFrames.push(frames2);
			break;
		case 2:
			break;
		case 3:
			animFrames.push(frames3);
			animFrames.push(frames2);
			break;
		case 4:
			break;
		default:
			animFrames.push(frames1);
			animFrames.push(frames2);
			animFrames.push(frames3);
			animFrames.push(frames2);
			animateTime = 0.3
			break;
	}
	animation = cc.Animation.create(animFrames, animateTime);
	animate = _start == null ? cc.animate(animation).repeatForever() : cc.animate(animation).repeat(1);
	return animate;
}