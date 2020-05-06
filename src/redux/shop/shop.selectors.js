import { createSelector } from 'reselect';

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop], //state.shop
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections], //state.shop.collections
  (collections) =>
    collections ? Object.keys(collections).map((key) => collections[key]) : []
);

export const selectCollection = (collectionUrl) =>
  createSelector(
    [selectCollections], //state.shop.collections.url
    (collections) => (collections ? collections[collectionUrl] : null)
  );

export const selectIsShopCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
