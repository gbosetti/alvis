import {
  SET_STORE,
  SET_STATE,
  GET_STATE,
} from 'infovis/constants'

/**
 * set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore(store) {
  return {
    type: SET_STORE,
    payload: store,
  }
}

/**
 * set state
 *
 */
export function setState(newState) {
  return {
    type: SET_STATE,
    payload: newState,
  }
}

/**
 * getState
 *
 */
export function getState(toggle) {
  return {
    type: GET_STATE,
    payload: toggle,
  }
}
  