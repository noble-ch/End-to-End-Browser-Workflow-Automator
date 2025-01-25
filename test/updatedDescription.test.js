import editDescriptionHandler from '@/pages/api/updatedDescription';

describe('Edit Description API', () => {
  it('should update a task description successfully', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        taskId: '123',
        newDescription: 'Updated description',
      },
    });

    await editDescriptionHandler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'Description updated successfully',
    });
  });
});
