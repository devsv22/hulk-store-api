import { HandleError, handleError } from '@/config/handle-error';

const fn = jest.fn();

const responseMock = {
  status: (statusCode = 200) => {
    return {
      json: (content) => {
        return {  };
      },
    };
  },
};

describe('ErrorHandling', () => {
  it('should handle a success response', () => {
    const result = handleError(fn);

    expect(result).toBe(fn);
  });

  it('should handle a failure response', () => {
    const result = handleError(
      new HandleError({
        message: 'Error',
        statusCode: 401,
      }),
      responseMock,
    );

    expect(result).toBeUndefined();
  });
});
