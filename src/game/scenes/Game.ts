import { Scene } from "phaser";
import createAnims from "./GameScene/createAnims";
import { coll } from "./GameScene/peepConfig";

export class Game extends Scene {
  tileIndex2DArray: Array<Array<boolean>>;
  pathCoords: Array<Array<number>>;
  peepColl = coll;
  constructor() {
    super("Game");
  }

  preload() {
    this.load.image("tiles", "assets/tilemap.png");

    this.load.tilemapTiledJSON("map", "assets/inaugural.json");

    this.load.spritesheet("coolspot", "assets/tilemap.png", {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1,
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("kenneytm", "tiles");
    if (!tileset) throw 'null tileset'

    const groundlayer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    if (!groundlayer) throw 'null groundlayer'

    const wallslayer = map.createLayer("Tile Layer 2", tileset, 0, 0);
    if (!wallslayer) throw 'null wallslayer'

    wallslayer.setCollisionByProperty({ collides: true });

    const tiles = map.getTilesWithin(
      0,
      0,
      map.width,
      map.height,
      undefined,
      groundlayer,
    );
    if (!tiles) throw 'null tiles'

    createAnims(this.anims);

    coll.forEach((pd) => {
      pd.startX = map.tileToWorldX(pd.startX) || 0;
      pd.startY = map.tileToWorldY(pd.startY) || 0;
      pd.endX = map.tileToWorldX(pd.endX) || 0;
      pd.endY = map.tileToWorldY(pd.endY) || 0;
      pd.sprite = this.physics.add.sprite(pd.startX, pd.startY, "coolspot", pd.stopImage);
      if (!pd.sprite) throw 'null sprite'
      pd.sprite.setOrigin(0.5, 0.5);
      pd.sprite.setCollideWorldBounds(true);
      const sp = pd.sprite
      pd.tween = this.tweens.add({
        targets: sp,
        x: pd.endX,
        y: pd.endY,
        duration: pd.traverseTime,
        onStart: function () {
          sp.play(`peep-${pd.name}-walk-${pd.orientation ? 'right' : 'down'}`, true);
        },
        onComplete: function () {
          sp.stop();
          sp.setFrame(pd.stopImage);
          pd.mode = 1;
        },
      });
    });

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    coll.forEach((pi) => {
      if (!pi.sprite) throw 'null sprite'
      if (!pi.tween) throw 'null tween'
      const sp = pi.sprite

      let x = pi.endX;
      let y = pi.endY;
      let orientation = pi.orientation ? 'right' : 'down';
      let mode = 1;

      if (pi.mode == 1) {
        x = pi.startX;
        y = pi.startY;
        orientation = pi.orientation ? 'left' : 'up';
        mode = 0;
      }

      if (pi.tween.state == Phaser.Tweens.States.DESTROYED) {
        pi.tween = this.tweens.add({
          targets: sp,
          x,
          y,
          duration: pi.traverseTime,
          delay: 1000,
          onStart: function () {
            sp.play(`peep-${pi.name}-walk-${orientation}`, true);
          },
          onComplete: function () {
            sp.stop();
            sp.setFrame(pi.stopImage);
            pi.mode = mode;
          },
        });
      }
    });
  }
}
