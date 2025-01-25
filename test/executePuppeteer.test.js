import executePuppeteerHandler from '@/pages/api/executePuppeteer';

describe('Execute Puppeteer API', () => {
  it('should execute a Puppeteer task successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        taskId: '123',
      },
    });

    await executePuppeteerHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Puppeteer task executed successfully',
      output: expect.any(Object),
    });
  });

  it('should return an error for a missing task ID', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        taskId: '',
      },
    });

    await executePuppeteerHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Task ID is required',
    });
  });
});
