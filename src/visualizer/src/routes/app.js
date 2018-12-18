import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { PropsRoute } from 'infovis/components/PropsRoute'

import AppContainer from 'infovis/containers/App'
import ChartPage from 'infovis/containers/Chart'
import HomePage from 'infovis/containers/Home'

const AppRoutes = props => {
  return (
    <AppContainer {...props}>
      <Switch>
        <PropsRoute path='/chart/basic/:chart' component={ChartPage} {...props} />
        <PropsRoute path='/' component={HomePage} {...props} />
        <Redirect to='/notFound' />
      </Switch>
    </AppContainer>
  )
}

export default AppRoutes
