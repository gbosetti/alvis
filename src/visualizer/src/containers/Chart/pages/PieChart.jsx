import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Select,
} from 'semantic-ui-react'

import {
  PieChart
} from 'react-d3-components'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  }
}

class PieChartPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // header: null,
    }
  }

  componentDidMount() {

  }

  render() {
    const {
      data: {
        dataset: {
          headers,
        }
      }
    } = this.props

    const data = {
      label: 'somethingA',
      values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }

    return (
      <div id='pie-chart-container'>
        <Select 
          options={Array.from(headers || []).map(header => ({
            key: header,
            value: header,
            text: header,
          }))}
        />
        <PieChart
          data={data}
          width={600}
          height={400}
          margin={{top: 10, bottom: 10, left: 100, right: 100}}
          sort={null}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartPage)
