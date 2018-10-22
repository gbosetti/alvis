import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Header,
  Icon,
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
      data: {
        dataset,
      }
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <Icon name='chart line' />
        <Header as='h3'>
          Dataset: 
          <Header.Subheader>
            {JSON.stringify(dataset)}
          </Header.Subheader>
        </Header>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
