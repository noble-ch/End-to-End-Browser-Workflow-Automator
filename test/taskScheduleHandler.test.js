import taskScheduleHandler from '@/pages/api/taskScheduleHandler';

describe('Task Scheduler API', () => {
  it('should schedule a task successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        taskId: '123',
        scheduleTime: '2025-01-28T10:00:00Z',
      },
    });

    await taskScheduleHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Task scheduled successfully',
    });
  });

  it('should return an error for invalid input', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        taskId: '',
        scheduleTime: '',
      },
    });

    await taskScheduleHandler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Invalid input',
    });
  });
});
