import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { descending } from 'd3'
import { PieChart } from 'react-d3-components'
import {
  Divider,
  Form,
} from 'semantic-ui-react'

import { getEnumOptions } from 'infovis/helpers/select-options';

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
          columns,
        }
      }
    } = this.props

    let values = Array.from(columns[header] || [])
      .reduce((values, value) => ({ 
        ...values, 
        [value]: values[value] ? values[value] + 1 : 1 
      }), {})
      
    values = Object.keys(values)
      .map(header => ({ x: header, y: values[header] }))

    const data = {
      label: '',
      values,
    }

    return (
      <div id='pie-chart-container'>
        <Form>
          <Form.Select
            width={6}
            label='Header'
            options={getEnumOptions(headers)}
            placeholder='Header'
            onChange={this.handleChange}
          />
        </Form>
        <Divider hidden />
        {!data.values.length ? null : (
          <PieChart
            data={data}
            width={600}
            height={400}
            margin={{top: 10, bottom: 10, left: 100, right: 100}}
            tooltipOffset={{top: 175, left: 200}}
            tooltipHtml={(_, y) => `${y}`}
            tooltipMode='fixed'
            sort={descending}
          />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartPage)
