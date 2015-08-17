//人物角色 显示 行走
var Sprite = cc.Layer.extend({
	location: null,
	name: null,
	sex: null,
	pid: null,
	sprite: null,
	moving: false,
	ctor: function(_sex) {
		this._super();
		this.sprite = cc.Sprite.createWithSpriteFrame(GetSpriteAnimation(_sex, direction.DOWN, false));
		this.sprite.setPosition(200, 200);
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
		if (!this.moving) {
			this.sprite.runAction(GetSpriteAnimation(this.sex, _direction, true));
			this.moving = true;
		}
	},
	onStopMove: function(_direction) {
		if (this.moving) {
			this.sprite.stopAllActions();
			this.moving = false;

		}
	}
});