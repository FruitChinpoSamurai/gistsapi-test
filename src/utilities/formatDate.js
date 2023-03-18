// A simple function to format the datetime received from the API into the one shown in the desired screenshot.

export const cleanDate = date => {
    let removeFromIndex = date.indexOf("T");
    let justDate = date.substring(0, removeFromIndex);
    let splitDateArray = justDate.split('-');
    let formattedDate = splitDateArray[2] + "/" + splitDateArray[1] + "/" + splitDateArray[0];
    return formattedDate
};