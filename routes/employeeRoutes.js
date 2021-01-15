const express = require("express");
const employeeController = require("./../controller/employeeController");
const appConfig = require('./../config/appConfig');
const uploadMulter = require('../middleware/upload');
const validation = require('../middleware/validation');
 
const swaggerJSDoc=require('swagger-jsdoc')
const app = express();
const swaggerUI=require('swagger-ui-express')
const options = {
    definition:{
      info:{
        title:'Swagger Task API',
        version:'1.0.0',
        description:''
      },
    },
    apis:['./routes/*.js']
    // apis:['index.js']
  }
let setRouter = (app) =>{

	let baseUrl = appConfig.apiVersion+'/employee';
	const swaggerSpec = swaggerJSDoc(options)
	app.use(baseUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

 /**
 * @swagger
 * definitions:
 *  createEmployee:
 *   type: object
 *   properties:
 *    employeeFirstName:
 *     type: string
 *     description: First name
 *     example: 'first name'  
 *    employeeLastName:
 *     type: string
 *     description: Last name
 *     example: 'last name'  
 *    employeeJoinDate:
 *     type: string
 *     description: employeeJoinDate
 *     example: 'MM-DD-YYYY'  
 *    employeeDateOfBirthday:
 *     type: string
 *     description: employeeDateOfBirthday
 *     example: 'MM-DD-YYYY'  
 *    employeeDegree:
 *     type: string
 *     description: employeeDegree
 *     example: 'employeeDegree'  
 *    employeeAddress:
 *     type: string
 *     description: employeeAddress
 *     example: 'employeeAddress'  
 *    role:
 *     type: string
 *     description: role
 *     example: 'role'  
 *    employeeEmail:
 *     type: string
 *     description: employeeEmail
 *     example: 'employeeEmail'  
 *    employeePassword:
 *     type: string
 *     description: employeePassword
 *     example: 'employeePassword'  
 *    employeeNumber:
 *     type: string
 *     description: employeeNumber
 *     example: 'employeeDegree'  
 */  

/**
 * @swagger
 * /api/v1/employee/getAllEmployee:
 *   get:
 *     tags:
 *       - Employee
 *     description: Returns all Employee
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of Employee
 *         schema:
 *           $ref: '#/definitions/getAllEmployee'
 */
app.get(baseUrl+'/getAllEmployee', employeeController.getAllEmployee);

/**
 * @swagger
 * /api/v1/employee/{employeeJoinDate}/getByJoinDateEmployee:
 *   put:
 *     tags:
 *       - Employee
 *     description: Returns a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employeeJoinDate
 *         description: employeeJoinDate
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Employee
 *         schema:
 *           $ref: '#/definitions/:employeeId/EmployeeId'
 */
app.put(baseUrl+'/:employeeJoinDate/getByJoinDateEmployee', employeeController.getByJoinDateEmployee);

/**
 * @swagger
 * /api/v1/employee/createEmployee:
 *   post:
 *     tags:
 *       - Employee
 *     description: Creates a new employee
 *     summary: Uploads a file.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: employeeName
 *         description: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createEmployee'
 *       - name: employeePhoto
 *         in: formData   
 *         description: employeePhoto
 *         required: true
 *         type: file    
 *     responses:
 *       200:
 *         description: Successfully created
 */
app.post(baseUrl+'/createEmployee', uploadMulter,validation, employeeController.employeeFunction);

/**
 * @swagger
 * /api/v1/employee/{employeeId}/delete:
 *   put:
 *     tags:
 *       - Employee
 *     description: Deletes a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employeeId
 *         description: employeeId
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successfully employee deleted
 */
app.put(baseUrl+'/:employeeId/delete', employeeController.deleteEmployee);

/**
 * @swagger
 * /api/v1/employee/{employeeId}/details:
 *   put:
 *     tags:
 *       - Employee
 *     description: Returns a single Employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employeeId
 *         description: employeeId single Details find found
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A single Employee
 *         schema:
 *           $ref: '#/definitions/:employeeId/EmployeeId'
 */
app.put(baseUrl+'/:employeeId/details',  employeeController.getSingleEmployee);

// /**
//  @swagger     
//  *  /api/v1/employee/{employeeId}/edit:  
//  *    put:   
//  *      tags:    
//  *        - Employee     
//  *      description: Updates a single Employee 
//  *      produces:    
//  *        - application/json     
//  *      parameters:  
//  *        - name: employeeFristName   
//  *          description: employeeFristName object resources   
//  *          in: body     
//  *          required: true   
//  *          schema:  
//  *            $ref: '#/components/schemas/edit'  
//  *        - name: employeeId     
//  *          description: employee Object ID  
//  *          in: path     
//  *          required: true   
//  *      responses:   
//  *        200:   
//  *          description: Successfully Edit Employee  
//  *        500:   
//  *          description: Server error
//  * */
// app.put(baseUrl+"/:employeeId/edit",uploadMulter,validation, employeeController.editEmployee);

// /**
//  @swagger     
//  *  /api/v1/employee/employeeFormToDate:  
//  *    get:   
//  *      tags:    
//  *        - Employee     
//  *      description: EmployeeDate Of Join All Detail Find 
//  *      produces:    
//  *        - application/json     
//  *      parameters:  
//  *        - name: employeeJoinDate     
//  *          description: employee Object Of All Data Range form  
//  *          in: path     
//  *          required: true   
//  *      responses:   
//  *        200:   
//  *          description: Successfully Edit Employee  
//  *        500:   
//  *          description: Server error
//  * */
// app.get(baseUrl+"/employeeFormToDate", employeeController.employeeFormToDate);
}
module.exports ={
    setRouter: setRouter
}