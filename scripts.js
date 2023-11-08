document.addEventListener("DOMContentLoaded", (event) => {
  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Map of input names to text patterns
  const inputMap = {
    "supporter.firstName": /\{user_data~First Name(?:~(\S+))?\}/,
    "supporter.lastName": /\{user_data~Last Name(?:~(\S+))?\}/,
    "supporter.emailAddress": /\{user_data~Email(?:~(\S+))?\}/,
    "supporter.address1": /\{user_data~Address(?:~(\S+))?\}/,
    "supporter.address2": /\{user_data~Apt ste bldg(?:~(\S+))?\}/,
    "supporter.city": /\{user_data~City(?:~(\S+))?\}/,
    "supporter.postcode": /\{user_data~Zip or Postal Code(?:~(\S+))?\}/,
    "supporter.region": /\{user_data~State or Province(?:~(\S+))?\}/,
    "supporter.country": /\{user_data~Country(?:~(\S+))?\}/,
  };

  // Function to wrap merge tag and update its content
  const wrapAndUpdateMergeTag = (inputName, newValue) => {
    const regex = inputMap[inputName];
    // Select all tags that could contain the merge tag
    const possibleTags = ["h1", "h2", "h3", "p", "strong", "i", "span", "div"];
    possibleTags.forEach((tag) => {
      document.querySelectorAll(tag).forEach((element) => {
        const matches = [...element.innerHTML.matchAll(regex)];
        matches.forEach((match) => {
          // This is the merge tag text that needs to be replaced
          const mergeTagText = match[0];
          // Create the new engrid-merge-tag element with the data-name attribute
          const engridMergeTag = `<engrid-merge-tag data-name="${inputName}">${newValue}</engrid-merge-tag>`;
          // Replace the merge tag text with the new engrid-merge-tag element
          element.innerHTML = element.innerHTML.replace(
            mergeTagText,
            engridMergeTag
          );
        });
      });
    });
  };

  // Function to update merge tags based on the input element's name attribute
  const updateMergeTags = (inputName) => {
    const inputElement = document.querySelector(`[name="${inputName}"]`);
    if (!inputElement) return;
    // Capitalize first letter and update merge tags
    const newValue = capitalizeFirstLetter(inputElement.value) || "";
    wrapAndUpdateMergeTag(inputName, newValue);
  };

  // Attach event listeners to inputs to handle value changes
  Object.keys(inputMap).forEach((inputName) => {
    const inputElement = document.querySelector(`[name="${inputName}"]`);
    if (inputElement) {
      inputElement.addEventListener("input", () => updateMergeTags(inputName));
    }
  });

  // Initial call to wrap and update all merge tags on page load
  Object.keys(inputMap).forEach((inputName) => {
    wrapAndUpdateMergeTag(inputName, "");
  });
});
