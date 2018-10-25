import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Container,
  Segment,
  Tab,
} from 'semantic-ui-react'

import ChartsOptions from 'infovis/components/Menu/ChartsOptions'
import dataActions from 'infovis/actions/data-actions'

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
                menuItem: trans('home:options.charts.title'),
                render: () => (
                  <ChartsOptions
                    trans={name => trans(`home:${name}`)}
                    options={[
                      { chart: 'pie', icon: 'pie chart' },
                      { chart: 'bar', icon: 'bar chart', color: 'blue' }
                    ]} 
                  />
                )
              },
              {
                menuItem: trans('home:options.advancedCharts.title'),
                render: () => null
              },
              {
                menuItem: trans('home:options.data.title'),
                render: () => (
                  <Tab.Pane attached={false}>
                    <Segment tertiary>
                      <pre>
                        {JSON.stringify(dataset, null, 2)}
                      </pre>
                    </Segment>
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
