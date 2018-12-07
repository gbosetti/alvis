import React, { Component } from 'react'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import DevTools from 'infovis/components/DevTools'

import settingsActions from 'infovis/actions/settings-actions'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...settingsActions }, dispatch),
  }
}

class App extends Component {
  render() {
    const { children } = this.props

    return (
      <div style={{ height: '100%' }}>
        {React.cloneElement(children, {...this.props})}
        {process.env.NODE_ENV === 'development' && <DevTools />}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
}

reactMixin(App.prototype, TimerMixin)

export default connect(mapStateToProps, mapDispatchToProps)(App)
