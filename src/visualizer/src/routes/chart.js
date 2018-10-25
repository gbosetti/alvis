import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { PropsRoute } from 'infovis/components/PropsRoute'

import PieChartPage from 'infovis/containers/Chart/pages/PieChart'
import BarChartPage from 'infovis/containers/Chart/pages/BarChart'

const AppRoutes = props => {
  return (
    <Switch>
      <PropsRoute path='/chart/basic/pie' component={PieChartPage} {...props} />
      <PropsRoute path='/chart/basic/bar' component={BarChartPage} {...props} />
      <Redirect to='/notFound' />
    </Switch>
  )
}

export default AppRoutes
