import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {

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
    var data = {
      label: 'somethingA',
      values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
    }

    var sort = null

    return (
      <div id='pie-chart-container'>
        
        
        
        <PieChart
          data={data}
          width={600}
          height={400}
          margin={{top: 10, bottom: 10, left: 100, right: 100}}
          sort={sort}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartPage)
