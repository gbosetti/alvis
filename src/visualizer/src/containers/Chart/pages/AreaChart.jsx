import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import { Brush, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
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

class AreaChartPage extends Component {
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
              label='X Axis'
              name='xAxis'
              options={getEnumOptions(headers)}
              placeholder='X Axis'
              onChange={this.handleChange}
            />
            <Form.Select
              width={6}
              label='Y Axis'
              name='yAxis'
              options={getEnumOptions(headers)}
              placeholder='Y Axis'
              onChange={this.handleChange}
            />
          </Form.Group>
        </Form>
        <Divider hidden />
        {!data.length ? null : (
          <AreaChart
            width={600}
            height={300}
            data={_.sortBy(data, ['y'])}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey='x' type={types[xAxis] === 'numeric' ? 'number' : undefined} />
            <YAxis dataKey='y' type={types[yAxis] === 'numeric' ? 'number' : undefined} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <Area name={headers[yAxis]} dataKey='y' stroke='#8884d8' />
            <Brush />
          </AreaChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaChartPage)
