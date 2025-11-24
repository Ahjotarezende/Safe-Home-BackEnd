const express = require("express");
const router = express.Router();

const Monitoring = require("../../models/monitoring/monitoring.model");
const Person = require("../../models/person/person.model");

router.post("/", async (req, res) => {
    try {
        const monitoring = req.body;

        const newMonitoring = await Monitoring.create(monitoring);

        if (!newMonitoring) {
            res.status(500).json({ error: "Erro ao criar novo registro de incidente" });
        }

        res.status(200).json({ message: "Registro de incidente criado com sucesso", data: newMonitoring });
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar incidente", message: err });
    }
});

router.get("/getMonitoringByResponsibleID/:responsibleid", async (req, res) => {
    try {
        const personID = req.params.responsibleid;
        const person = await Person.findById(personID);
        const IDsOfThoseMonitored = person?.monitored;
        const monitorings = await Monitoring.find({ monitored: { $in: IDsOfThoseMonitored } }).populate("monitored").exec();
        res.status(200).json(monitorings);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar incidentes", message: err });
    }
});

router.get("/getMonitoringByPersonID/:personid", async (req, res) => {
    try {
        const personID = req.params.personid;
        const monitoring = await Monitoring.find({ monitored: personID }).populate("monitored").exec();
        res.status(200).json(monitoring);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar incidente da pessoa", message: err });
    }
});

module.exports = router;