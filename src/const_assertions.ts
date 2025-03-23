const directions = ["up", "down", "left", "right"] as const;

type Directions = (typeof directions)[number];

/**
 * Description placeholder
 *
 * @param {Directions} direction
 */
const move = (direction: Directions) => {
  console.log(`move ${direction}`);
};

export { directions, move };
