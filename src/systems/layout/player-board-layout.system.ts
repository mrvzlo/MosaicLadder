import GameWorld from "../../components/game-world";
import { updateHitbox } from "../../components/hitbox";
import { CIRCLE_R, INNER_GAP, PLAYER_BOARD_TOP, TILE_SIZE, WHOLE_BOARD_W } from "../../consts/sizes";
import { isMobile } from "./draw-board.system";

const lines = 5;
const HITBOX_GAP = INNER_GAP * 0.8;

export function SetPlayerLineHitboxes(world: GameWorld) {
  world.players.forEach((p, pi) => {
    const px = getPlayerBoardX(world, pi);
    const py = getPlayerBoardY(world, pi);
    const scale = getPlayerBoardScale(pi);
    const isMain = pi === world.currentPlayer;
    for (let i = 0; i < lines; i++)
      for (let j = lines - i - 1; j < lines; j++) {
        const key = `line:${pi}:${i}:${j}`;
        updateHitbox(world.hitboxes, key, {
          color: 0,
          x: px + (j * (TILE_SIZE + INNER_GAP) - HITBOX_GAP / 2) * scale,
          y: py + (i * (TILE_SIZE + INNER_GAP) - HITBOX_GAP / 2) * scale,
          w: (TILE_SIZE + HITBOX_GAP) * scale,
          h: (TILE_SIZE + HITBOX_GAP) * scale,
          source: "line",
          sourceId: i,
          playerIndex: pi,
          interactive: isMain,
          occupied: j >= lines - p.lineFilled[i],
        });
      }

    for (let i = 0; i < 7; i++) {
      const key = `penalty:${pi}:${i}`;
      updateHitbox(world.hitboxes, key, {
        color: 0,
        x: px + (i * (TILE_SIZE + INNER_GAP) - HITBOX_GAP / 2) * scale,
        y: py + (5 * (TILE_SIZE + INNER_GAP) + INNER_GAP) * scale,
        w: (TILE_SIZE + HITBOX_GAP) * scale,
        h: (TILE_SIZE + HITBOX_GAP) * scale,
        source: "line",
        sourceId: -1,
        playerIndex: pi,
        interactive: isMain,
        occupied: false,
      });
    }
  });
}

export function getPlayerBoardY(world: GameWorld, index: number) {
  if (index == 0) return PLAYER_BOARD_TOP;
  const h = TILE_SIZE * 6 + INNER_GAP * 6 + CIRCLE_R;
  let bottom = PLAYER_BOARD_TOP + h;
  return bottom;
}

export function getPlayerBoardX(world: GameWorld, index: number) {
  if (index == 0) return world.windowSize.width / 2 - WHOLE_BOARD_W / 2;
  const gap = 20;
  let shift = index - world.players.length / 2 - 0.5;
  let w = WHOLE_BOARD_W * getPlayerBoardScale(index) + gap;
  return world.windowSize.width / 2 + w * shift + gap / 2;
}

export function getPlayerBoardScale(index: number) {
  return index === 0 ? 1 : isMobile() ? 0.33 : 0.75;
}
