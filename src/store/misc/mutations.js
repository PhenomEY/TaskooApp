/*
export function someMutation (state) {
}
*/

export function toggleMobile(state, value) {
  state.isMobile = value
  console.log('is Mobile:');
  console.log(state.isMobile)
}

export function toggleRefresh(state, value) {
  state.contentRefresh = value
}

export function toggleRefreshActive(state, value) {
  state.contentRefreshActive = value
  localStorage.setItem('contentRefreshActive', value)
}
