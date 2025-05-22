import { useState } from "react";

export default function NewTodoForm({ onSubmit }) {
	const [newItem, setNewItem] = useState("");
	const [newDate, setNewDate] = useState("");
	const [newTime, setNewTime] = useState("");
	const [newTag, setNewTag] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (newItem === "") return;

		onSubmit(newItem, newDate, newTime, newTag);
		setNewItem("");
		setNewDate("");
		setNewTime("");
		setNewTag("");
	}

	function handleTagClick(tag) {
		if (tag == "High" && newTag !== "High") {
			setNewTag("High");
		} else if (tag == "Low" && newTag !== "Low") {
			setNewTag("Low");
		} else if (tag == "Mid" && newTag !== "Mid") {
			setNewTag("Mid");
		} else if (tag == "High" && newTag == "High") {
			setNewTag("");
		} else if (tag == "Low" && newTag == "Low") {
			setNewTag("");
		} else if (tag == "Mid" && newTag == "Mid") {
			setNewTag("");
		} else {
			setNewTag(tag);
		}
	}
  

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-xl mx-auto flex flex-col gap-4 items-center justify-center p-6 bg-white rounded-2xl shadow-lg"
		>
			<div className="bg-gray-100 rounded-full flex items-center w-full px-4 py-2 shadow-sm">
				<input
					className="bg-transparent flex-1 border-0 pl-3 outline-none h-12 text-base placeholder:text-slate-500"
					value={newItem}
					onChange={(e) => setNewItem(e.target.value)}
					type="text"
					placeholder="Add your task"
					id="item"
				/>
				<div className="min-h-[1em] w-px self-stretch bg-gradient-to-tr mx-3 from-transparent via-neutral-400 to-transparent opacity-30" />
				{["High", "Mid", "Low"].map((tag) => (
					<button
						key={tag}
						className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-150 mx-1
							${newTag === tag
								? tag === "High"
									? "bg-red-200 text-red-800 ring-2 ring-red-400"
									: tag === "Mid"
									? "bg-yellow-200 text-yellow-800 ring-2 ring-yellow-400"
									: "bg-green-200 text-green-800 ring-2 ring-green-400"
								: "bg-gray-200 text-gray-500 hover:bg-gray-300 hover:text-gray-700"
							}
						`}
						value={tag}
						type="button"
						onClick={(e) => handleTagClick(e.target.value)}
					>
						{tag}
					</button>
				))}
			</div>

			<div className="flex flex-row items-center justify-between w-full gap-4">
				<div className="flex items-center gap-2">
					<label className="text-sm font-medium text-gray-700">Date:</label>
					<input
						className="w-[150px] p-2 border-0 outline-none pl-2 py-2 rounded-full bg-gray-100 text-gray-700 focus:ring-2 focus:ring-orange-400 transition"
						value={newDate}
						onChange={(e) => setNewDate(e.target.value)}
						type="date"
						id="date"
					/>
				</div>
				<div className="flex items-center gap-2">
					<label className="text-sm font-medium text-gray-700">Due Time:</label>
					<input
						className="w-[150px] p-2 border-0 outline-none pl-2 py-2 rounded-full bg-gray-100 text-gray-700 focus:ring-2 focus:ring-orange-400 transition"
						value={newTime}
						onChange={(e) => setNewTime(e.target.value)}
						type="time"
						id="time"
					/>
				</div>
			</div>
			<button className="mt-4 border-none rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 hover:from-orange-600 hover:to-orange-800 w-full h-14 text-white text-lg font-bold shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
				ADD +
			</button>
		</form>
	);
}
