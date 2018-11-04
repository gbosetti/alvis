import React from 'react'
import { Switch, Redirect } from 'react-router-dom'

import { PropsRoute } from 'infovis/components/PropsRoute'

import PieChartPage from 'infovis/containers/Chart/pages/PieChart'
import BarChartPage from 'infovis/containers/Chart/pages/BarChart'
import ScatterChartPage from 'infovis/containers/Chart/pages/ScatterChart'
import SimpleLineChartPage from 'infovis/containers/Chart/pages/SimpleLineChart'

const AppRoutes = props => {
  return (
    <Switch>
      <PropsRoute path='/chart/basic/pie' component={PieChartPage} {...props} />
      <PropsRoute path='/chart/basic/bar' component={BarChartPage} {...props} />
      <PropsRoute path='/chart/basic/scatter' component={ScatterChartPage} {...props} />
      <PropsRoute path='/chart/basic/simple-line' component={SimpleLineChartPage} {...props} />
      <Redirect to='/notFound' />
    </Switch>
  )
}

export default AppRoutes
