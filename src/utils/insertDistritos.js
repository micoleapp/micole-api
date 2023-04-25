const { Provincia, Distrito } = require('../db');

const insertDistritos = async () => {
  try {
    const distritos = await Distrito.count();
    if (!distritos) {
      const provincia = await Provincia.findByPk(180);
      await Distrito.bulkCreate([
        { id: 1, nombre_distrito: 'Ancón', ProvinciaId: provincia.id },
        { id: 2, nombre_distrito: 'Ate', ProvinciaId: provincia.id },
        { id: 3, nombre_distrito: 'Barranco', ProvinciaId: provincia.id },
        { id: 4, nombre_distrito: 'Breña', ProvinciaId: provincia.id },
        { id: 5, nombre_distrito: 'Carabayllo', ProvinciaId: provincia.id },
        {
          id: 6,
          nombre_distrito: 'Cercado de Lima',
          ProvinciaId: provincia.id,
        },
        { id: 7, nombre_distrito: 'Chaclacayo', ProvinciaId: provincia.id },
        { id: 8, nombre_distrito: 'Chorrillos', ProvinciaId: provincia.id },
        { id: 9, nombre_distrito: 'Cieneguilla', ProvinciaId: provincia.id },
        { id: 10, nombre_distrito: 'Comas', ProvinciaId: provincia.id },
        { id: 11, nombre_distrito: 'El agustino', ProvinciaId: provincia.id },
        { id: 12, nombre_distrito: 'Independencia', ProvinciaId: provincia.id },
        { id: 13, nombre_distrito: 'Jesús maría', ProvinciaId: provincia.id },
        { id: 14, nombre_distrito: 'La molina', ProvinciaId: provincia.id },
        { id: 15, nombre_distrito: 'La victoria', ProvinciaId: provincia.id },
        { id: 16, nombre_distrito: 'Lince', ProvinciaId: provincia.id },
        { id: 17, nombre_distrito: 'Los olivos', ProvinciaId: provincia.id },
        { id: 18, nombre_distrito: 'Lurigancho', ProvinciaId: provincia.id },
        { id: 19, nombre_distrito: 'Lurín', ProvinciaId: provincia.id },
        {
          id: 20,
          nombre_distrito: 'Magdalena del mar',
          ProvinciaId: provincia.id,
        },
        { id: 21, nombre_distrito: 'Miraflores', ProvinciaId: provincia.id },
        { id: 22, nombre_distrito: 'Pachacámac', ProvinciaId: provincia.id },
        { id: 23, nombre_distrito: 'Pucusana', ProvinciaId: provincia.id },
        { id: 24, nombre_distrito: 'Pueblo libre', ProvinciaId: provincia.id },
        { id: 25, nombre_distrito: 'Puente piedra', ProvinciaId: provincia.id },
        { id: 26, nombre_distrito: 'Punta hermosa', ProvinciaId: provincia.id },
        { id: 27, nombre_distrito: 'Punta negra', ProvinciaId: provincia.id },
        { id: 28, nombre_distrito: 'Rímac', ProvinciaId: provincia.id },
        { id: 29, nombre_distrito: 'San bartolo', ProvinciaId: provincia.id },
        { id: 30, nombre_distrito: 'San borja', ProvinciaId: provincia.id },
        { id: 31, nombre_distrito: 'San isidro', ProvinciaId: provincia.id },
        {
          id: 32,
          nombre_distrito: 'San Juan de Lurigancho',
          ProvinciaId: provincia.id,
        },
        {
          id: 33,
          nombre_distrito: 'San Juan de Miraflores',
          ProvinciaId: provincia.id,
        },
        { id: 34, nombre_distrito: 'San Luis', ProvinciaId: provincia.id },
        {
          id: 35,
          nombre_distrito: 'San Martin de Porres',
          ProvinciaId: provincia.id,
        },
        { id: 36, nombre_distrito: 'San Miguel', ProvinciaId: provincia.id },
        { id: 37, nombre_distrito: 'Santa Anita', ProvinciaId: provincia.id },
        {
          id: 38,
          nombre_distrito: 'Santa María del Mar',
          ProvinciaId: provincia.id,
        },
        { id: 39, nombre_distrito: 'Santa Rosa', ProvinciaId: provincia.id },
        {
          id: 40,
          nombre_distrito: 'Santiago de Surco',
          ProvinciaId: provincia.id,
        },
        { id: 41, nombre_distrito: 'Surquillo', ProvinciaId: provincia.id },
        {
          id: 42,
          nombre_distrito: 'Villa el Salvador',
          ProvinciaId: provincia.id,
        },
        {
          id: 43,
          nombre_distrito: 'Villa Maria del Triunfo',
          ProvinciaId: provincia.id,
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = insertDistritos;