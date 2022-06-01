import PropTypes from "prop-types";

export const ChildrenType = PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.func, PropTypes.element, PropTypes.string, PropTypes.number ]);