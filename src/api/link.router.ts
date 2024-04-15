import { Router, Request, Response } from "express";
import { UrlMapping } from "../entity/urlMapping";
import {AppDataSource} from "../database/source";

const router = Router();

// TODO: Add authentication

import {check} from "express-validator";
import {validation} from "../middleware/validation.middleware";

router.post("/shorten",
    [
        check("url")
            .isURL()
            .withMessage("Must be a valid URL"),

        check("shortId")
            .optional()
            .isString()
            .withMessage("Must be a string")
            .matches(/^[a-z0-9]+$/i)
            .withMessage("Must be a string mixed of numbers and letters"),
    ],
    validation,
    async (req: Request, res: Response) => {
        const {
            url
        } = req.body;

        const shortId = req.body.shortId || Math.random().toString(36).substring(2, 8);

        const existingLink = await AppDataSource.getConnection().getRepository(UrlMapping).findOne({where: {shortId}});

        if (existingLink) {
            return res.status(400).json({message: "Short ID already exists. Please choose another ID."});
        }

        const link = new UrlMapping();

        link.originalUrl = url;
        link.shortId = shortId;

        try {
            await AppDataSource.getConnection().getRepository(UrlMapping).save(link);

            res.status(200).json({
                url,
                shortId,
                message: `Successfully creating link. You may retrieve the link at api.linkly/${shortId}`
            });
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
);

router.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;

    const link = await AppDataSource.getConnection().getRepository(UrlMapping).findOne({ where: { shortId } });

    if (link) {
        res.redirect(link.originalUrl);
    } else {
        // TODO: Add a custom 404 page and alert the user about it.
        res.status(404).json({ error: "Not Found" });
    }
});


// Route for Deleting a link
router.delete("/:shortId",
    [
        check("shortId")
            .exists()
            .isString()
            .withMessage("Must be a string")
            .matches(/^[a-z0-9]+$/i)
            .withMessage("Must be a string mixed of numbers and letters"),
    ],
    validation,
    async (req: Request, res: Response) => {
        const {shortId} = req.params;

        const link = await AppDataSource.getConnection().getRepository(UrlMapping).findOne({where: {shortId}});

        if (!link) {
            return res.status(404).json({error: "Not Found"});
        }

        try {
            await AppDataSource.getConnection().getRepository(UrlMapping).delete(link);

            res.status(200).json({
                message: `Successfully deleted link ${shortId}`
            });
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
);

// Route for adding a link mapping to Archive
router.post("/archive/:shortId",
    [
        check("shortId")
            .exists()
            .isString()
            .withMessage("Must be a string")
            .matches(/^[a-z0-9]+$/i)
            .withMessage("Must be a string mixed of numbers and letters"),
    ],
    validation,
    async (req: Request, res: Response) => {
        const {shortId} = req.params;

        const link = await AppDataSource.getConnection().getRepository(UrlMapping).findOne({where: {shortId}});

        if (!link) {
            return res.status(404).json({error: "Not Found"});
        }

        link.isArchived = true;
        link.archivedAt = new Date();

        try {
            await AppDataSource.getConnection().getRepository(UrlMapping).save(link);

            res.status(200).json({
                message: `Successfully archived link ${shortId}`
            });
        } catch (error) {
            res.status(500).json({error: "Internal Server Error"});
        }
    }
);

export default router;
