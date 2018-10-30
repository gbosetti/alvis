import React, { Component } from 'react'
import {
  Divider,
  Grid,
  Header,
  Icon,
  Popup,
  Table,
} from 'semantic-ui-react'

class DatasetView extends Component {
  render() {
    const {
      trans,
      onReloadButtonClick,
      onTransposeButtonClick,
      dataset: {
        headers,
        rows,
      },
    } = this.props

    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <Header as='h4'>
              {trans('options.dataset.title')}
              <Header.Subheader>
                {trans('options.dataset.description', { examples: Array.from(rows || []).length })}
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Popup
              header={trans('options.dataset.options.redo.header')}
              content={trans('options.dataset.options.redo.content')}
              trigger={(
                <Icon
                  style={{cursor: 'pointer'}}
                  color='blue'
                  name='redo alternate'
                  onClick={onReloadButtonClick}
                />
              )}
            />
            <Divider vertical hidden />
            <Popup
              header={trans('options.dataset.options.transpose.header')}
              content={trans('options.dataset.options.transpose.content')}
              trigger={(
                <Icon.Group
                  style={{cursor: 'pointer'}}
                  onClick={onTransposeButtonClick}
                >
                  <Icon color='blue' name='list' />
                  <Icon corner name='sync alternate' />
                </Icon.Group>
              )}
            />
          </Grid.Column>
        </Grid>
        <Table celled padded size='small'>
          <Table.Header>
            <Table.Row>
              {headers && headers.map((header, i) => (
                <Table.HeaderCell key={`header-${i+1}`}>
                  {header.trim()}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows && rows.map((row, i) => (
              <Table.Row key={`row-${i+1}`}>
                {row.map((value, i) => (
                  <Table.Cell key={`row-value-${i+1}`}>
                    {value || '-'}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>          
        </Table>
      </div>
    )
  }
}

export default DatasetView
