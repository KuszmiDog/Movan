import { Image } from "react-native";

export interface Pedido {
  id: string;
  cliente: {
    nombre: string;
    telefono: string;
    calificacion: number;
  };
  origen: {
    direccion: string;
    coordenadas: { lat: number; lng: number };
  };
  destino: {
    direccion: string;
    coordenadas: { lat: number; lng: number };
  };
  carga: {
    tipo: string;
    peso: number;
    descripcion: string;
  };
  precio: number;
  imagen: Image; // URL de la imagen del pedido
  distancia: number;
  tiempoEstimado: number;
  fechaRequerida: Date;
  estado: 'disponible' | 'asignado' | 'en_curso' | 'completado';
  prioridad: 'normal' | 'urgente';
}

// Exporta el array de pedidos simulados
export const pedidosSimulados: Pedido[] = [
    {
        id: '1',
        cliente: { nombre: 'Jorge Fernández', telefono: '+54 362 4567890', calificacion: 4.7 },
        origen: { direccion: 'Av. 25 de Mayo 1500, Resistencia', coordenadas: { lat: -27.4516, lng: -58.9868 } },
        destino: { direccion: 'Ruta 11 km 1020, Barranqueras', coordenadas: { lat: -27.4742, lng: -58.8811 } },
        carga: { tipo: 'Materiales de construcción', peso: 1800, descripcion: 'Bolsas de cemento y ladrillos' },
        precio: 9500,
        imagen: require('../../assets/images/simulatedposts/bolsascemento_.jpg'), // <-- Ruta relativa correcta
        distancia: 15,
        tiempoEstimado: 30,
        fechaRequerida: new Date(Date.now() + 3600000 * 5), // 5 horas desde ahora
        estado: 'disponible',
        prioridad: 'urgente'
    },
    {
        id: '2',
        cliente: { nombre: 'Luciana Gómez', telefono: '+54 362 3214567', calificacion: 4.9 },
        origen: { direccion: 'Av. Sarmiento 350, Resistencia', coordenadas: { lat: -27.4491, lng: -58.9857 } },
        destino: { direccion: 'Av. San Martín 890, Fontana', coordenadas: { lat: -27.4495, lng: -59.0561 } },
        carga: { tipo: 'Alimentos', peso: 600, descripcion: 'Productos secos para supermercado' },
        precio: 7000,
        imagen: require('../../assets/images/simulatedposts/productossecos.jpg'), // <-- Ruta relativa correcta
        distancia: 10,
        tiempoEstimado: 20,
        fechaRequerida: new Date(Date.now() + 86400000), // mañana
        estado: 'disponible',
        prioridad: 'normal'
    },
    {
        id: '3',
        cliente: { nombre: 'Carlos Sosa', telefono: '+54 362 7896543', calificacion: 4.5 },
        origen: { direccion: 'Calle Güemes 1234, Resistencia', coordenadas: { lat: -27.4601, lng: -58.9914 } },
        destino: { direccion: 'Av. Libertador 200, Corrientes Capital', coordenadas: { lat: -27.4748, lng: -58.8341 } },
        carga: { tipo: 'Electrodomésticos', peso: 950, descripcion: 'Heladera y microondas' },
        precio: 12500,
        imagen: require('../../assets/images/simulatedposts/heladeraymicroondas.jpg'), // <-- Ruta relativa correcta
        distancia: 22,
        tiempoEstimado: 45,
        fechaRequerida: new Date(Date.now() + 43200000), // en 12 horas
        estado: 'disponible',
        prioridad: 'urgente'
    }
];
  

export const cargarPedidosDisponibles = async (): Promise<Pedido[]> => {
  return pedidosSimulados;
};
