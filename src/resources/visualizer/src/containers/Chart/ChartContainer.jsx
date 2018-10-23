import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Segment
} from 'semantic-ui-react'

import dataActions from 'infovis/actions/data-actions'

import ChartRoutes from 'infovis/routes/chart'

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

class Chart extends Component {
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
      trans,
      data: {
        dataset,
      }
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Segment tertiary>
          <pre>
            {JSON.stringify(dataset, null, 2)}
          </pre>
        </Segment>
        <ChartRoutes
          trans={name => trans(`chart:${name}`)}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
