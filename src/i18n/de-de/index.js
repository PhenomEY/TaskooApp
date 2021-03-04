export default {
  "taskoo": {
    "slogan": "Easy Task Management",
    "title": "Taskoo - Easy Task Management",
    "days": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    "shortDays": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    "shorterDays": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    "save": "Speichern"
},

  "user": {
    "firstname": "Vorname",
    "lastname": "Nachname"
  },

  "navigation": {
    "dashboard": "Dashboard",
    "tasks": "Meine Aufgaben",
    "settings": "Einstellungen",
    "admin": "Administration",
    "logout": "Abmelden",
    "myProfile": "Mein Profil",

    "projects": {
      "title": "Deine Projekte",
      "create": "Projekt anlegen",
      "favorites": "Favoriten"
  }
},

  "login": {
      "login_failed": "Login fehlgeschlagen",
      "submit": "Anmelden",
      "labels": {
      "email": "E-Mail-Adresse",
      "password": "Passwort",
      "password_verification": "Passwort bestätigen"
      },

  "links": {
    "lostPassword": "Passwort vergessen",
      "about": "Über Taskoo"
  }
},

  "invite": {
    "submit": "Anmeldung abschließen",
    "headline": "Hallo {name}!",
    "inviteText": "Schließe deine Anmeldung ab um Zugang zu Taskoo zu erhalten.",
    "passwordError": "Überprüfe deine Eingabe",
    "successText": "Deine Anmeldung wurde erfolgreich abgeschlossen.",
    "redirect": "Du wirst zum Login weitergeleitet."
  },

  "project": {
    "deadline": "Geplanter Abschluss am",
    "notFound": "Projekt konnte nicht gefunden werden",
    "closed": "Projekt nur für zugewiesene Nutzer sichtbar",
    "public": "Dieses Projekt ist öffentlich"
},

  "taskGroup": {
    "defaultName": "Neue Gruppe",
    "menu": {
      "deleteGroup": "Gruppe löschen",
      "showDoneTasks": "Abgeschlossene Aufgaben anzeigen",
      "showOpenTasks": "Offene Aufgaben anzeigen",
      "createGroup": "Neue Gruppe erstellen"
    },
    "doneTasks": "Abgeschlossene Aufgaben"
},

  "task": {
    "defaultName": "Neue Aufgabe",
    "doneAt": "Abgeschlossen am",
    "notFound": "Aufgabe konnte nicht gefunden werden",
    "notFoundTitle": "(╯°□°）╯︵ ┻━┻",
    "task": "Aufgabe",
    "description": "Beschreibung...",
    "dateDue": "Fällig am",
    "priority": "Priorität",
    "hasDescription": "Enthält Beschreibung",
    "hasSubTasks": "Enthält Unteraufgaben",
    "assignedUsers": "Zugewiesene Mitarbeiter",
    "subTasks": "Weitere Aufgaben",
    "addSubTask": "Weitere Aufgabe hinzufügen",
    "detail": {
      "doneAt": "Aufgabe abgeschlossen am {date} von {firstname} {lastname}",
      "finishTask": "Aufgabe erledigen",
      "taskFinished": "Aufgabe erledigt"
    },

    "priorities": {
      "high": "Hoch",
      "normal": "Normal"
    },

  "userSelect": {
    "placeholder": "Mitarbeiter auswählen",
      "selectLabel": "hinzufügen",
      "selectedLabel": "ausgewählt",
      "deselectLabel": "entfernen",
      "more" : "+{count}"
  },

  "menu": {
    "delete": "Aufgabe löschen"
  }
},

  "dashboard": {
  "title": "Taskoo - Dashboard",
    "welcome": "Willkommen {name}",
    "notifications": "Benachrichtigungen",
    "dueTasks": "Diese Aufgaben sind demnächst fällig",
    "notification": {
    "task": {
      "first": "hat dir die Aufgabe",
        "assigned": "zugewiesen"
    },
    "project": {
      "first": "hat dich dem Projekt",
        "assigned": "hinzugefügt"
    }
  }
},

  "tasks": {
    "title": "Taskoo - Meine Aufgaben",
    "doneTasks": "Abgeschlossene Aufgaben",
    "emptyTasks": "Deine Aufgabenliste ist aktuell leer"
  },

  "settings": {
    "title": "Taskoo - Administration",
    "main": {
      "title": "Grundeinstellungen",
      "appurl": "App URL",
      "appurl_placeholder": "https://app.taskoo.de"
    },
    "users": {
      "title": "Benutzer",
      "createUser": "Neuen Benutzer anlegen",
      "editUser": "Benutzer bearbeiten",
      "list": {
        "id": "ID",
        "name": "Name",
        "email": "E-Mail",
        "active": "Aktiv",
        "role": "Rolle",
        "warnings": {
          "password": "Dieser Benutzer hat noch kein Passwort definiert",
          "organisations": "Dieser Benutzer ist noch keiner Abteilung zugewiesen"
        }
      },

      "create": {
        "invite": "Benutzer einladen",
        "manually": "Benutzer manuell anlegen",
        "formError": "Bitte fülle die markierten Felder aus",
        "submitInvite": "Einladung senden",
        "createUser": "Benutzer anlegen"
      },

      "edit": {
        "save": "Benutzer speichern"
      }
    },
  },

  "prompts": {
    "delete": {
      "task": {
        "title": "Möchtest du diese Aufgabe löschen?",
        "description": "Unteraufgaben werden unwiderruflich gelöscht.",
        "confirm": "löschen",
        "cancel": "abbrechen"
      },
      "taskGroup": {
        "title": "Möchtest du diese Gruppe löschen?",
        "description": "Aufgaben in dieser Gruppe werden unwiderruflich gelöscht.",
        "confirm": "löschen",
        "cancel": "abbrechen"
      },
    }
  }

}
