import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

interface Posts {
	[key: string]: {
		id: string;
		title: string;
		comments: {
			id: string;
			content: string;
			status: string;
		}[];
	};
}

const posts: Posts = {};

const handleEvent = (type: string, data: any) => {
	if (type === "PostCreated") {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}

	if (type === "CommentCreated") {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		post.comments.push({ id, content, status });
	}

	if (type === "CommentUpdated") {
		const { id, content, postId, status } = data;

		const post = posts[postId];
		const comment = post.comments.find((comment) => {
			return comment.id === id;
		})!;

		comment.status = status;
		comment.content = content;
	}
};

app.get("/posts", (req: express.Request, res: express.Response) => {
	res.send(posts);
});

app.post("/events", (req: express.Request, res: express.Response) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	res.send({});
});

app.listen(4002, async () => {
	console.log("listening on 4002");

	const res = await axios.get("http://event-bus-srv:4005/events");

	for (let event of res.data) {
		handleEvent(event.type, event.data);
	}
});
