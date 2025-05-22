import { useEffect, useState } from "react";

export default function EditTodoForm({
	setIsEditModalOpen,
	editTodoData,
	onSubmit,
}) {
	const [newItem, setNewItem] = useState("");
	const [newDate, setNewDate] = useState("");
	const [newTime, setNewTime] = useState("");
	const [newTag, setNewTag] = useState("");

	useEffect(() => {
		if (editTodoData) {
			setNewTag(editTodoData.tag || "");
			setNewItem(editTodoData.title || "");
			setNewDate(editTodoData.date || "");
			setNewTime(editTodoData.time || "");
		}
	}, [editTodoData]);

	function handleEdit(e) {
		e.preventDefault();
		if (newItem === "") {
			setIsEditModalOpen(false);
			return;
		}

		onSubmit(editTodoData.key, newItem, newDate, newTime, newTag);
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
		<>
			<div
				id="crud-modal"
				tabIndex="-1"
				aria-hidden="false"
				className="fixed inset-0 flex items-center justify-center z-50"
				style={{
					background: "rgba(30,41,59,0.6)",
					backdropFilter: "blur(6px)",
					WebkitBackdropFilter: "blur(6px)",
				}}
			>
				<div className="bg-white rounded-3xl p-10 w-full max-w-md shadow-2xl relative z-10 border border-gray-100">
					<div className="flex items-center justify-between mb-8">
						<h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
							Edit Todo
						</h3>
						<button
							type="button"
							className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-3xl transition"
							onClick={() => setIsEditModalOpen(false)}
							aria-label="Close"
						>
							&times;
						</button>
					</div>
					<form
						onSubmit={handleEdit}
						className="space-y-6"
					>
						<div>
							<label
								htmlFor="edit-title"
								className="block mb-2 text-sm font-semibold text-slate-700"
							>
								Title
							</label>
							<input
								type="text"
								name="edit-title"
								id="edit-title"
								className="bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm transition"
								defaultValue={editTodoData.title}
								onChange={(e) => setNewItem(e.target.value)}
								placeholder="Enter todo title"
								autoFocus
							/>
						</div>
						<div>
							<label className="block mb-2 text-sm font-semibold text-slate-700">
								Priority
							</label>
							<div className="flex gap-3">
								{["High", "Mid", "Low"].map((level) => (
									<button
										key={level}
										className={`px-4 py-1.5 rounded-full text-sm font-bold border-2 shadow-sm transition focus:outline-none ${
											newTag === level
												? level === "High"
													? "bg-red-200 text-red-800 ring-2 ring-red-400"
													: level === "Mid"
														? "bg-yellow-200 text-yellow-800 ring-2 ring-yellow-400"
														: "bg-green-200 text-green-800 ring-2 ring-green-400"
												: "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
										}`}
										value={level}
										type="button"
										onClick={(e) => handleTagClick(e.target.value)}
									>
										{level}
									</button>
								))}
							</div>
						</div>
						<div className="flex gap-4">
							<div className="flex-1">
								<label
									htmlFor="edit-date"
									className="block mb-2 text-sm font-semibold text-slate-700"
								>
									Date
								</label>
								<input
									type="date"
									name="edit-date"
									id="edit-date"
									className="bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm transition"
									defaultValue={editTodoData.date}
									onChange={(e) => setNewDate(e.target.value)}
								/>
							</div>
							<div className="flex-1">
								<label
									htmlFor="edit-time"
									className="block mb-2 text-sm font-semibold text-slate-700"
								>
									Time
								</label>
								<input
									type="time"
									name="edit-time"
									id="edit-time"
									className="bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm transition"
									defaultValue={editTodoData.time}
									onChange={(e) => setNewTime(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex justify-end gap-4 mt-8">
							<button
								type="button"
								className="px-5 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition font-semibold shadow"
								onClick={() => setIsEditModalOpen(false)}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="px-5 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition font-bold shadow"
							>
								Save
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
