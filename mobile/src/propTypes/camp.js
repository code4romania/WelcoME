import PropTypes from 'prop-types';

export const campPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  Location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    geolocation: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      long: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
});
