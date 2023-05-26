const { Router } = require('express');
const userRouter = Router();

const {
  getUsers,
  getUserById,
  deleteUserById,
} = require('../controllers/userController');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestionar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtener la lista de todos los usuarios registrados
 *     tags: [Usuarios]
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Número máximo de usuarios a devolver por página
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: page
 *         in: query
 *         description: Número de página
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la lista de usuarios.
 *       404:
 *         description: No encontrado. No se encontraron usuarios en la DB.
 *       500:
 *         description: Error del servidor. No se pudo obtener la lista de usuarios.
 */
userRouter.get('/', getUsers);

/**
 * @swagger
 * /users/{idUser}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtener un usuario específico por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         description: ID del usuario a obtener
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. Devuelve el usuario solicitado.
 *       404:
 *         description: No encontrado. No se encontró el usuario con el ID especificado.
 */
userRouter.get('/:idUser', getUserById);

/**
 * @swagger
 * /users/{idUser}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     description: Eliminar un usuario específico por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: idUser
 *         description: ID del usuario a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. El usuario ha sido eliminado correctamente.
 *       404:
 *         description: No encontrado. No se encontró el usuario con el ID especificado.
 */
userRouter.delete('/:idUser', deleteUserById);

module.exports = userRouter;
