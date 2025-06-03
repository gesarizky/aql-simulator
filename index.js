import express from "express";
import { sampleCodeTable } from "./sampleCodeTable.js";
import { samplingPlanTable } from "./samplingPlanTable.js";

const app = express();
app.use(express.json());
const port = 3000;

app.post("/simulate-aql", (req, res) => {
  const { lotSize, inspectionLevel, aql } = req.body;

  if (!lotSize || !inspectionLevel || !aql) {
    return res
      .status(400)
      .json({ error: "lotSize, inspectionLevel, and aql are required" });
  }

  const parsedAql = parseFloat(aql);
  const row = sampleCodeTable.find((r) => lotSize <= r.maxLotSize);
  if (!row) return res.status(404).json({ error: "Lot size out of range" });

  const sampleCode = row[inspectionLevel];
  if (!sampleCode)
    return res.status(404).json({ error: "Invalid inspection level" });

  const plan = samplingPlanTable[sampleCode];
  if (!plan || !plan.aql[parsedAql]) {
    return res.status(404).json({ error: "No plan found for given AQL level" });
  }

  const { size, aql: aqlPlan } = plan;
  const { ac, re } = aqlPlan[parsedAql];

  return res.json({
    lotSize,
    inspectionLevel,
    aql: parsedAql,
    sampleSizeCode: sampleCode,
    sampleSize: size,
    acceptanceNumber: ac,
    rejectionNumber: re,
  });
});

app.listen(port, () => {
  console.log(`AQL Simulator running at http://localhost:${port}`);
});