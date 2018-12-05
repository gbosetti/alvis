import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PieChart, Pie, Tooltip } from 'recharts'
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

    let data = Array.from(columns[header] || [])
      .reduce((data, value) => ({ 
        ...data, 
        [value]: data[value] ? data[value] + 1 : 1 
      }), {})
      
    data = Object.keys(data)
      .map(header => ({ name: header, value: data[header] }))

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
        {!data.length ? null : (
          <PieChart 
            width={1200} 
            height={1200}
          >
            <Pie
              data={data}
              cx={200}
              cy={150}
              innerRadius={70}
              outerRadius={110}
              fill="#82ca9d"
            />
            <Tooltip />
          </PieChart>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartPage)
