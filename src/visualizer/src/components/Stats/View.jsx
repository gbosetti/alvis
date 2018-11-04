import React, { Component } from 'react'
import {
  Header,
  Table,
} from 'semantic-ui-react'

import { isMissingValue } from 'infovis/helpers/data-processor'

class StatsView extends Component {
  render() {
    const {
      trans,
      onTransposeButtonClick,
      dataset: {
        headers,
        columns,
        rows,
        types,
      },
    } = this.props

    void onTransposeButtonClick

    return (
      <div>
        <Header as='h4'>
          {trans('options.stats.title')}
          <Header.Subheader>
            {trans('options.stats.description', { examples: Array.from(rows || []).length })}
          </Header.Subheader>
        </Header>
        <Table definition size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>
                {trans('options.stats.fields.type')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {trans('options.stats.fields.missing')}
              </Table.HeaderCell>
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
              </Table.Row>
            ))}
          </Table.Body>          
        </Table>
      </div>
    )
  }
}

export default StatsView
