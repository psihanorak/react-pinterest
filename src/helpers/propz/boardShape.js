import PropTypes from 'prop-types';

const boardShape = PropTypes.shape({
  description: PropTypes.string.isRequired,
  faClassName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { boardShape };
