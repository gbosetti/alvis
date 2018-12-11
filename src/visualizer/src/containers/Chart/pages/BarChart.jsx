import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
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

class BarChartPage extends Component {
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
      trans,
      data: {
        dataset: {
          headers,
          columns,
        }
      }
    } = this.props

    let data = Array.from(columns[header] || [])
      .reduce((data, value) => ({ 
        ...data,
        [value]: data[value] ? data[value] + 1 : 1 
      }), {})
      
    data = Object.keys(data)
      .map(header => ({ x: header, y: data[header] }))

    return (
      <div id='bar-chart-container'>
        <Form>
          <Form.Select
            width={6}
            label={trans('charts.fields.label.header')}
            options={getEnumOptions(headers)}
            placeholder={trans('charts.fields.label.header')}
            onChange={this.handleChange}
          />
        </Form>
        <Divider hidden />
        {!data.length ? null : (
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='x' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='y' name={headers[header]} fill='#8884d8' />
            <Brush />
          </BarChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartPage)
