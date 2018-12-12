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

class MultiLineChartPage extends Component {
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
      Array.from(columns[xAxis] || []).map((x, i) => {
        const partialData = { x }

        Array.from(yAxis || [])
          .forEach(y => {
            partialData[`y${y}`] = columns[y][i]
          })

        return partialData
      }) : []

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
              multiple
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
            height={300}
            data={_.sortBy(data, ['x'])}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <XAxis dataKey='x' type={types[xAxis] === 'numeric' ? 'number' : undefined} />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            {yAxis && Array.from(yAxis || []).map((y, j) => (
              <Line
                key={`y${j+1}`}
                types='monotone'
                name={headers[y]}
                dataKey={`y${y}`}
                stroke={`#${((1<<24)*Math.random()|0).toString(16)}`}
              />
            ))}
            <Brush />
          </LineChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultiLineChartPage)
