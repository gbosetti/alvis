import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import { Brush, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
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

class LineChartPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xAxis: null,
      yAxis: null,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {

  }

  handleChange(e, {name, value}) {
    this.setState(() => ({
      [name]: value,
    }))
  }

  render() {
    const {
      xAxis,
      yAxis,
    } = this.state

    const {
      trans,
      data: {
        dataset: {
          headers,
          columns,
          types,
        }
      }
    } = this.props

    let data = xAxis !== null && yAxis !== null ? 
      Array.from(columns[xAxis] || []).map((x, i) => ({
        x,
        y: columns[yAxis][i],
      })) : []

    return (
      <div id='line-chart-container'>
        <Form>
          <Form.Group>
            <Form.Select
              width={6}
              label={trans('charts.fields.label.xAxis')}
              name='xAxis'
              options={getEnumOptions(headers)}
              placeholder={trans('charts.fields.label.xAxis')}
              onChange={this.handleChange}
            />
            <Form.Select
              width={6}
              label={trans('charts.fields.label.yAxis')}
              name='yAxis'
              options={getEnumOptions(headers)}
              placeholder={trans('charts.fields.label.yAxis')}
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <Divider hidden />
        {!data.length ? null : (
          <LineChart
            width={600}
            height={350}
            data={_.sortBy(data, ['x'])}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis
              dataKey='x'
              xAxisId='xAxis' 
              type={types[xAxis] === 'numeric' ? 'number' : undefined}
              label={{ value: headers[xAxis], position: 'insideBottomRight', offset: -75 }}
            />
            <YAxis
              yAxisId='yAxis'
              type={types[yAxis] === 'numeric' ? 'number' : undefined}
              label={{ value: headers[yAxis], position: 'insideLeft', angle: -90 }}
            />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Line
              types='monotone'
              name={headers[yAxis]}
              dataKey='y'
              xAxisId='xAxis'
              yAxisId='yAxis'
              stroke='#8884d8'
            />
            <Brush />
          </LineChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineChartPage)
