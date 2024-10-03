// import { UserModel } from '@/modules/auth/model/UserModel';
// import { app, logger } from '@/server';
// import request from 'supertest';
// import { UserController } from '../controller/UserController';
// import { UserRepository } from '../repository/UserRepository';
// import { AuthRepository } from '@/modules/auth/repository/AuthRepository';
// import { AuthService } from '@/modules/auth/service/AuthService';
// // import { app } from '../../../server'; // Asegúrate de importar tu aplicación Express
// // import { UserModel } from '../models/UserModel'; // Importa tu modelo de usuario

// describe('User Controller - Get User by ID', () => {
//   let userId: string;

//   beforeAll(async () => {
//     const authrepo = new AuthRepository();
//     const authService = new AuthService(authrepo);

//     // Aquí puedes crear un usuario de prueba y guardar su ID
//     const user = {
//       firstName: 'John',
//       lastName: 'Doe',
//       phone: '1234567890',
//       email: 'john.doe@example.com',
//       ci: '1234567',
//       password: 'mypassword',
//       // firstLogin: true,
//     };
//     const newUser = authService.register('John',
//       'Doe',
//       '1234567890',
//       'john.doe@example.com',
//       '1234567',
//       'mypassword',)
//     userId = (await newUser).id; // Guarda el ID del usuario creado
//   });

//   afterAll(async () => {
//     // Limpia la base de datos de prueba
//     // await UserModel.deleteMany({});
//   });

//   it('should return user details for a valid ID', async () => {
//     const response = await request(app)
//       .get(`/api/v1/users/${userId}`)
//       .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmZkN2U4OTg3MTFkM2M4ZTJmZDhhZjgiLCJlbWFpbCI6IiQyYSQxMCR6NnNZQU9rSkoyM1dLNGRtWEZ5bmsuSkhHOC8vdXBtcDAvaTFmME9rQzZST1poZzVlRnNnMiIsImlhdCI6MTcyNzkyNzEzNywiZXhwIjoxNzMwNTE5MTM3fQ.TiU6p80pl5OK0OmL3Fo4HrYwFipPlfOBcZndoqAa3I0`); // Reemplaza con un token válido si es necesario

//     expect(response.status).toBe(200);
//     expect(response.body).toHaveProperty('id', userId);
//     expect(response.body).toHaveProperty('firstName', 'John');
//     expect(response.body).toHaveProperty('lastName', 'Doe');
//     expect(response.body).toHaveProperty('email', 'john.doe@example.com');
//     expect(response.body).toHaveProperty('firstLogin', true);
//   });

//   it('should return 404 for a non-existent ID', async () => {
//     const response = await request(app)
//       .get('/users/nonExistentId')
//       .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmZkN2U4OTg3MTFkM2M4ZTJmZDhhZjgiLCJlbWFpbCI6IiQyYSQxMCR6NnNZQU9rSkoyM1dLNGRtWEZ5bmsuSkhHOC8vdXBtcDAvaTFmME9rQzZST1poZzVlRnNnMiIsImlhdCI6MTcyNzkyNzEzNywiZXhwIjoxNzMwNTE5MTM3fQ.TiU6p80pl5OK0OmL3Fo4HrYwFipPlfOBcZndoqAa3I0`); // Reemplaza con un token válido si es necesario

//     expect(response.status).toBe(404);
//     expect(response.body).toEqual({
//       httpCode: 404,
//       message: 'User not found',
//       data: null,
//     });
//   });

//   it('should return 401 for missing token', async () => {
//     const response = await request(app).get(`/users/${userId}`);

//     expect(response.status).toBe(401);
//     expect(response.body).toEqual({
//       httpCode: 401,
//       message: 'Unauthorized - Missing or invalid token',
//       data: null,
//     });
//   });
// });
