import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Icon,
  List
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
    
  }

  render() {
    console.log(this.props)
    return (
      <div style={{ height: '100%' }}>
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
