export default {
  validate(form) {
    let hasErrors = false;

    Object.values(form).forEach((entry) => {
      if(entry.required) {
        entry.error = !entry.value;

        if(entry.error === true) {
          hasErrors = true;
        }
      }
    })

    let returnForm = {
      form: form,
      hasErrors: hasErrors
    };

    return returnForm;

  },
}
