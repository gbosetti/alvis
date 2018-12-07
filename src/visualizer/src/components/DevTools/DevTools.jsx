import React from 'react'
import { createDevTools } from 'redux-devtools'

import Dispatcher from 'redux-devtools-dispatch'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'
import MultipleMonitors from 'redux-devtools-multiple-monitors'

import globalActions from 'infovis/actions/global-actions'
import dataActions from 'infovis/actions/data-actions'
import settingsActions from 'infovis/actions/settings-actions'

const actions = {
  ...globalActions,
  ...dataActions,
  ...settingsActions,
}

export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-alt-h"
    changePositionKey="ctrl-alt-w"
    changeMonitorKey='ctrl-alt-m'
    defaultIsVisible={false}
  >
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher actionCreators={actions} />
    </MultipleMonitors>
  </DockMonitor>
)
