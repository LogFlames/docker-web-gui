export default (state = null, action) => {

  switch (action.type) {

    case 'GENERIC_CONTAINER':
      return {
        ...state,
        ...action.payload
      }

    case 'UPDATE_CONTAINER':
      return {
        ...state,
        ...{
          containers: state.containers.map(c => {
            if(c.shortId == action.payload.containerId) {
              return {
                ...c,
                ...action.payload.data
              }
            } else {
              return c
            }
          })
        }
      }
    
    case 'DELETE_CONTAINER':
      return {
        ...state,
        ...{
          containers: state.containers.filter(c => {
            return c.shortId !== action.payload.containerId
          })
        }
      }

    case 'UPDATE_LOG':
      return {
        ...state,
        ...{
          logData: {
            container: action.payload.container,
            data: action.payload.logData
          },
          isShowingSideSheet: action.payload.isShowingSideSheet
        }
      }

    default:
      return state

  }
}