import React, { Component } from 'react'
import _ from 'underscore'
import {
  Divider,
  Grid,
  Header,
  Icon,
  Popup,
  Table,
} from 'semantic-ui-react'

class DatasetView extends Component {
  constructor(props) {
    super(props)

    const {
      dataset: {
        rows,
      }
    } = this.props

    this.state = {
      rows,
      column: null,
      direction: null,
    }

    this.handleSort = this.handleSort.bind(this)
  }

  handleSort(clickedColumn) {
    return () => {
      const { column, rows, direction } = this.state

      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          rows: _.sortBy(rows, [clickedColumn]),
          direction: 'ascending',
        })

        return
      }

      this.setState({
        rows: rows.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
  }

  render() {
    const { column, rows, direction } = this.state

    const {
      trans,
      onReloadButtonClick,
      onTransposeButtonClick,
      dataset: {
        headers,
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
                  color='teal'
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
                  <Icon corner inverted name='sync alternate' />
                </Icon.Group>
              )}
            />
          </Grid.Column>
        </Grid>
        <Table sortable celled padded size='small'>
          <Table.Header>
            <Table.Row>
              {headers && headers.map((header, i) => (
                <Table.HeaderCell
                  key={`header-${i+1}`}
                  sorted={column === i ? direction : null}
                  onClick={this.handleSort(i)}
                >
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
