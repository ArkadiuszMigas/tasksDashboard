import { create } from "zustand";
import { Task, TaskStatus } from "../types";
import { auth, db } from "../lib/firebase";
import {
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;
}

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  isLoading: true,

  addTask: async (title: string) => {
    const newTask: Omit<Task, "id"> = {
      title,
      status: "todo",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (auth.currentUser) {
      const taskId = Date.now().toString();
      await setDoc(doc(db, "Users", auth.currentUser.uid, "tasks", taskId), {
        id: taskId,
        ...newTask,
      });
    } else {
      const tasks = [...get().tasks];
      const task: Task = { ...newTask, id: Date.now().toString() };
      tasks.push(task);
      set({ tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    if (auth.currentUser) {
      await updateDoc(doc(db, "Users", auth.currentUser.uid, "tasks", id), {
        ...updates,
        updatedAt: Date.now(),
      });
    } else {
      const tasks = get().tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: Date.now() } : task
      );
      set({ tasks });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  },

  deleteTask: async (id: string) => {
    if (auth.currentUser) {
      await deleteDoc(doc(db, "Users", auth.currentUser.uid, "tasks", id));
    } else {
      const currentTasks = get().tasks;
      const updatedTasks = currentTasks.filter((task) => task.id !== id);
      set({ tasks: updatedTasks });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  },

  moveTask: async (taskId: string, newStatus: TaskStatus) => {
    await get().updateTask(taskId, { status: newStatus });
  },
}));

auth.onAuthStateChanged((user) => {
  if (user) {
    const tasksCollection = collection(db, "Users", user.uid, "tasks");
    onSnapshot(tasksCollection, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      useTaskStore.setState({ tasks, isLoading: false });
    });
  } else {
    const localTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    useTaskStore.setState({ tasks: localTasks, isLoading: false });
  }
});

export default useTaskStore;
