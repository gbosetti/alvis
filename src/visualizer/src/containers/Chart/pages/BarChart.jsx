import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BarChart } from 'react-d3-components'
import { getEnumOptions } from 'infovis/helpers/select-options';
import {
  Divider,
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
      label: '',
      values,
    }

    return (
      <div id='bar-chart-container'>
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
          <BarChart
            data={data}
            width={600}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}
            tooltipHtml={(x, _, y,) => `${x}: ${y}`}
            colorByLabel={false}
          />
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BarChartPage)
