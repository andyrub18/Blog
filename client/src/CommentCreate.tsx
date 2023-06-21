import axios from "axios";
import { FormEvent, useState } from "react";

const CommentCreate = ({ postId }: { postId: string }) => {
	const [content, setContent] = useState("");

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();

		await axios.post(`http://posts.com/posts/${postId}/comments`, {
			content,
		});

		setContent("");
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group mb-2">
					<label>New Comment</label>
					<input
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="form-control"
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
};
export default CommentCreate;
