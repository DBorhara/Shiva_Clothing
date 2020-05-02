import React from 'react';
import { connect } from 'react-redux';
import './directory.styles.scss';

import { createStructuredSelector } from 'reselect';

import { selectDirectoryTiles } from '../../redux/directory/directory.selectors';

//Import Component
import MenuItem from '../menu-item/menu-item.component';

const Directory = ({ tiles }) => (
  <div className="directory-menu">
    {tiles.map(({ id, ...otherTileProps }) => (
      <MenuItem key={id} {...otherTileProps} />
    ))}
  </div>
);

const mapStateToProps = () =>
  createStructuredSelector({
    tiles: selectDirectoryTiles,
  });

export default connect(mapStateToProps)(Directory);
