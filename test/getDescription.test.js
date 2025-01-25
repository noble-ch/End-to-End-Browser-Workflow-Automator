import getDescriptionHandler from '@/pages/api/getDescription';

describe('Get Description API', () => {
  it('should fetch a task description successfully', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { taskId: '123' },
    });

    await getDescriptionHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      description: expect.any(String),
    });
  });
});
