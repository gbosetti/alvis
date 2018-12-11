import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
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

class ScatterChartPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xAxis: null,
      yAxis: null,
      line: false,
      fitting: false,
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {

  }

  handleChange(e, {name, value}) {
    if (['line', 'fitting'].includes(name)) {
      const {
        [name]: fieldValue
      } = this.state

      value = !fieldValue
    }

    this.setState(() => ({
      [name]: value,
    }))
  }

  render() {
    const {
      xAxis,
      yAxis,
      line,
      fitting,
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
      <div id='scatter-chart-container'>
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
          <Form.Group>
            <Form.Checkbox
              name='line'
              value={line}
              onChange={this.handleChange}
            />
            <Form.Checkbox
              name='fitting'
              slider
              label={trans('charts.fields.label.trendline')}
              disabled={!line}
              value={fitting}
              onChange={!line ? undefined : this.handleChange}
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
            <XAxis dataKey='x' type={types[xAxis] === 'numeric' ? 'number' : undefined} />
            <YAxis dataKey='y' type={types[yAxis] === 'numeric' ? 'number' : undefined} />
            <CartesianGrid />
            <Tooltip cursor={{strokeDasharray: '3 3'}} />
            <Legend />
            <Scatter
              name={`${headers[xAxis]} vs ${headers[yAxis]}`}
              data={_.sortBy(data, ['x'])}
              line={line}
              lineType={fitting ? 'fitting' : undefined}
              fill='#8884d8'
            />
          </ScatterChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScatterChartPage)
