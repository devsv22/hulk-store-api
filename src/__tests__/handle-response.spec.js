import { HandleError } from '@/config/handle-error';
import { handleResponse } from '@/config/handle-response';

const responseMock = {
  status: (statusCode = 200) => {
    return {
      json: (content) => {
        return {};
      },
    };
  },
};

const fn = jest.fn();

describe('ResponseHandling', () => {
  it('should handle response with a fail status code', () => {
    const result = handleResponse(
      responseMock,
      new HandleError({
        message: 'Error',
        statusCode: 401,
      }),
    );

    expect(result).toBeUndefined();
  });

  it('should handle response with a success status code', () => {
    const result = handleResponse(responseMock, fn);

    expect(result).toStrictEqual({});
  });
});
