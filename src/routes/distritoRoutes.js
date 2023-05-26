const { Router } = require('express');
const distritoRouter = Router();

const {
  getDistritos,
  getDistritoById,
  createDistrito,
  deleteDistritoById,
  updateDistrito,
} = require('../controllers/distritoController');
const cacheMiddleware = require('../middlewares/cache');

/**
 * @swagger
 * tags:
 *   name: Distritos
 *   description: Gestionar distritos
 */

/**
 * @swagger
 * /distritos:
 *   get:
 *    summary: Obtener todos los distritos
 *    description: Obtener la lista de todos los distritos registrados
 *    tags: [Distritos]
 *    responses:
 *     200:
 *      description: Éxito. Devuelve la lista de distritos.
 *     500:
 *      description: Error del servidor. No se pudo obtener la lista de distritos.
 */
distritoRouter.get('/', cacheMiddleware, getDistritos);

/**
 * @swagger
 * /distritos:
 *   post:
 *     summary: Crear un nuevo distrito
 *     description: Crea un nuevo distrito con la información proporcionada.
 *     tags: [Distritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProvinciaId:
 *                 type: string
 *                 description: ID de la provincia asociada al distrito
 *               nombre_distrito:
 *                 type: string
 *                 description: Nombre del distrito
 *             required:
 *               - ProvinciaId
 *               - nombre_distrito
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la información del distrito creado.
 *       501:
 *         description: Error en la creación del distrito. El distrito ya existe.
 *       500:
 *         description: Error del servidor. No se pudo crear el distrito.
 */
distritoRouter.post('/', createDistrito);

/**
 * @swagger
 * /distritos/{id}:
 *   get:
 *     summary: Obtener un distrito por ID
 *     description: Obtener información de un distrito específico por su ID.
 *     tags: [Distritos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del distrito a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. Devuelve la información del distrito.
 *       404:
 *         description: Distrito no encontrado. El ID proporcionado no existe.
 *       500:
 *         description: Error del servidor. No se pudo obtener la información del distrito.
 */
distritoRouter.get('/:id', getDistritoById);

/**
 * @swagger
 * /distritos/{id}:
 *   put:
 *     summary: Actualizar un distrito existente
 *     description: Actualiza la información de un distrito existente.
 *     tags: [Distritos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del distrito a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ProvinciaId:
 *                 type: string
 *                 description: ID de la provincia asociada al distrito
 *               nombre_distrito:
 *                 type: string
 *                 description: Nombre del distrito
 *             required:
 *               - ProvinciaId
 *               - nombre_distrito
 *     responses:
 *       200:
 *         description: Éxito. El distrito ha sido actualizado.
 *       400:
 *         description: Error en la actualización del distrito. El registro solicitado no existe.
 *       500:
 *         description: Error del servidor. No se pudo actualizar el distrito.
 */
distritoRouter.put('/:id', updateDistrito);

/**
 * @swagger
 * /distritos/{id}:
 *   delete:
 *     summary: Eliminar un distrito existente
 *     description: Elimina un distrito existente según su ID.
 *     tags: [Distritos]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del distrito a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Éxito. El distrito ha sido eliminado.
 *       400:
 *         description: Error en la eliminación del distrito. El registro solicitado no existe.
 *       500:
 *         description: Error del servidor. No se pudo eliminar el distrito.
 */
distritoRouter.delete('/:id', deleteDistritoById);

module.exports = distritoRouter;
