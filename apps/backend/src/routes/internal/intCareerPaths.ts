import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db } from "../../db";
import { careerPaths } from "../../db/schema";
import { AppError, ERRORS } from "../../../utils/errors";

export async function internalCareerPathRoutes(app: FastifyInstance) {

    // get all user career paths

    // get all user bullet points of the relevant career path

    // get user skill list

    // get user resume data

    // post resume data 

    // get all resume summary

    // Post a single resume summary

}


// To do:
// implement internal routes for Resume Composer Python Agent 
// Add education field on frontend side and backend
// Also update data base schema 