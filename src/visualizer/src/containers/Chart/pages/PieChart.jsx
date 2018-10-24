import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PieChart } from 'react-d3-components'
import { getEnumOptions } from 'infovis/helpers/select-options';

import {
  Form,
} from 'semantic-ui-react'


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
      header: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {

  }

  handleChange(e, {value}) {
    this.setState(() => ({
      header: value,
    }))
  }

  render() {
    const {
      header,
    } = this.state

    const {
      data: {
        dataset: {
          headers,
          rows,
        }
      }
    } = this.props

    let values = Array.from(rows[header] || [])
      .reduce((values, value) => ({ 
        ...values, 
        [value]: values[value] ? values[value] + 1 : 1 
      }), {})
      
    values = Object.keys(values)
      .map(header => ({ x: header, y: values[header] }))

    const data = {
      lable: '',
      values,
    }

    return (
      <div id='pie-chart-container'>
        <Form>
          <Form.Select
            label='Header'
            options={getEnumOptions(headers)}
            placeholder='Header'
            onChange={this.handleChange}
          />
        </Form>
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
