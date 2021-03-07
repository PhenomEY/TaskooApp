/*
export function someMutation (state) {
}
*/

export function setOrganisation(state, value) {
  //check if currently saved organisations is not in available list
  const newOrganisation = state.availableOrganisations.find(element => element.id == value);

  console.log(newOrganisation)
  state.currentOrganisation = newOrganisation
}

export function setAvailableOrganisations(state, value) {
  state.availableOrganisations = value

  //check if currently saved organisations is not in available list
  const currentOrg = state.availableOrganisations.find(element => element.id == state.currentOrganisation);

  if(!currentOrg) {
    state.currentOrganisation = state.availableOrganisations[0]
  } else {
    state.currentOrganisation = currentOrg
  }


}

export function saveOrganisation(state, value) {
  localStorage.setItem('currentOrg', value.id);

  //check if currently saved organisations is not in available list
  const currentOrg = state.availableOrganisations.find(element => element.id == value.id);

  if(!currentOrg) {
    state.currentOrganisation = state.availableOrganisations[0]
  } else {
    state.currentOrganisation = currentOrg
  }
}
