import tick from "./assets/tick.png";
import notTick from "./assets/not_tick.png";
import deleteIcon from "./assets/delete.png";
import clock from "./assets/clock.png";
import calendar from "./assets/calendar.png";
import edit from "./assets/edit.png";

export default function TodoItem({
	completed,
	todoKey, // Firebase key
	title,
	date,
	time,
	tag,
	toggleTodo,
	confirmDelete,
	editTodo,
}) {
	return (
		<div className="bg-white shadow-lg rounded-xl flex items-center my-4 px-6 py-4 transition-all duration-200 hover:shadow-2xl hover:scale-[1.01] border border-slate-100">
			<div
				onClick={() => toggleTodo(todoKey)}
				className="flex flex-col flex-1 cursor-pointer select-none"
			>
				<div className="flex items-center">
					<img
						src={completed ? tick : notTick}
						className="w-7 h-7 transition-all duration-200"
						alt={completed ? "Completed" : "Not completed"}
					/>
					<p
						className={`ml-4 text-lg font-medium max-w-[250px] break-words transition-all duration-200 ${
							completed
								? "line-through text-gray-400"
								: "text-gray-800"
						}`}
					>
						{title}
					</p>
					{tag && (
						<span
							className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold border ${
								tag === "High"
									? "bg-red-100 text-red-700 border-red-200"
									: tag === "Mid"
									? "bg-yellow-100 text-yellow-700 border-yellow-200"
									: tag === "Low"
									? "bg-green-100 text-green-700 border-green-200"
									: "bg-gray-100 text-gray-500 border-gray-200"
							}`}
						>
							{tag}
						</span>
					)}
				</div>
				<div className="flex items-center mt-2 ml-11 gap-4 text-sm text-gray-500">
					<div className="flex items-center gap-1">
						<img className="w-4 h-4" src={calendar} alt="Date" />
						<span>{date ? date : "N/A"}</span>
					</div>
					<div className="flex items-center gap-1">
						<img className="w-4 h-4" src={clock} alt="Time" />
						<span>{time ? time : "N/A"}</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2 ml-4">
				<button
					onClick={() => editTodo(todoKey)}
					className="p-2 rounded-full hover:bg-blue-100 transition-colors"
					title="Edit"
				>
					<img src={edit} className="w-4 h-4" alt="Edit" />
				</button>
				<button
					onClick={() => confirmDelete(todoKey)}
					className="p-2 rounded-full hover:bg-red-100 transition-colors"
					title="Delete"
				>
					<img src={deleteIcon} className="w-4 h-4" alt="Delete" />
				</button>
			</div>
		</div>
	);
}
