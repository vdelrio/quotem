import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 1. Definimos la interfaz para la estructura de una etiqueta
interface Label {
  id: string;
  name: string;
}

const initialLabels: Label[] = [
  { id: "1", name: "casa" },
  { id: "2", name: "cuentas" },
  { id: "3", name: "otros" },
  { id: "4", name: "running" },
  { id: "5", name: "UCDM" },
];

export default function Borrar_LabelEditor(): JSX.Element {
  // Especificamos el tipo de retorno del componente
  const [labels, setLabels] = useState<Label[]>(initialLabels); // Tipado para el estado de las etiquetas
  const [selectedLabel, setSelectedLabel] = useState<Label | null>(null); // Puede ser una Label o null
  const [newLabelText, setNewLabelText] = useState<string>(""); // Tipado para string
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null); // Puede ser string o null
  const [editingText, setEditingText] = useState<string>(""); // Tipado para string

  // Lógica para agregar una nueva etiqueta
  const handleAddLabel = (): void => {
    // Especificamos el tipo de retorno
    if (newLabelText.trim().length > 0) {
      const newLabel: Label = {
        // Aseguramos que el objeto sea de tipo Label
        id: Math.random().toString(),
        name: newLabelText.trim(),
      };
      setLabels((prevLabels) => [...prevLabels, newLabel]);
      setNewLabelText("");
    }
  };

  // Lógica para eliminar una etiqueta
  const handleDeleteLabel = (id: string): void => {
    // Especificamos el tipo del parámetro y retorno
    Alert.alert(
      "Eliminar etiqueta",
      "¿Estás seguro de que quieres eliminar esta etiqueta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            const updatedLabels = labels.filter((label) => label.id !== id);
            setLabels(updatedLabels);
            if (selectedLabel?.id === id) {
              // Si la etiqueta eliminada estaba seleccionada, deseleccionarla
              setSelectedLabel(null);
            }
          },
        },
      ],
    );
  };

  // Lógica para iniciar la edición de una etiqueta
  const startEditing = (label: Label): void => {
    // Especificamos el tipo del parámetro
    setEditingLabelId(label.id);
    setEditingText(label.name);
  };

  // Lógica para guardar la edición
  const saveEditing = (): void => {
    if (editingLabelId && editingText.trim().length > 0) {
      const updatedLabels = labels.map((label) =>
        label.id === editingLabelId
          ? { ...label, name: editingText.trim() }
          : label,
      );
      setLabels(updatedLabels);
    }
    setEditingLabelId(null);
  };

  // Renderiza cada ítem de la lista
  const renderLabelItem = ({ item }: { item: Label }): JSX.Element => {
    // Tipado del parámetro `item`
    const isSelected: boolean = selectedLabel?.id === item.id;
    const isEditing: boolean = editingLabelId === item.id;

    return (
      <View style={styles.labelContainer}>
        <TouchableOpacity
          style={styles.selectIcon}
          onPress={() => setSelectedLabel(item)}
        >
          <Ionicons
            name={isSelected ? "checkmark-circle" : "checkmark-circle-outline"}
            size={24}
            color={isSelected ? "#007AFF" : "#ccc"}
          />
        </TouchableOpacity>

        {isEditing ? (
          <TextInput
            style={styles.labelTextEditable}
            value={editingText}
            onChangeText={setEditingText}
            autoFocus
            onBlur={saveEditing} // Guardar al perder el foco
            onSubmitEditing={saveEditing} // Guardar al presionar Enter
          />
        ) : (
          <Text style={styles.labelText}>{item.name}</Text>
        )}

        <View style={styles.actionIcons}>
          {/* El ícono de lápiz se convierte en guardar cuando se está editando */}
          <TouchableOpacity
            onPress={() => (isEditing ? saveEditing() : startEditing(item))}
          >
            <Ionicons
              name={isEditing ? "save-outline" : "pencil-outline"}
              size={24}
              color="#555"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleDeleteLabel(item.id)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#555" />
        <Text style={styles.headerTitle}>Editar etiquetas</Text>
      </View>

      {/* Input para agregar nueva etiqueta */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={handleAddLabel}
          style={styles.addIconTouchable}
        >
          <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Crear etiqueta nueva"
          value={newLabelText}
          onChangeText={setNewLabelText}
          onSubmitEditing={handleAddLabel}
        />
      </View>

      {/* FlatList para mostrar las etiquetas */}
      <FlatList<Label> // Aseguramos el tipo de los datos de FlatList
        data={labels}
        renderItem={renderLabelItem}
        keyExtractor={(item: Label) => item.id} // Tipado del keyExtractor
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50, // Ajuste para evitar la barra de estado
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  addIconTouchable: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    // Puedes quitar el borderBottomWidth si quieres un TextInput más limpio
  },
  list: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectIcon: {
    marginRight: 15,
  },
  labelText: {
    flex: 1,
    fontSize: 16,
  },
  labelTextEditable: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    width: 70, // Ajustado para dar más espacio entre los íconos
    justifyContent: "space-between",
    marginLeft: 10, // Un poco de margen para separar del texto
  },
});
