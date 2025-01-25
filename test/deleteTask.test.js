import deleteTaskHandler from '@/pages/api/deleteTask';

describe('Delete Task API', () => {
  it('should delete a task successfully', async () => {
    const { req, res } = createMocks({
      method: 'DELETE',
      body: {
        taskId: '123',
      },
    });

    await deleteTaskHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Task deleted successfully',
    });
  });
});
