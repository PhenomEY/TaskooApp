/*
export function someMutation (state) {
}
*/

export function setTeam(state, value) {
  //check if currently saved organisations is not in available list
  const newTeam = state.availableTeams.find(element => element.id == value);
  state.currentTeam = newTeam
}

export function setAvailableTeams(state, value) {
  state.availableTeams = value

  if(state.availableTeams) {
    //check if currently saved teams is not in available list
    const currentTeam = state.availableTeams.find(element => element.id == state.currentTeam);

    if(!currentTeam) {
      state.currentTeam = state.availableTeams[0]
    } else {
      state.currentTeam = currentTeam
    }
  } else {
    localStorage.removeItem('currentTeam');
    state.currentTeam = null;
  }
}

export function saveTeam(state, value) {
  localStorage.setItem('currentTeam', value.id);

  if (state.availableTeams) {
    //check if currently saved organisations is not in available list
    const currentTeam = state.availableTeams.find(element => element.id == value.id);

    if(!currentTeam) {
      state.currentTeam = state.availableTeams[0]
    } else {
      state.currentTeam = currentTeam
    }
  }

}
