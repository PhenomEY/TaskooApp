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

export function toggleDarkMode(state, value) {
  localStorage.setItem('taskooDarkMode', value)
  state.isDark = localStorage.getItem('taskooDarkMode')

  if (state.isDark === 'true') {
    document.body.classList.add('taskoo-dark-theme');
  } else {
    document.body.classList.remove('taskoo-dark-theme');
  }
}

export function updateSidebar(state, value) {
  state.updateSidebar = value
}
