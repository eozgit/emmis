const offset = 23;
const colours = ["green", "red", "brown-green", "blue", "gray", "brown"];
const dirs = ["left", "down", "up", "right"];

export default function (anims: Phaser.Animations.AnimationManager) {
  colours.forEach(function (colour, i) {
    dirs.forEach(function (dir, j) {
      const frame = offset + j;
      const frames = [...Array(3).keys()]
        .map((k) => k * 27 + frame)
        .map((l) => l + i * 3 * 27);
      const key = `peep-${colour}-walk-${dir}`
      anims.create({
        key,
        frames: anims.generateFrameNumbers("coolspot", {
          frames,
        }),
        frameRate: 8,
        repeat: -1,
      });
    });
  });
}
