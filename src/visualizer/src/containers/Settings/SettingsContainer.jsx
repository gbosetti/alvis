import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Container,
  Divider,
  Image,
  Menu,
} from 'semantic-ui-react'

import logo from 'infovis-resources/images/infovis-logo.png'

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

class Settings extends Component {
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
      trans,
      data: {
        dataset,
      }
    } = this.props

    void trans
    void dataset

    return (
      <div style={{ height: '100%' }}>
        <Container fluid id='settings-container'>
          <Menu>
            <Menu.Item as={Link} to='/'>
              <Image src={logo} size='mini' />
            </Menu.Item>
          </Menu>
          <Divider hidden />
        </Container> 
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
