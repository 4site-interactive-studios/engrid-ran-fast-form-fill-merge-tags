document.addEventListener('DOMContentLoaded', (event) => {

    // Function to capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Map of input names to text patterns
    const inputMap = {
        'supporter.firstName': /\{user_data~First Name(?:~(\S+))?\}/,
        'supporter.lastName': /\{user_data~Last Name(?:~(\S+))?\}/,
        'supporter.emailAddress': /\{user_data~Email(?:~(\S+))?\}/,
        'supporter.address1': /\{user_data~Address(?:~(\S+))?\}/,
        'supporter.address2': /\{user_data~Apt ste bldg(?:~(\S+))?\}/,
        'supporter.city': /\{user_data~City(?:~(\S+))?\}/,
        'supporter.postcode': /\{user_data~Zip or Postal Code(?:~(\S+))?\}/,
        'supporter.region': /\{user_data~State or Province(?:~(\S+))?\}/,
        'supporter.country': /\{user_data~Country(?:~(\S+))?\}/,
    };

    // Function to process elements and replace text
    const processElements = (elements, tags) => {
        for (let element of elements) {
            for (let tag of tags) {
                const tagElements = element.querySelectorAll(tag);
                for (let tagElement of tagElements) {
                    for (let inputName in inputMap) {
                        const regex = inputMap[inputName];
                        const match = regex.exec(tagElement.innerHTML);
                        if (match) {
                            const inputElement = document.querySelector(`[name="${inputName}"]`);
                            let replacementString;
                            if (inputElement && inputElement.value) {
                                replacementString = capitalizeFirstLetter(inputElement.value);
                            } else if (match[1]) {
                                // Use the extracted fallback value if the input field is missing or the value is empty
                                replacementString = match[1];
                            } else {
                                // No replacement could be determined, set replacementString to empty to remove the matched string
                                replacementString = '';
                            }
                            tagElement.innerHTML = tagElement.innerHTML.replace(regex, replacementString);
                            console.log(`Replaced text in a ${tag} element with: ${replacementString}`);
                        }
                    }
                }
            }
        }
    }

    // Find elements with the specified classes and process their siblings
    const classSelectors = ['.showif-fast-personal-details', '.showif-fast-address-details'];
    for (let classSelector of classSelectors) {
        const classElements = document.querySelectorAll(classSelector);
        for (let classElement of classElements) {
            // Get the parent element to access siblings
            const parentElement = classElement.parentElement;
            if (parentElement) {
                const tags = ['h1', 'h2', 'h3', 'p', 'strong', 'i', 'span', 'div'];
                // Process the sibling elements of each class element
                processElements(parentElement.children, tags);
            }
        }
    }

});