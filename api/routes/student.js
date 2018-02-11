import express from 'express';
import mongoose from 'mongoose';
import createStudent from '../controller/student/createStudent';
import studentDetails from '../controller/student/studentDetails';
import updateStudent from '../controller/student/updateStudent';
import removeStudent from '../controller/student/removeStudent';
const router = express.Router();

//create new student 
router.post('/', createStudent);
//retrive one student 
router.get('/:_id', studentDetails);
//update student info 
router.put('/:_id', updateStudent);
//remove one student 
router.delete('/:_id', removeStudent);


export default router;