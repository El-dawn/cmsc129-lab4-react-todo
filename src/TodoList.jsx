import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, confirmDelete, editTodo}) {
	return (
		<div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
			<ul className="space-y-3">
				{todos.length === 0 && (
					<li>
						<span className="block text-center text-slate-500 text-lg font-medium py-4">
							No Available Task
						</span>
					</li>
				)}
				{todos.map((todo) => {
					const { key, ...rest } = todo;
					return (
						<li key={key} className="bg-slate-50 rounded-md shadow-sm hover:shadow-md transition-shadow">
							<TodoItem
								{...rest}
								todoKey={key}
								toggleTodo={toggleTodo}
								confirmDelete={confirmDelete}
								editTodo={editTodo}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
