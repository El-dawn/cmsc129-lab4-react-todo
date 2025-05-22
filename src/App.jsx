import { useEffect, useState } from "react";
import "./styles.css";
import todoicon from "./assets/todo_icon.png";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import DeleteTodoItem from "./DeleteTodoItem";
import EditTodoForm from "./EditTodoForm";
import app from "../configuration.jsx";
import {
	getDatabase,
	ref,
	onValue,
	push,
	remove,
	update,
	set,
} from "firebase/database";

export default function App() {
	const [todos, setTodos] = useState([]);
	const [showToast, setShowToast] = useState(false); // Toast state
	const [lastDeleted, setLastDeleted] = useState(null); // State to store the last deleted todo for undo
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [editTodoData, setEditTodoData] = useState(null);
	const [deleteKey, setDeleteKey] = useState(null);

	const database = getDatabase(app);
	const todosRef = ref(database, "todos");

	useEffect(() => {
		const unsubscribe = onValue(todosRef, (snapshot) => {
			const data = snapshot.val();
			if (data) {
				const todosArray = Object.entries(data).map(([key, todo]) => ({
					key,
					...todo,
				}));
				// Sort by order if it exists, otherwise fallback to original order
				todosArray.sort((a, b) => {
					if (typeof a.order === "number" && typeof b.order === "number") {
						return a.order - b.order;
					}
					return 0;
				});
				setTodos(todosArray);
			} else {
				setTodos([]);
			}
		});
		return () => unsubscribe();
	}, []);
	
	function addTodo(title, date, time, tag) {
		const newTodo = {
			title,
			date,
			time,
			tag,
			completed: false,
		};
		push(todosRef, newTodo);
	}

	function toggleTodo(key) {
		const todo = todos.find((t) => t.key === key);
		if (!todo) return;
		const todoRef = ref(database, `todos/${key}`);
		update(todoRef, { completed: !todo.completed });
	}

	function confirmDelete(key) {
		setDeleteKey(key);
		setIsDeleteModalOpen(true);
	}

	function deleteTodo(key) {
		const todoToDelete = todos.find((todo) => todo.key === key);
		if (!todoToDelete) return;
		const todoRef = ref(database, `todos/${key}`);
		setLastDeleted({ ...todoToDelete, key }); // Save for undo
		remove(todoRef);
		setShowToast(true);
		setTimeout(() => setShowToast(false), 2000);
		setDeleteKey(null);
	}

	function editTodo(key) {
		const todoToEdit = todos.find((todo) => todo.key === key);
		setEditTodoData(todoToEdit);
		setIsEditModalOpen(true);
	}

	function handleEdit(key, title, date, time, tag) {
		const todoRef = ref(database, `todos/${key}`);
		update(todoRef, { title, date, time, tag });
		setIsEditModalOpen(false);
		setEditTodoData(null);
	}

	function handleUndo() {
		if (lastDeleted) {
			const { key, ...todoData } = lastDeleted;
			push(todosRef, todoData);
			setLastDeleted(null);
			setShowToast(false);
		}
	}

	async function toggleSort(value) {
		let sortedTodos = [];
		if (value === "dateadded") {
			sortedTodos = [...todos].sort((a, b) => {
				if (!a.date) return 1;
				if (!b.date) return -1;
				return new Date(b.date) - new Date(a.date);
			});
		} else if (value === "duetime") {
			sortedTodos = [...todos].sort((a, b) => {
				if (!a.time) return 1;
				if (!b.time) return -1;
				return (
					new Date(`1970-01-01T${b.time}`) - new Date(`1970-01-01T${a.time}`)
				);
			});
		} else if (value === "priority") {
			sortedTodos = [...todos].sort((a, b) => {
				const priorityOrder = { High: 1, Mid: 2, Low: 3 };
				const aPriority = priorityOrder[a.tag] || 4;
				const bPriority = priorityOrder[b.tag] || 4;
				return aPriority - bPriority;
			});
		}

		setTodos(sortedTodos);

		// Update the order in Firebase
		const updates = {};
		sortedTodos.forEach((todo, index) => {
			updates[`${todo.key}/order`] = index;
		});
		await update(todosRef, updates);
	}

	return (
		<>
			{/* Toast for Undo Delete */}
			{showToast && (
				<DeleteTodoItem
					lastDeleted={lastDeleted}
					handleUndo={handleUndo}
					setShowToast={setShowToast}
				/>
			)}

			{/* Edit Modal */}
			{isEditModalOpen && editTodoData && (
				<EditTodoForm
					setIsEditModalOpen={setIsEditModalOpen}
					editTodoData={editTodoData}
					onSubmit={handleEdit}
				/>
			)}

			{/* Delete Confirmation Modal */}
			{isDeleteModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
					<div className="bg-white rounded-2xl p-8 w-96 shadow-2xl relative z-10 border border-gray-200">
						<button
							className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
							onClick={() => setIsDeleteModalOpen(false)}
							aria-label="Close"
						>
							&times;
						</button>
						<h2 className="text-xl font-bold mb-3 text-gray-800">Delete Task?</h2>
						<p className="mb-7 text-gray-600">Are you sure you want to delete this item? This action cannot be undone.</p>
						<div className="flex justify-end gap-3">
							<button
								className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
								onClick={() => setIsDeleteModalOpen(false)}
							>
								Cancel
							</button>
							<button
								className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
								onClick={() => {
									deleteTodo(deleteKey);
									setIsDeleteModalOpen(false);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Main App Container */}
			<div className="bg-gradient-to-br from-blue-900 via-indigo-950 to-gray-900 min-h-screen py-10 px-2">
				<div className="bg-white/90 backdrop-blur-md shadow-2xl mx-auto w-full max-w-xl flex flex-col p-8 min-h-[600px] rounded-3xl border border-gray-200">
					{/* Header */}
					<div className="flex items-center gap-5 mb-10 px-4 py-4 bg-gradient-to-r from-blue-700 via-indigo-800 to-blue-900 rounded-2xl shadow-lg">
						<img
							src={todoicon}
							alt="Todo Icon"
							className="w-14 h-14 drop-shadow-xl bg-white rounded-full p-2 border-2 border-blue-300"
						/>
						<h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
							To-Do List
						</h1>
					</div>
					
					{/* New Todo Form */}
					<div className="mb-8">
						<NewTodoForm onSubmit={addTodo} />
					</div>

					{/* Sort Dropdown */}
					<div className="flex items-center justify-end mb-6">
						<label className="text-gray-700 font-semibold mr-3 text-lg">Sort by:</label>
						<div className="relative">
							<select
								className="appearance-none border border-gray-300 rounded-xl px-4 py-2 pr-10 bg-white shadow focus:ring-2 focus:ring-blue-400 outline-none transition text-gray-800 font-medium hover:border-blue-400"
								onChange={(e) => toggleSort(e.target.value)}
							>
								<option value="dateadded">Date Added</option>
								<option value="duetime">Due Time</option>
								<option value="priority">Priority</option>
							</select>
							<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
								▼
							</span>
						</div>
					</div>

					{/* Todo List */}
					<div className="flex-1 overflow-y-auto custom-scrollbar">
						<TodoList
							todos={todos}
							toggleTodo={toggleTodo}
							confirmDelete={confirmDelete}
							editTodo={editTodo}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
