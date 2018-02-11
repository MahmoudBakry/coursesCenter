import express from 'express';
import mongoose from 'mongoose';
import allCourses from '../controller/course/allCourses';
import courseDetails from '../controller/course/courseDetails';
import createCourse from '../controller/course/createCoures';
const router = express.Router();
//get all courses
router.get('/', allCourses);
//get one course by Id
router.get('/:_id', courseDetails );
//create new coures
router.post('/', createCourse);

export default router
