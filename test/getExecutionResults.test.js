import getExecutionResultsHandler from '@/pages/api/getExecutionResults';

describe('Get Execution Results API', () => {
  it('should retrieve execution results successfully', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { taskId: '123' },
    });

    await getExecutionResultsHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      results: expect.any(Array),
    });
  });

  it('should return an error if task ID is missing', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { taskId: '' },
    });

    await getExecutionResultsHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Task ID is required',
    });
  });
});
