import { isMobile } from "../systems/layout/draw-board.system";

export const TILE_SIZE = 32;
export const OUTER_GAP = 16;
export const INNER_GAP = isMobile() ? 2 : 8;
export const CIRCLE_R = TILE_SIZE * Math.sqrt(2) - 4;

export const PLAYER_BOARD_TOP = CIRCLE_R * 4 + TILE_SIZE * 4 + OUTER_GAP * 4 + (isMobile() ? 0 : OUTER_GAP * 1);

export const PLAYER_BOARD_LEFT = INNER_GAP * 3 + TILE_SIZE * 5 + INNER_GAP * 4;
export const PLAYER_BOARD_SIZE = TILE_SIZE * 5 + INNER_GAP * 6;
export const WHOLE_BOARD_W = TILE_SIZE * 10 + INNER_GAP * 11;
