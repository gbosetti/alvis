import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import dataActions from 'infovis/actions/data-actions'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...dataActions
    }, dispatch),
  }
}

class Home extends Component {
  componentDidMount() {
    const {
      actions: {
        getData,
      }
    } = this.props

    getData()
  }

  render() {
    const {
      data: {
        dataset,
      }
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        {JSON.stringify(dataset)}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
