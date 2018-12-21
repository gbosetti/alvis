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
      header,
      yAxis,
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
      .reduce((data, value) => {
        let headerData = { 
          ...data,
          [value]: {
            y: data[value] && data[value].y ? data[value].y + 1 : 1,
          } 
        }

        if (yAxis === null)
          return headerData

        Array.from(columns[yAxis] || []).forEach(val => {
          headerData[value][val] = headerData[value] && headerData[value][val] ? headerData[value][val] + 1 : 1
        })

        Array.from(columns[yAxis] || []).forEach(val => {
          headerData[value][val] = headerData[value].y / headerData[value][val]    
        })

        return headerData
      }, {})
      
    data = Object.keys(data)
      .map(header => ({ x: header, ...data[header] }))

    console.log(data)

    return (
      <div id='bar-chart-container'>
        <Form>
          <Form.Group>
            <Form.Select
              width={6}
              label={trans('charts.fields.label.label')}
              name='yAxis'
              options={getEnumOptions(headers)}
              placeholder={trans('charts.fields.label.label')}
              onChange={this.handleChange}
            />
            <Form.Select
              width={6}
              label={trans('charts.fields.label.header')}
              name='header'
              options={getEnumOptions(headers)}
              placeholder={trans('charts.fields.label.header')}
              onChange={this.handleChange}
            />
          </Form.Group>
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
            {yAxis !== null ?
              Array.from(new Set(columns[yAxis])).map((val, i) => (
                <Bar key={`bar-${i+1}`} dataKey={val} stackId='a' fill={`#${((1<<24)*Math.random()|0).toString(16)}`} />
              )) :
              <Bar dataKey='y' name={headers[headers]} fill='#8884d8' />
            }
            <Brush />
          </BarChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartPage)
