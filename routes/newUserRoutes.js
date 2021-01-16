const express = require("express");
const userController = require("./../controller/usercontroller");
const appConfig           = require("./../config/appConfig");

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
    let baseUrl = appConfig.apiVersion+'/user';
    const swaggerSpec = swaggerJSDoc(options)
    app.use(baseUrl+'/api/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

    /**
 * @swagger
 * definitions:
 *  createuser:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    userEmail:
 *     type: string
 *     description: userEmail
 *     example: 'yash@gmail.com'  
 *    userName:
 *     type: string
 *     description: userName
 *     example: 'userName'  
 *    userPassword:
 *     type: string
 *     description: userPassword
 *     example: 'userPassword'    
 *  viewById:
 *   type: object
 *   properties:
 *    userId:
 *     type: string
 *     description: userId
 *     example: 'userId'  
 *  userEdit:
 *   type: object
 *   properties:
 *    userId:
 *     type: string
 *     description: userId
 *     example: 'userId'  
 *    name:
 *     type: string
 *     description: name
 *     example: 'name'  
 *    userEmail:
 *     type: string
 *     description: userEmail
 *     example: 'yash@gmail.com'  
 *    userName:
 *     type: string
 *     description: userName
 *     example: 'userName'  
 *    userPassword:
 *     type: string
 *     description: userPassword
 *     example: 'userPassword'
 */  
    
/**
* @swagger
* /api/v1/user/all:
*   get:
*     tags:
*       - User
*     description: Returns all User
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of user
*/
app.get(baseUrl+'/all', userController.getAllUser);

/**
 * @swagger
 * /api/v1/user/viewById:
 *   post:
 *     tags:
 *       - User
 *     description: view By Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewById'
 *     responses:
 *       200:
 *         description: Successfully viewById
 */
app.post(baseUrl+'/viewById', userController.getUserbyid);

/**
 * @swagger
 * /api/v1/user/delete:
 *   post:
 *     tags:
 *       - User
 *     description: delete By Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/viewById'
 *     responses:
 *       200:
 *         description: Successfully delete
 */
 app.post(baseUrl+'/delete', userController.deleteUser);

 /**
 @swagger     
 *  /api/v1/user/userEdit:  
 *    post:   
 *      tags:    
 *        - User     
 *      description: Updates a single Expenses 
 *      produces:    
 *        - application/json     
 *      parameters:  
 *        - name: expensesId   
 *          description: category object resources   
 *          in: body     
 *          required: true   
 *          schema:  
 *            $ref: '#/definitions/userEdit'   
 *      responses:   
 *        200:   
 *          description: Successfully Edit Expenses  
 *        500:   
 *          description: Server error
 * */
app.post(baseUrl+'/userEdit', userController.userEdit);

/**
 * @swagger
 * /api/v1/user/create:
 *   post:
 *     tags:
 *       - User
 *     description: Creates a new Expenses
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: expensesId
 *         description: Expenses object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/createuser'
 *     responses:
 *       200:
 *         description: Successfully create
 */
app.post(baseUrl+'/create', userController.userFunction);
}
module.exports = {
    setRouter:setRouter
}