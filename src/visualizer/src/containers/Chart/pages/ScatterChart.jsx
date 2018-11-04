import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
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
        }
      }
    } = this.props

    let data = xAxis !== null && yAxis !== null ? 
      Array.from(columns[xAxis] || []).map((x, i) => ({
        x,
        y: columns[yAxis][i],
      })) : []

    return (
      <div id='scatter-chart-container'>
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
          <ScatterChart
            width={600}
            height={300}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey='x' />
            <YAxis dataKey='y' />
            <CartesianGrid />
            <Tooltip cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Scatter name={`${headers[xAxis]} vs ${headers[yAxis]}`} data={data} fill='#8884d8' />
          </ScatterChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartPage)
