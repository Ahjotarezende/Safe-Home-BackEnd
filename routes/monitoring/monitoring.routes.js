const express = require("express");
const router = express.Router();

const Monitoring = require("../../models/monitoring/monitoring.model");

async function saveMonitoring(monitoringID, data) {
    const monitoring = await Monitoring.findByIdAndUpdate(
        monitoringID,
        data
    );
    return monitoring;
}

async function getPersonByID(monitoringID) {
    const monitoring = await Monitoring.findById(monitoringID).populate("monitored").exec();
    return monitoring;
}

router.post("/", async (req, res) => {
    try {
        const monitoring = req.body;
        const responsibleID = monitoring?.responsavelId;
        delete monitoring.responsavelId

        const newPerson = await Monitoring.create(monitoring);

        if (!newPerson) {
            res.status(500).json({ error: "Erro ao criar nova pessoa" });
        }

        if (responsibleID) {
            const responsible = await getPersonByID(responsibleID);
            responsible.monitored.push(newPerson);
            await savePerson(responsibleID, responsible);
        }

        res.status(200).json({ message: "Pessoa criada com sucesso", data: newPerson });
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar pessoa", message: err });
    }
});

router.put("/:personid", async (req, res) => {
    try {
        const monitoring = { ...req.body };
        const monitoringID = req.params.personid;
        const updatedPerson = await savePerson(
            monitoringID,
            monitoring
        );
        if (!updatedPerson) {
            res.status(400).json({ error: "Pessoa não existe" });
            return;
        }
        res.status(200).json({ message: "Editado com sucesso!", data: updatedPerson });
    } catch (err) {
        res.status(500).json({ error: "Erro ao editar pessoa", message: err });
    }
});

router.get("/", async (req, res) => {
    try {
        const people = await Monitoring.find({});
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pessoas", message: err });
    }
});

router.get("/getPersonByID/:personid", async (req, res) => {
    try {
        const monitoringID = req.params.personid;
        const monitoring = await getPersonByID(monitoringID);
        res.status(200).json(monitoring);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pessoa", message: err });
    }
});

router.get("/getMonitored/:personid", async (req, res) => {
    try {
        const monitoringID = req.params.personid;
        const monitoring = await getPersonByID(monitoringID);
        const monitored = monitoring.monitored;
        res.status(200).json(monitored);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pessoa", message: err });
    }
});

router.delete("/:personid", async (req, res, next) => {
    try {
        const monitoringID = req.params?.personid;
        const deletedPerson = await Monitoring.findByIdAndDelete(monitoringID);
        if (!deletedPerson) {
            res.status(400).send({
                error: "Erro ao deletar, pessoa não encontrada",
            });
            return;
        }

        let responsible = await Monitoring.findOne({ monitored: monitoringID });
        if (responsible) {
            responsible.monitored = responsible.monitored.filter(prs => prs != monitoringID);
            await savePerson(
                responsible._id,
                responsible
            );
        }

        res.status(200).json({
            message: "Pessoa deletada com sucesso",
            data: deletedPerson,
        });
    } catch (err) {
        res.status(500).send({ error: "Erro ao deletar pessoa", message: err });
    }
});

module.exports = router;