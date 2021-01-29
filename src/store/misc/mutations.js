/*
export function someMutation (state) {
}
*/

export function toggleMobile(state, value) {
  state.isMobile = value
}

export function toggleRefresh(state, value) {
  state.contentRefresh = value
}

export function toggleRefreshActive(state, value) {
  state.contentRefreshActive = value
  localStorage.setItem('contentRefreshActive', value)
}
