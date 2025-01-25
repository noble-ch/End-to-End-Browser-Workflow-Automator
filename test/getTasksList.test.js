import createTaskHandler from '@/pages/api/getTasksList';

describe('Create Task API', () => {
  it('should create a task successfully', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'New Task',
        description: 'Task description',
      },
    });

    await createTaskHandler(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Task created successfully',
      task: expect.any(Object),
    });
  });
});
