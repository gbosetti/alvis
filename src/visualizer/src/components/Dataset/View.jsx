import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Pagination,
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

      page: 0,
    }

    this.handleSort = this.handleSort.bind(this)
    this.eventHandler = this.eventHandler.bind(this)
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

  eventHandler() {
    const {
      dataset: {
        rows,
      }
    } = this.props

    this.setState(() => ({
      rows,
      column: null,
      direction: null,
    }))
  }

  render() {
    const { column, rows, direction, page } = this.state

    const {
      trans,
      onReloadButtonClickHandler,
      onTransposeButtonClickHandler,
      dataset: {
        headers,
      },
      settings: {
        dataset: {
          current: {
            amountPerPage,
          }
        }
      }
    } = this.props

    const from = page * amountPerPage
    const to = from + amountPerPage

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
                <Button
                  basic
                  circular
                  onClick={onReloadButtonClickHandler(this.eventHandler)}
                  icon={(
                    <Icon
                      link
                      color='teal'
                      name='redo alternate'
                    />
                  )}
                />
              )}
            />
            <Popup
              header={trans('options.dataset.options.transpose.header')}
              content={trans('options.dataset.options.transpose.content')}
              trigger={(
                <Button
                  basic
                  circular
                  onClick={onTransposeButtonClickHandler(this.eventHandler)}
                  icon={(
                    <Icon.Group link>
                      <Icon color='blue' name='list' />
                      <Icon corner inverted name='sync alternate' />
                    </Icon.Group>
                  )}
                />
              )}
            />
            <Popup
              header={trans('options.dataset.options.settings.header')}
              content={trans('options.dataset.options.settings.content')}
              trigger={(
                <Button
                  as={Link}
                  to='/settings'
                  basic
                  circular
                  icon='settings'
                />
              )}
            />
          </Grid.Column>
        </Grid>
        <Table sortable selectable celled padded size='small'>
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
            {rows && rows.slice(from, to).map((row, i) => (
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
        <Divider hidden />
        <Container textAlign='center'>
          <Pagination
            defaultActivePage={page + 1}
            totalPages={!amountPerPage ? 0 : Math.ceil(rows.length / amountPerPage)}
            onPageChange={(e, { activePage }) => {
              this.setState(() => ({
                page: activePage - 1,
              }))
            }}
          />
        </Container>
      </div>
    )
  }
}

export default DatasetView
