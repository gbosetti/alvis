import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Container,
  Divider,
  Form,
  Image,
  Menu,
} from 'semantic-ui-react'

import logo from 'infovis-resources/images/infovis-logo.png'

import dataActions from 'infovis/actions/data-actions'
import settingsActions from 'infovis/actions/settings-actions'
import { getEnumOptions } from 'infovis/helpers/select-options';

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...dataActions,
      ...settingsActions,
    }, dispatch),
  }
}

class Settings extends Component {
  constructor(props) {
    super(props)
    
    const {
      actions: {
        onSettingsFormClear,
      }
    } = this.props

    onSettingsFormClear('dataset')

    this.state = {}

    this.onChangeHandler = this.onChangeHandler.bind(this)
    this.hadleHeaderChange = this.hadleHeaderChange.bind(this)
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

  onChangeHandler(context) {
    return (e, {name, value}) => {
      const {
        actions: {
          onSettingsFormFieldChange,
        }
      } = this.props
  
      onSettingsFormFieldChange(context, name, value)
    }
  }

  hadleHeaderChange(e, {name, value}) {
    const {
      actions: {
        onSettingsFormFieldChange,
      }
    } = this.props

    onSettingsFormFieldChange('dataset', name, value)
    onSettingsFormFieldChange('dataset', 'headerName', '')    
  }

  render() {
    const {
      trans,
      data: {
        dataset: {
          headers,
        },
      },
      settings: {
        dataset: {
          fields: {
            selectedHeader,
            selectedHeaderHasError,
            headerName,
            headerNameHasError,
          }
        }
      }
    } = this.props

    void trans

    return (
      <div style={{ height: '100%' }}>
        <Container fluid id='settings-container'>
          <Menu>
            <Menu.Item as={Link} to='/'>
              <Image src={logo} size='mini' />
            </Menu.Item>
          </Menu>
          <Divider hidden />
          <Form>
            <Form.Group>
              <Form.Select
                width={6}
                name='selectedHeader'
                label='Header'
                options={getEnumOptions(headers)}
                value={selectedHeader}
                error={selectedHeaderHasError}
                placeholder='Header'
                onChange={this.hadleHeaderChange}
              />
              <Form.Input
                width={6}
                label='New header name'
                name='headerName'
                placeholder='New header name'
                value={headerName}
                error={headerNameHasError}
                onChange={this.onChangeHandler('dataset')}
              />
            </Form.Group>
          </Form>
        </Container> 
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
