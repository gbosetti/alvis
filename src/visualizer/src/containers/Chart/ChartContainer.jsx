import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Container,
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
      trans
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Container>
          <ChartRoutes
            trans={name => trans(`chart:${name}`)}
          />
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
