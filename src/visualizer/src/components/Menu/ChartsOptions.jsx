import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { 
  Icon,
  List,
} from 'semantic-ui-react'

const ChartsOptions = props => {
  const { trans, options } = props

  return (
    <List horizontal relaxed>
      {options.map(({chart, icon, color, type, path}, i) => (
        <List.Item key={`chart-${i+1}`}>
          <Icon circular name={icon || `chart ${chart}`} color={color || 'red'} />
          <List.Content>
            <List.Header as={Link} to={`/chart/${type || 'basic'}/${path || chart}`}>
              { trans(`options.charts.${chart}.text`) }
            </List.Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  )
}

ChartsOptions.propTypes = {
  trans: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      chart: PropTypes.string.isRequired,
      type: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired
}

export default ChartsOptions
