const forms = document.querySelectorAll("[data-validate-form]");

const validators = {
  full_name(value) {
    return value.trim().length >= 2 ? "" : "Please enter your full name.";
  },
  phone(value) {
    return /^[+()\d\s-]{7,}$/.test(value.trim()) ? "" : "Please enter a valid phone number.";
  },
  email(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Please enter a valid email address.";
  },
  room_type(value) {
    return value ? "" : "Please select a room type.";
  },
  check_in(value) {
    return value ? "" : "Please choose a check-in date.";
  },
  check_out(value, form) {
    const checkIn = form.elements.check_in?.value;
    if (!value) return "Please choose a check-out date.";
    if (checkIn && value <= checkIn) return "Check-out must be after check-in.";
    return "";
  },
  message(value) {
    return value.trim().length >= 5 ? "" : "Please enter a short message.";
  }
};

function setError(field, message) {
  const error = field.closest(".form-field")?.querySelector(".field-error");
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) error.textContent = message;
}

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    let firstInvalidField = null;
    const fields = form.querySelectorAll("[data-validate]");

    fields.forEach((field) => {
      const validator = validators[field.name];
      const message = validator ? validator(field.value, form) : "";
      setError(field, message);
      if (message) {
        isValid = false;
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    const formMessage = form.querySelector("[data-form-message]");

    if (!isValid) {
      firstInvalidField?.focus();
      return;
    }

    // Future PHP integration: replace this success state with a POST request
    // to the backend booking/contact endpoint and handle server validation here.
    form.reset();
    if (formMessage) {
      formMessage.textContent = "Thank you. Your request is ready to be sent to the Dos Palmas Lodge team.";
      formMessage.classList.add("is-visible");
    }
  });

  form.querySelectorAll("[data-validate]").forEach((field) => {
    field.addEventListener("blur", () => {
      const validator = validators[field.name];
      if (validator) setError(field, validator(field.value, form));
    });
  });
});
