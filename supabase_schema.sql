-- =============================================
-- SCHEMA ARGUENDE MENU
-- Ejecutar en: Supabase > SQL Editor
-- =============================================

-- Tabla principal de items del menu
CREATE TABLE menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  precio text,
  descripcion text,
  categoria text NOT NULL CHECK (categoria IN ('comida', 'bebida')),
  tipo text NOT NULL DEFAULT 'item' CHECK (tipo IN ('header', 'subheader', 'item', 'under', 'extra', 'footer')),
  is_coffee boolean DEFAULT false,
  is_variable_price boolean DEFAULT false,
  orden integer NOT NULL DEFAULT 0,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Tabla de extras (complementos de cada item)
CREATE TABLE menu_extras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  texto text NOT NULL,
  precio text,
  is_small boolean DEFAULT false,
  orden integer NOT NULL DEFAULT 0
);

-- =============================================
-- SEGURIDAD: Row Level Security
-- =============================================

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_extras ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede leer el menu (publico)
CREATE POLICY "menu publico lectura" ON menu_items
  FOR SELECT USING (true);

CREATE POLICY "extras publico lectura" ON menu_extras
  FOR SELECT USING (true);

-- Solo usuarios autenticados pueden modificar
CREATE POLICY "admin puede modificar menu" ON menu_items
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "admin puede modificar extras" ON menu_extras
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- DATOS INICIALES (menu actual)
-- =============================================

-- COMIDA
INSERT INTO menu_items (titulo, precio, descripcion, categoria, tipo, orden) VALUES
  ('COMIDA', null, null, 'comida', 'header', 1),
  ('MUFFIN DE HUEVO', '$160', 'El más sabroso.\n Pan brioche, huevos estrellados, chutney de cebolla con tocino, pepinillos encurtidos, arúgula, alioli de ajo, cebollín, mostaza dijon y queso cheddar.', 'comida', 'item', 2),
  ('MENEMEN', '$95', 'Huevos escalfados en salsa de tomate con especias, pimiento, cebolla, queso fresco y perejil.', 'comida', 'item', 3),
  ('NIÑO LINDO', '$190', 'Tostado con durazno asado, burrata, verdolaga y miel infusionada con habanero.', 'comida', 'item', 4),
  ('EL SAPICHU', '$90', 'Taco de atún sellado, marinado con limón amarillo y aceite de oliva. Montado sobre un cremoso de aguacate con cebollitas encurtidas con limón, serrano y piña.', 'comida', 'item', 5),
  ('PAN FRANCÉS', '$120', 'Infalible, acompañado de fruta de temporada.', 'comida', 'item', 6),
  ('AVENITA', '$65', 'Cocida en agua con un toque de leche y canela. Pera, nuez de castilla y un ''chin'' de miel de agave.', 'comida', 'item', 7),
  ('PI-JEI', '$60', 'Pan de caja tostado con crema de cacahuate y mermelada de la casa.', 'comida', 'item', 8),
  ('CHEESECAKE DE MANGO', '$90', null, 'comida', 'item', 9);

-- Extras para NIÑO LINDO (orden 4)
INSERT INTO menu_extras (menu_item_id, texto, precio, orden)
SELECT id, '¡Hazlo salado! Añade jamon serrano', '+ $15', 1 FROM menu_items WHERE titulo = 'NIÑO LINDO';

-- Extras para EL SAPICHU (orden 5)
INSERT INTO menu_extras (menu_item_id, texto, precio, orden)
SELECT id, '-Añade queso gouda', '+ $20', 1 FROM menu_items WHERE titulo = 'EL SAPICHU';

-- Extras para AVENITA (orden 7)
INSERT INTO menu_extras (menu_item_id, texto, precio, is_small, orden)
SELECT id, '-Añade: Yogurt griego/Crema de cacahuate', '+ $20', true, 1 FROM menu_items WHERE titulo = 'AVENITA';

-- BEBIDAS
INSERT INTO menu_items (titulo, precio, descripcion, categoria, tipo, is_coffee, is_variable_price, orden) VALUES
  ('BEBIDAS', null, null, 'bebida', 'header', false, false, 1),
  ('CAFÉ :', null, null, 'bebida', 'subheader', false, false, 2),
  ('***SIN LECHE', null, null, 'bebida', 'under', false, false, 3),
  ('ESPRESSO', '$60', null, 'bebida', 'item', true, false, 4),
  ('AMERICANO', '$75', null, 'bebida', 'item', true, false, 5),
  ('COLD BREW', '$90', null, 'bebida', 'item', true, false, 6),
  ('FILTRADOS', '*Sujeto al origen de grano*', null, 'bebida', 'item', true, true, 7),
  ('***CON LECHE', null, null, 'bebida', 'under', false, false, 8),
  ('CAPUCHINO', '$85', null, 'bebida', 'item', true, false, 9),
  ('CORTADO', '$65', null, 'bebida', 'item', true, false, 10),
  ('FLAT WHITE', '$80', null, 'bebida', 'item', true, false, 11),
  ('LATTE', '$80', null, 'bebida', 'item', true, false, 12),
  ('*Extra leche vegetal*', '+ $15', null, 'bebida', 'extra', false, false, 13),
  ('AFFOGATO', '$90', null, 'bebida', 'item', true, false, 14),
  ('ALTERNATIVAS :', null, null, 'bebida', 'subheader', false, false, 15),
  ('MATCHA CEREMONIAL', '$90', null, 'bebida', 'item', false, false, 16),
  ('CHAI', '$85', 'Mezcla de jengibre, cardamomo, regaliz, albahaca y ashwagandha. Pídelo caliente o frío.', 'bebida', 'item', false, false, 17),
  ('SMOOTHIE', '$80', 'Leche, plátano, dátil y shot de espresso.', 'bebida', 'item', false, false, 18),
  ('JUGO BOMBIUX', '$70', 'Piña, naranja, fresa y limón.', 'bebida', 'item', false, false, 19),
  ('DE ANTAÑO', '$70', 'Betabel y zanahoria.', 'bebida', 'item', false, false, 20),
  ('REFRESCOS:', null, null, 'bebida', 'subheader', false, false, 21),
  ('COCA COLA', '$30', null, 'bebida', 'item', false, false, 22),
  ('AGUA MINERAL', '$50', null, 'bebida', 'item', false, false, 23);
