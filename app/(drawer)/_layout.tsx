import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native-ui-lib/style";

// Componente personalizado para el contenido del Drawer
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text style={styles.title}>
          <Text style={styles.quoteText}>Quote</Text>
          <Text style={styles.mText}>M</Text>
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerActiveTintColor: Colors.primary,
          drawerInactiveTintColor: Colors.$iconNeutral,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            drawerLabel: "Citas",
            drawerIcon: ({ size, color }) => (
              <MaterialCommunityIcons
                name="comment-quote-outline"
                size={size}
                color={color}
              />
            ),
          }}
        />
        {/*<Drawer.Screen*/}
        {/*  name="create"*/}
        {/*  options={{*/}
        {/*    headerShown: false,*/}
        {/*    drawerLabel: "Favoritas",*/}
        {/*    drawerIcon: ({ size, color }) => (*/}
        {/*      <MaterialCommunityIcons*/}
        {/*        name="bookmark-multiple-outline"*/}
        {/*        size={size}*/}
        {/*        color={color}*/}
        {/*      />*/}
        {/*    ),*/}
        {/*  }}*/}
        {/*/>*/}
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingLeft: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
  },
  quoteText: {
    color: Colors.$iconNeutral,
  },
  mText: {
    color: Colors.primary,
  },
});
