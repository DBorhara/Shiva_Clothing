import { createSelector } from 'reselect';

const selectDirectory = (state) => state.directory;

export const selectDirectoryTiles = createSelector(
  [selectDirectory],
  (directory) => directory.tiles
);
