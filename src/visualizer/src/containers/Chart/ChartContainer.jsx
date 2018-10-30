import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Divider,
  Icon,
  Image,
  Menu,
} from 'semantic-ui-react'

import dataActions from 'infovis/actions/data-actions'
import ChartRoutes from 'infovis/routes/chart'
import logo from 'infovis-resources/images/infovis-logo.png'

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...dataActions
    }, dispatch),
  }
}

class Chart extends Component {
  componentDidMount() {
    const {
      data: {
        dataset: {
          headers,
        }
      },
      actions: {
        getData,
      }
    } = this.props

    headers === null && getData()
  }

  render() {
    const {
      trans
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Container fluid id='chart-container'>
          <Menu>
            <Menu.Item as={Link} to='/'>
              <Image src={logo} size='mini' />
            </Menu.Item>

            <Menu.Item as={Link} to='/chart/basic/pie'>
              <Icon circular name='chart pie' color='red' />
              {trans('chart:charts.basic.pie.title')}
            </Menu.Item>
            <Menu.Item as={Link} to='/chart/basic/bar'>
              <Icon circular name='chart bar' color='blue' />
              {trans('chart:charts.basic.bar.title')}
            </Menu.Item>
          </Menu>
          <Divider hidden />
          <Container>
            <ChartRoutes
              trans={(name, ...args) => trans(`chart:${name}`, ...args)}
            />
          </Container>
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
