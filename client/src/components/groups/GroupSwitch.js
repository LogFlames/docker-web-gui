import React from 'react'
import { Switch } from 'evergreen-ui'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { groupStatusUpdater } from '../../store/actions/groups.action'
import { toggleContainer } from '../../store/actions/container.action'

class GroupSwitch extends React.PureComponent {

  isRunning () {
    const { containers } = this.props
    const runningContainers = containers.filter(c => c.State.Running === true)
    return containers.length === runningContainers.length
  }

  isLoading () {
    const { containers } = this.props
    const loadingContainers = containers.filter(c => !!c.stateToggling)
    return loadingContainers === 0
  }

  toggleAllContainers () {
    const { containers, toggleContainer } = this.props
    const isRunning = this.isRunning()
    const command = isRunning
      ? 'stop'
      : 'start'
    containers.map(container => {
      toggleContainer(container, command, true)
    })
  }

  render () {
    const runningStatus = this.isRunning()
    return <Switch 
      marginRight={10} 
      height={22} 
      marginTop={2}
      checked={runningStatus} 
      disabled={this.isLoading()}
      onChange={() => {
        this.toggleAllContainers()
      }}
    />
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    toggleContainer,
    groupStatusUpdater,
  },
  dispatch
)

export default connect(null, mapDispatchToProps)( GroupSwitch )