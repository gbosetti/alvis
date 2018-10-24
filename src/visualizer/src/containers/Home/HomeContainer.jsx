import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Icon,
  List,
  Segment,
  Tab,
} from 'semantic-ui-react'

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
        <Container>
          <Tab
            menu={{ borderless: true, attached: false, tabular: false }} 
            panes={[
              {
                menuItem: 'Statistics',
                render: () => (
                  <Tab.Pane attached={false}>
                    <List horizontal relaxed>
                      <List.Item>
                        <Icon circular name='chart pie' color='red' />
                        <List.Content>
                          <List.Header as={Link} to='/chart/pie'>
                            Pie Chart
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Tab.Pane>
                )
              },
              {
                menuItem: 'Data',
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
