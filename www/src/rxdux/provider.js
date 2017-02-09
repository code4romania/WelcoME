
// Provider injects store$ stream as props as context
// in order to let connect to have access to it

import {Component, PropTypes, Children} from 'react';

export default class Provider extends Component {
    getChildContext() {
        return {store$: this.store$};
    }

    constructor(props, context) {
        super(props, context);
        this.store$ = props.store$;
    }

    render() {
        return Children.only(this.props.children);
    }
}

Provider.propTypes = {
    store$: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};

Provider.childContextTypes = {
    store$: PropTypes.func.isRequired
};

Provider.displayName = 'Provider';