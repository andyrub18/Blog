import axios from "axios";
import { FormEvent, useState } from "react";

const PostCreate = () => {
	const [title, setTitle] = useState("");

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		await axios.post("http://posts.com/posts/create", {
			title,
		});

		setTitle("");
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group mb-4">
					<label>Title</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="form-control"
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};
export default PostCreate;
