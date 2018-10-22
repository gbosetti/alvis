import React from 'react'
import { Switch } from 'react-router-dom'

import AppContainer from 'infovis/containers/App'
import HomePage from 'infovis/containers/Home'
import { PropsRoute } from 'infovis/components/PropsRoute'

const AppRoutes = props => {
  return (
    <AppContainer {...props}>
      <Switch>
        <PropsRoute path='/' component={HomePage} {...props} />
      </Switch>
    </AppContainer>
  )
}

export default AppRoutes
