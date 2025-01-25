import stopPuppeteerHandler from '@/pages/api/stopPuppeteer';

describe('Stop Scheduled Tasks API', () => {
  it('should stop a scheduled task successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        taskId: '123',
      },
    });

    await stopPuppeteerHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Task stopped successfully',
    });
  });

  it('should return an error if the taskId is missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        taskId: '',
      },
    });

    await stopPuppeteerHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Task ID is required',
    });
  });
});
