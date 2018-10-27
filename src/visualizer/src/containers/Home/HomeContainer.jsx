import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactJson from 'react-json-view'
import {
  Container,
  Tab,
} from 'semantic-ui-react'

import dataActions from 'infovis/actions/data-actions'
import ChartsOptions from 'infovis/components/Menu/ChartsOptions'
import StatsView from 'infovis/components/Stats/View'

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
      trans,
      data: {
        dataset,
      }
    } = this.props

    void trans

    return (
      <div style={{ height: '100%' }}>
        <Container id='home-container'>
          <Tab
            menu={{ pointing: true, borderless: true, attached: false, tabular: false }} 
            panes={[
              {
                menuItem: trans('home:options.stats.title'),
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
                menuItem: trans('home:options.charts.title'),
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
                menuItem: trans('home:options.advancedCharts.title'),
                render: () => (
                  <Tab.Pane attached={false} />
                )
              },
              {
                menuItem: trans('home:options.data.title'),
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
