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

import config from 'infovis/config'
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
          <Menu size='small' style={{overflowX: 'scroll'}}>
            <Menu.Item as={Link} to='/'>
              <Image src={logo} size='mini' />
            </Menu.Item>

            {config.charts.map(({chart, icon, color, disabled, type, path}, i) => (
              <Menu.Item
                disabled={disabled}
                key={`chart-option-${i+1}`}
                as={disabled ? undefined : Link} 
                to={disabled ? undefined : `/chart/${type || 'basic'}/${path || chart}`}
              >
                <Icon circular name={icon || `chart ${chart}`} color={color || 'red'} />
                { trans(`chart:charts.${type || 'basic'}.${chart}.title`) }
              </Menu.Item>
            ))}
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
