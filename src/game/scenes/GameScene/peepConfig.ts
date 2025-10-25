export type PeepConfig = {
  name: string;
  stopImage: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  traverseTime: number;
  orientation: boolean;
  sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;
  tween: Phaser.Tweens.Tween | null;
  mode: number;
};

export const coll: Array<PeepConfig> = [
  {
    name: "green",
    stopImage: 24,
    startX: 0,
    startY: 0,
    endX: 15,
    endY: 0,
    traverseTime: 4000,
    orientation: true,
    sprite: null,
    tween: null,
    mode: 0,
  },
  {
    name: "red",
    stopImage: 105,
    startX: 6,
    startY: 24,
    endX: 24,
    endY: 24,
    traverseTime: 8000,
    orientation: true,
    sprite: null,
    tween: null,
    mode: 0,
  },
  {
    name: "brown-green",
    stopImage: 186,
    startX: 24,
    startY: 12,
    endX: 24,
    endY: 18,
    traverseTime: 3000,
    orientation: false,
    sprite: null,
    tween: null,
    mode: 0,
  },
  {
    name: "blue",
    stopImage: 267,
    startX: 6,
    startY: 8,
    endX: 6,
    endY: 22,
    traverseTime: 6000,
    orientation: false,
    sprite: null,
    tween: null,
    mode: 0,
  },
  {
    name: "gray",
    stopImage: 348,
    startX: 10,
    startY: 6,
    endX: 22,
    endY: 6,
    traverseTime: 5000,
    orientation: true,
    sprite: null,
    tween: null,
    mode: 0,
  },
  {
    name: "brown",
    stopImage: 429,
    startX: 5,
    startY: 28,
    endX: 26,
    endY: 28,
    traverseTime: 6500,
    orientation: true,
    sprite: null,
    tween: null,
    mode: 0,
  },
];
