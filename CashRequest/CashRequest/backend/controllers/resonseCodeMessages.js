const response = (code) => {

    let message = "";

    switch (code) {
        case 0:
            message = "Success"
            return message;
        case 1:
            message = "Not Found";
            return message
        case 2:
            message = "Failed";
            return message
        case 3:
            message = "Service Error";
            return message
        case 4:
            message = "Network Error";
            return message
        case 5:
            message = "Unauthorized";
            return message

        default:
            break;
    }
}

module.exports = response;