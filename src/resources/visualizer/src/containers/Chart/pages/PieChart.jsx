import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {

} from 'semantic-ui-react'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  }
}

class PieChart extends Component {
  componentDidMount() {
    const {
      data: {
        dataset: {
          headers,
          rows,
        }
      }
    } = this.props

    /* TODO: Add https://github.com/codesuki/react-d3-components */

    void headers
    void rows
  }

  render() {
    return (
      <div id='pie-chart-container' />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChart)
