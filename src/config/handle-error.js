export class HandleError {
  constructor(error) {
    this.error = error;
  }
}

export const handleError = (resolver, response) => {
  if (resolver instanceof HandleError) {
    const {
      error: { message, statusCode },
    } = resolver;

    response.status(statusCode ?? 500).json({
      errors: [message],
    });

    return undefined;
  }

  return resolver;
};
