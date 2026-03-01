import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/dashboard", (req, res) => {
  res.json({
    intervention: [
      { name: "נובה", warning: 10, critical: 2 },
      { name: "ברק", warning: 5, critical: 6 }
    ],
    statusSummary: {
      total: 20,
      onTrack: 12,
      atRisk: 5,
      delayed: 3
    },
    metrics: {
      completed: 62,
      inProgress: 25,
      delayed: 14,
      weeklyChange: 12
    },
    upcomingMilestones: [
      { id: 1, title: "Base23", date: "16.01.2026", status: "onTrack" }
    ]
  });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});