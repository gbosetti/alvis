import React, { Component } from 'react'
import {
  Container,
  Form,
  Header,
  Icon,
  Input,
  Popup,
  Table,
} from 'semantic-ui-react'

import { isMissingValue } from 'infovis/helpers/data-processor'

class StatsView extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.editButtonClickHandler = this.editButtonClickHandler.bind(this)
    this.deleteButtonClickHandler = this.deleteButtonClickHandler.bind(this)
  }

  handleChange(e, {name, value}) {
    const {
      onSettingsFormFieldChange,
    } = this.props

    onSettingsFormFieldChange('dataset', name, value)
  }

  editButtonClickHandler(header) {
    const {
      onSettingsFormFieldChange,
      dataset: {
        headers,
      }
    } = this.props

    return () => {
      onSettingsFormFieldChange('dataset', 'headerName', headers[header])
      onSettingsFormFieldChange('dataset', 'selectedHeader', header)
    }
  }

  deleteButtonClickHandler(header) {
    const {
      headerDelete,
    } = this.props
    
    return () => headerDelete(header)
  }

  render() {
    const {
      trans,
      handleSubmit,
      settings: {
        dataset: {
          fields,
        }
      },
      dataset: {
        headers,
        columns,
        rows,
        types,
      },
    } = this.props

    return (
      <div>
        <Header as='h4'>
          {trans('options.stats.title')}
          <Header.Subheader>
            {trans('options.stats.description', { examples: Array.from(rows || []).length })}
          </Header.Subheader>
        </Header>
        <Container>
          <div className='responsive-data'>
            <Table unstackable selectable definition size='small'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>
                    {trans('options.stats.fields.type')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {trans('options.stats.fields.missing')}
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign='left' />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {headers && headers.map((header, i) => (
                  <Table.Row key={`header-${i+1}`}>
                    <Table.Cell>
                      {header}
                    </Table.Cell>
                    <Table.Cell>
                      {!types ? 
                        null : 
                        trans(`options.stats.types.${types[i]}`)
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {!columns ? null : columns[i].filter(isMissingValue).length}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign='left'>
                      {fields.selectedHeader === i ? (
                        <Form size='tiny'>
                          <Form.Field
                            error={fields.headerNameHasError}
                            width={14}
                          >
                            <Input
                              size='mini'
                              name='headerName'
                              placeholder={trans('options.stats.fields.headerName')}
                              onChange={this.handleChange}
                              value={fields.headerName}
                              action={{
                                icon: 'send',
                                size: 'tiny',
                                color: 'blue',
                                onClick: handleSubmit,
                              }}
                            />
                            <span className='error'>
                              {fields.headerNameErrorMsg}
                            </span>
                          </Form.Field>
                        </Form>
                      ) : (
                        <div>
                          <Popup
                            size='tiny'
                            trigger={(
                              <Icon
                                color='green'
                                link
                                name='pencil'
                                size='small'
                                onClick={this.editButtonClickHandler(i)}
                              />
                            )}
                            content={trans('options.stats.fields.options.edit')}
                          />
                          <Popup
                            size='tiny'
                            trigger={(
                              <Icon
                                color='red'
                                link
                                name='trash alternate outline'
                                size='small'
                                onClick={this.deleteButtonClickHandler(i)}
                              />
                            )}
                            content={trans('options.stats.fields.options.delete')}
                          />
                        </div>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>          
            </Table>
          </div>
        </Container>
      </div>
    )
  }
}

export default StatsView
