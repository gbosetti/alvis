import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'
import {
  Container,
  Divider,
  Icon,
  Image,
  Menu,
  Tab,
} from 'semantic-ui-react'

import logo from 'infovis-resources/images/infovis-logo.png'

import dataActions from 'infovis/actions/data-actions'
import ChartsOptions from 'infovis/components/Menu/ChartsOptions'
import StatsView from 'infovis/components/Stats/View'
import DatasetView from 'infovis/components/Dataset/View'

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

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleReloadButtonClick = this.handleReloadButtonClick.bind(this)
    this.handleTransposeButtonClick = this.handleTransposeButtonClick.bind(this)
  }

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

  handleReloadButtonClick() {
    const {
      actions: {
        getData,
      }
    } = this.props

    getData()
  }

  handleTransposeButtonClick() {
    const {
      data: {
        dataset: {
          headers,
        }
      },
      actions: {
        transposeData,
      }
    } = this.props

    headers !== null && transposeData()
  }

  render() {
    const {
      trans,
      data: {
        dataset,
      }
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Container fluid id='home-container'>
          <Menu>
            <Menu.Item as={Link} to='/'>
              <Image src={logo} size='mini' />
            </Menu.Item>
          </Menu>
          <Divider hidden />
          <Tab
            menu={{ pointing: true, borderless: true, attached: false, tabular: false }} 
            panes={[
              {
                menuItem: {
                  key: 'stats',
                  content: trans('home:options.stats.title'),
                  icon: () => (
                    <Icon.Group size='large' style={{marginRight: '5px'}}>
                      <Icon color='blue' name='table' />
                      <Icon corner inverted name='line chart' />
                    </Icon.Group>
                  ),
                },
                render: () => (
                  <Tab.Pane attached={false}>
                    <StatsView
                      dataset={dataset}
                      trans={(name, ...args) => trans(`home:${name}`, ...args)}
                    />
                  </Tab.Pane>
                )
              },
              {
                menuItem: {
                  key: 'charts',
                  content: trans('home:options.charts.title'),
                  icon: () => (
                    <Icon size='large' color='red' name='pie chart' />
                  ),
                },
                render: () => (
                  <Tab.Pane attached={false}>
                    <ChartsOptions
                      trans={(name, ...args) => trans(`home:${name}`, ...args)}
                      options={[
                        { chart: 'pie', icon: 'pie chart' },
                        { chart: 'bar', icon: 'bar chart', color: 'blue' }
                      ]} 
                    />
                  </Tab.Pane>
                )
              },
              {
                menuItem: {
                  key: 'advancedCharts',
                  content: trans('home:options.advancedCharts.title'),
                  icon: () => (
                    <Icon size='large' color='violet' name='line chart' />
                  ),
                },
                render: () => (
                  <Tab.Pane attached={false} />
                )
              },
              {
                menuItem: {
                  key: 'dataset',
                  content: trans('home:options.dataset.title'),
                  icon: () => (
                    <Icon size='large' color='blue' name='table' />
                  ),
                },
                render: () => (
                  <Tab.Pane attached={false}>
                    <DatasetView
                      dataset={dataset}
                      onTransposeButtonClick={this.handleTransposeButtonClick}
                      onReloadButtonClick={this.handleReloadButtonClick}
                      trans={(name, ...args) => trans(`home:${name}`, ...args)}
                    />
                  </Tab.Pane>
                )
              },
              {
                menuItem: {
                  content: trans('home:options.json.title'),
                  icon: () => (
                    <Icon.Group size='large' style={{marginRight: '8.5px'}}>
                      <Icon color='blue' name='table' />
                      <Icon corner inverted color='yellow' name='js' />
                    </Icon.Group>
                  ),
                },
                render: () => (
                  <Tab.Pane attached={false}>
                    <ReactJson 
                      name='dataset'
                      src={dataset} 
                    />
                  </Tab.Pane>
                )
              }
            ]} 
          />
        </Container> 
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
