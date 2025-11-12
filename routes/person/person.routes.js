const express = require("express");
const Person = require("../../models/person/person.model");

const router = express.Router();

async function savePerson(personID, data) {
    const person = await Person.findByIdAndUpdate(
        personID,
        data
    );
    return person;
}

async function getPersonByID(personID) {
    const person = await Person.findById(personID).populate("monitored").exec();
    return person;
}

router.post("/", async (req, res) => {
    try {
        const person = req.body;
        const responsibleID = person?.responsavelId;
        delete person.responsavelId

        const newPerson = await Person.create(person);

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
        const person = { ...req.body };
        const personID = req.params.personid;
        const updatedPerson = await savePerson(
            personID,
            person
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
        const people = await Person.find({});
        res.status(200).json(people);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pessoas", message: err });
    }
});

router.get("/getPersonByID/:personid", async (req, res) => {
    try {
        const personID = req.params.personid;
        const person = await getPersonByID(personID);
        res.status(200).json(person);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar pessoa", message: err });
    }
});

router.delete("/:personid", async (req, res, next) => {
    try {
        const personID = req.params?.personid;
        const deletedPerson = await Person.findByIdAndDelete(personID);
        if (!deletedPerson) {
            res.status(400).send({
                error: "Erro ao deletar, pessoa não encontrada",
            });
            return;
        }

        let responsible = await Person.findOne({ monitored: personID });
        if (responsible) {
            responsible.monitored = responsible.monitored.filter(prs => prs != personID);
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