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
      actions: {
        getData,
      }
    } = this.props

    getData()
  }

  render() {
    const {
      trans
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Container id='chart-container'>
          <Menu>
            <Menu.Item as={Link} to='/'>
              <Image src={logo} size='mini' />
            </Menu.Item>

            <Menu.Item as={Link} to='/chart/pie'>
              <Icon circular name='chart pie' color='red' />
              Pie Chart
            </Menu.Item>
          </Menu>
          <Divider hidden />
          <ChartRoutes
            trans={name => trans(`chart:${name}`)}
          />
        </Container>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chart)
