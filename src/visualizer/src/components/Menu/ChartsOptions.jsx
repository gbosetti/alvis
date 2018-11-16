import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { 
  List,
} from 'semantic-ui-react'

const ChartsOptions = props => {
  const { trans, options } = props

  return (
    <List horizontal relaxed>
      {options.map(({chart, icon, color, disabled, type, path}, i) => (
        <List.Item disabled={disabled} key={`chart-${i+1}`}>
          <List.Icon circular name={icon || `chart ${chart}`} color={color || 'red'} />
          <List.Content>
            <List.Header
              as={disabled ? undefined : Link}
              to={disabled ? undefined : `/chart/${type || 'basic'}/${path || chart}`}
              color={disabled ? 'grey' : undefined}
            >
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
