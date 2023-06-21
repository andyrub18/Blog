import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const events: any[] = [];

app.post("/events", (req: express.Request, res: express.Response) => {
	const event = req.body;

	events.push(event);

	axios
		.post("http://posts-clusterip-srv:4000/events", event)
		.catch((err: Error) => console.log(err));
	axios
		.post("http://comments-srv:4001/events", event)
		.catch((err: Error) => console.log(err));
	axios
		.post("http://query-srv:4002/events", event)
		.catch((err: Error) => console.log(err));
	axios
		.post("http://moderation-srv:4003/events", event)
		.catch((err: Error) => console.log(err));

	res.send({ status: "OK" });
});

app.get("/events", (req: express.Request, res: express.Response) => {
	res.send(events);
});

app.listen(4005, () => {
	console.log("Listening on 4005");
});
