import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { PropsRoute } from 'infovis/components/PropsRoute'

import PieChartPage from 'infovis/containers/Chart/pages/PieChart'

const AppRoutes = props => {
  return (
    <Switch>
      <PropsRoute path='/chart/pie' component={PieChartPage} {...props} />
      <Redirect to='/notFound' />
    </Switch>
  )
}

export default AppRoutes
