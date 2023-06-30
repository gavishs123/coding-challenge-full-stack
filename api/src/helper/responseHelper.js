// On Error Response
exports.CreateErrorResponse = (
    field,
    error,
    type,
    data
) => {
    return {
        status: 'error',
        success: false,
        errors: {
            [field]: {
                type: type,
                message: error,
                data: data
            },
        },
    }
}

// On Success Response
exports.CreateSuccessResponse = (message, data) => {

    return {
        status: 'success',
        success: true,
        message: message,
        data: data
    }
}