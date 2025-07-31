import { Task } from "@/data/entities/Task";

describe("Task entity", () => {
  const mockDate = new Date("2025-01-01T12:00:00Z");
  let task: Task;

  beforeEach(() => {
    task = new Task("1", "user123", "project456", "Task Title", "Task description", mockDate, null, new Date());
  });

  test("should initialize with correct values", () => {
    expect(task.id).toBe("1");
    expect(task.user_id).toBe("user123");
    expect(task.project_id).toBe("project456");
    expect(task.name).toBe("Task Title");
    expect(task.description).toBe("Task description");
    expect(task.due_date).toEqual(mockDate);
    expect(task.completed_on).toBeNull();
  });

  test("should set completed_on when task is completed", () => {
    expect(task.completed_on).toBeNull();
    task.markAsCompleted();
    expect(task.completed_on).toBeInstanceOf(Date);
  });

  test("should throw error when trying to complete an already completed task", () => {
    task.markAsCompleted();
    expect(() => task.markAsCompleted()).toThrow();
  });

  test("should return correct priority level based on due date", () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    task.due_date = tomorrow;
    expect(task.getPriorityLevel()).toBe("high");

    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    task.due_date = nextWeek;
    expect(task.getPriorityLevel()).toBe("low");

    task.due_date = null;
    expect(task.getPriorityLevel()).toBeNull();
  });

  test("should exclude 'created_at' and include 'priority_level' when transforming to DTO", () => {
    const taskDto = task.asDto();
    expect(taskDto).not.toHaveProperty("created_at");
    expect(taskDto).toHaveProperty("priority_level");
  });
});
