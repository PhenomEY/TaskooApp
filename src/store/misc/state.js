export default function () {
  return {
    isMobile: false,
    contentRefresh: false,
    contentRefreshActive: false,
    isDark: localStorage.getItem('taskooDarkMode'),
    updateSidebar: false
  }
}
