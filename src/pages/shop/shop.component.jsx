import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Fetch collections data from Firestore
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

//Containers with Loading Spinner
import CollectionsOverviewContainer from '../../components/collections-overview/collections.container';
import CollectionPageContainer from '../collection/collection.container';

class ShopPage extends Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  //Dynamic and Nested Routing
  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        )} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
