export default function () {
  return {
    currentOrganisation: localStorage.getItem('currentOrg'),
    availableOrganisations: null
  }
}
